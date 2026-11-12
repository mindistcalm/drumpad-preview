import { instruments } from './instruments'

const STEP_SECONDS = 0.15
const LOOKAHEAD_SECONDS = 0.08
const SCHEDULER_INTERVAL_MS = 25

export const getBitKey = (rowIndex: number, index: number) => `${rowIndex}:${index}`

interface Pattern {
  stepCount: number
  selectedBits: ReadonlySet<string>
}

export function createAudioTransport(initialPattern: Pattern, onStep: (index: number) => void) {
  const startedAt = performance.now()
  const downloads = new AbortController()
  const buffers = new Map<number, AudioBuffer>()
  const pendingSources = new Map<number, AudioBufferSourceNode>()
  let pattern = initialPattern
  let context: AudioContext | undefined
  let clockOffset: number | undefined
  let pendingTime = 0
  let activeIndex = 0
  let frame = 0

  const elapsed = () => (performance.now() - startedAt) / 1000
  const samples = instruments.map(async ({ sound }) => {
    try {
      const response = await fetch(new URL(sound, document.baseURI), { signal: downloads.signal })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.arrayBuffer()
    } catch (error) {
      if (!downloads.signal.aborted) console.warn('Не удалось загрузить сэмпл', sound, error)
      return undefined
    }
  })

  function updatePlayhead() {
    const time = context && clockOffset !== undefined
      ? context.currentTime + clockOffset
      : elapsed()
    const index = Math.floor(time / STEP_SECONDS) % pattern.stepCount
    if (index !== activeIndex) {
      activeIndex = index
      onStep(index)
    }
  }

  function draw() {
    updatePlayhead()
    frame = requestAnimationFrame(draw)
  }

  function schedule() {
    if (!context || context.state !== 'running') return
    const now = context.currentTime
    clockOffset ??= elapsed() - now

    // The scheduling window is shorter than one step, so only one future beat needs editing.
    if (pendingTime <= now) pendingSources.clear()
    const nextStep = Math.floor((now + clockOffset) / STEP_SECONDS) + 1
    const time = nextStep * STEP_SECONDS - clockOffset
    if (time <= now || time - now > LOOKAHEAD_SECONDS) return

    pendingTime = time
    const index = nextStep % pattern.stepCount
    for (const [row, buffer] of buffers) {
      const source = pendingSources.get(row)
      const selected = pattern.selectedBits.has(getBitKey(row, index))

      if (source && !selected) {
        source.stop()
        pendingSources.delete(row)
      } else if (!source && selected) {
        const hit = context.createBufferSource()
        hit.buffer = buffer
        hit.connect(context.destination)
        hit.onended = () => hit.disconnect()
        hit.start(time)
        pendingSources.set(row, hit)
      }
    }
  }

  const interval = window.setInterval(schedule, SCHEDULER_INTERVAL_MS)
  frame = requestAnimationFrame(draw)

  return {
    update(nextPattern: Pattern) {
      pattern = nextPattern
      schedule()
      updatePlayhead()
    },
    async unlock() {
      try {
        if (!context) {
          const audioContext = new AudioContext()
          context = audioContext
          samples.forEach(async (sample, row) => {
            try {
              const data = await sample
              if (!data || downloads.signal.aborted) return
              const buffer = await audioContext.decodeAudioData(data)
              if (downloads.signal.aborted) return
              buffers.set(row, buffer)
              schedule()
            } catch (error) {
              if (!downloads.signal.aborted) console.warn('Не удалось декодировать сэмпл', instruments[row].sound, error)
            }
          })
        }
        if (context.state !== 'running') await context.resume()
        if (!downloads.signal.aborted) schedule()
      } catch (error) {
        if (!downloads.signal.aborted) console.warn('Не удалось запустить звук', error)
      }
    },
    dispose() {
      downloads.abort()
      window.clearInterval(interval)
      cancelAnimationFrame(frame)
      if (context) void context.close().catch(() => {})
    },
  }
}
