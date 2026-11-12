import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { createAudioTransport, getBitKey } from './audioTransport'

export const MIN_STEP_COUNT = 16
export const MAX_STEP_COUNT = 32
const DEFAULT_STEP_COUNT = 24

export function useSequencer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardsPerRow, setCardsPerRow] = useState(DEFAULT_STEP_COUNT)
  const [selectedBits, setSelectedBits] = useState(() => new Set<string>())
  const transport = useRef<ReturnType<typeof createAudioTransport> | null>(null)

  useLayoutEffect(() => {
    const audio = createAudioTransport({ stepCount: DEFAULT_STEP_COUNT, selectedBits: new Set() }, setActiveIndex)
    transport.current = audio
    return () => {
      transport.current = null
      audio.dispose()
    }
  }, [])

  useLayoutEffect(() => {
    transport.current?.update({ stepCount: cardsPerRow, selectedBits })
  }, [cardsPerRow, selectedBits])

  const handleSelectBit = useCallback((rowIndex: number, index: number) => {
    void transport.current?.unlock()
    const key = getBitKey(rowIndex, index)
    setSelectedBits((previous) => {
      const next = new Set(previous)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  return {
    cardsPerRow,
    setCardsPerRow,
    activeIndex,
    isSelected: (rowIndex: number, index: number) => selectedBits.has(getBitKey(rowIndex, index)),
    onSelectBit: handleSelectBit,
    reset: () => setSelectedBits(new Set()),
  }
}
