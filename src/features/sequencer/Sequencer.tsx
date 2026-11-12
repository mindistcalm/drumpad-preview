import { SequencerGrid } from './SequencerGrid'
import { MAX_STEP_COUNT, MIN_STEP_COUNT, useSequencer } from './useSequencer'
import './sequencer.css'

export function Sequencer() {
  const { cardsPerRow, setCardsPerRow, reset, ...grid } = useSequencer()

  return (
    <main className="sequencer bg-background">
      <div className="sequencer-controls bg-gray-100 rounded-lg">
        <label className="sequencer-length">
          <span>Длина дорожки</span>
          <input
            type="range"
            min={MIN_STEP_COUNT}
            max={MAX_STEP_COUNT}
            value={cardsPerRow}
            onChange={(event) => setCardsPerRow(Number(event.target.value))}
          />
        </label>
        <button type="button" onClick={reset}>
          Сбросить
        </button>
      </div>
      <SequencerGrid stepCount={cardsPerRow} {...grid} />
    </main>
  )
}
