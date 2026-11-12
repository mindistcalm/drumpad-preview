import { useState, useSyncExternalStore, type CSSProperties } from 'react'
import { instruments } from './instruments'
import { Pad } from './Pad'

const STEPS_PER_GROUP = 4
const compactLayout = window.matchMedia('(max-width: 600px)')

function subscribeToLayout(onChange: () => void) {
  compactLayout.addEventListener('change', onChange)
  return () => compactLayout.removeEventListener('change', onChange)
}

const isCompactLayout = () => compactLayout.matches

interface SequencerGridProps {
  stepCount: number
  activeIndex: number
  isSelected: (rowIndex: number, index: number) => boolean
  onSelectBit: (rowIndex: number, index: number) => void
}

export function SequencerGrid({
  stepCount,
  activeIndex,
  isSelected,
  onSelectBit,
}: SequencerGridProps) {
  const compact = useSyncExternalStore(subscribeToLayout, isCompactLayout)
  const [requestedGroup, setGroup] = useState(0)
  const groupCount = Math.ceil(stepCount / STEPS_PER_GROUP)
  const group = Math.min(requestedGroup, groupCount - 1)
  const playingGroup = Math.floor(activeIndex / STEPS_PER_GROUP)
  const start = compact ? group * STEPS_PER_GROUP : 0
  const end = compact ? Math.min(start + STEPS_PER_GROUP, stepCount) : stepCount
  const stepIndexes = Array.from({ length: end - start }, (_, index) => start + index)
  const hueStep = 720 / (instruments.length * stepCount)

  return (
    <div className={compact ? 'sequencer-tracks sequencer-tracks--paged' : 'sequencer-tracks'}>
      {compact && (
        <div className="sequencer-groups" role="group" aria-label="Группы шагов">
          {Array.from({ length: groupCount }, (_, index) => {
            const first = index * STEPS_PER_GROUP + 1
            const last = Math.min(first + STEPS_PER_GROUP - 1, stepCount)
            return (
              <button
                key={first}
                type="button"
                aria-pressed={group === index}
                data-playing={playingGroup === index}
                onClick={() => setGroup(index)}
              >
                {first}–{last}
              </button>
            )
          })}
        </div>
      )}
      <div className="sequencer-scroll" role="region" aria-label="Дорожки секвенсора" tabIndex={compact ? undefined : 0}>
        <div
          className="sequencer-grid"
          style={{ '--hue-step': hueStep } as CSSProperties}
        >
          {instruments.map(({ type }, rowIndex) => (
            <div key={type} className="sequencer-row">
              <div className="sequencer-label">{type}</div>
              <div className="sequencer-steps">
                {stepIndexes.map((index) => (
                  <div key={index} className="sequencer-step">
                    <Pad
                      label={`${type}, шаг ${index + 1}`}
                      index={index}
                      rowIndex={rowIndex}
                      isActive={activeIndex === index}
                      isSelected={isSelected(rowIndex, index)}
                      onSelectBit={onSelectBit}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="sequencer-row" aria-hidden="true">
            <div className="sequencer-label" />
            <div className="sequencer-steps">
              {stepIndexes.map((index) => (
                <div
                  key={index + 1}
                  className={`sequencer-step sequencer-number ${activeIndex === index ? 'text-white' : 'text-error'}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
