'use client'
import { useState } from 'react'
import { Menu } from './Menu'
// import { MenuRC } from './MenuRC'
import { cn } from '@/lib/utils'

interface AsideProps {

}
export function Aside(_props: AsideProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  // const logoHeight = 56
  const size = collapsed ? 64 : 256

  function toggle() {
    setCollapsed(!collapsed)
  }

  return (
    <>
      <PlaceholderElement size={size} />
      <aside
        style={{
          width: `${size}px`,
          minWidth: `${size}px`,
          flex: `0 0 ${size}px`,
        }}
        className={cn(`fixed h-full bg-[#2a2f2c] transition-all`)}
      >
        <div className={cn('relative flex flex-col h-full ps-2 pe-2')}>
          <Logo bigLogo={size === 256} />
          <Trigger size={size} collapsed={collapsed} toggle={toggle} />
          {/* <MenuRC inlineCollapsed={collapsed} /> */}
          <Menu collapsed={collapsed} />
        </div>
      </aside>
    </>
  )
}

interface PlaceholderElementProps {
  size: number
}

function PlaceholderElement(props: PlaceholderElementProps) {
  const { size } = props
  return (
    <div
      style={{
        width: `${size}px`,
        overflow: 'hidden',
        flex: `0 0 ${size}px`,
        maxWidth: `${size}px`,
        minWidth: `${size}px`,
        transition: 'all 0.2s ease 0s',
      }}
    />
  )
}

interface LogoProps {
  bigLogo: boolean
}
function Logo(props: LogoProps) {
  return (
    <div className={cn('box-border flex justify-center border-b', !props.bigLogo ? 'p-4' : 'p-4')}>
      <img className={cn('max-w-[178px] h-[40px]', props.bigLogo ? 'block' : 'hidden')} src="https://webstack.cc/assets/images/logo@2x.png" alt="logo" />
      <img className={cn('max-w-[30px]', !props.bigLogo ? 'block' : 'hidden')} src="https://webstack.cc/assets/images/logo-collapsed@2x.png" alt="logo" />
    </div>
  )
}

interface TriggerProps {
  size: number
  collapsed: boolean
  toggle: () => void
}
function Trigger(props: TriggerProps) {
  // const size = props.size
  return (
    <div
      className="absolute -right-3 top-4 flex size-6 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white"
      onClick={props.toggle}
    >
      <span className="icon-[mingcute--right-fill] size-3 rounded-full bg-black"></span>
    </div>
  )
}
