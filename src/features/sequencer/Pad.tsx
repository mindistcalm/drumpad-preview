import { memo, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface PadProps {
  label: string
  rowIndex: number
  index: number
  isActive: boolean
  isSelected: boolean
  onSelectBit: (rowIndex: number, index: number) => void
}

const padHoverStyle = { y: -5 }

export const Pad = memo(function Pad({
  label,
  rowIndex,
  index,
  isActive,
  isSelected,
  onSelectBit,
}: PadProps) {
  return (
    <motion.button
      type="button"
      className="sequencer-pad rounded-lg"
      aria-label={label}
      aria-pressed={isSelected}
      data-active={isActive}
      style={{ '--pad-index': index } as CSSProperties}
      whileHover={padHoverStyle}
      onClick={() => onSelectBit(rowIndex, index)}
    />
  )
})
