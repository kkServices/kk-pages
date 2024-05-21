import React from 'react'
import { cn } from '@/lib/utils'

type IconName1 = 'icon-['
type IconName2 = ']'
type IconName = `${IconName1}${string}${IconName2}`

interface IconProps {
  icon: IconName
  className?: string
}
const Icon: React.FC<IconProps> = (props: IconProps) => {
  const className = cn(['align-middle', props.icon], props.className)

  return <i className={className} />
}

export default Icon
