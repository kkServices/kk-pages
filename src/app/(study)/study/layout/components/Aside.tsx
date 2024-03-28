'use client'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
// import { MenuRC } from './MenuRC'
import { AliwangwangOutlined } from '@ant-design/icons'
import { cn } from '@/lib/utils'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { MenuAntd } from '@/app/(study)/study/layout/components/MenuAntd'
import { ToggleSlider } from '@/app/(webstack)/webstack/components/ToggleSlider'
import SwitchMode from '@/app/(webstack)/webstack/components/SwitchMode'

const LARGE_SIZE = 256
const SMALL_SIZE = 64

interface AsideProps {
  ref?: React.Ref<{ toggle: () => void }>
}

// eslint-disable-next-line react/display-name
export const Aside = forwardRef((props: AsideProps, ref) => {
  const [showMenu, setShowMenu] = useState<boolean>(true)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  // const logoHeight = 56
  const size = collapsed ? SMALL_SIZE : LARGE_SIZE
  const breakpoint = useBreakpoint()()
  useEffect(() => {
    if (breakpoint === 'LG' || breakpoint === 'MD' || breakpoint === 'SM')
      setCollapsed(true)
    else
      setCollapsed(false)
  }, [breakpoint])

  function toggle() {
    setShowMenu(!showMenu)
  }

  function showMenuComputed() {
    if (breakpoint === 'SM')
      return showMenu
    else
      return true
  }
  useImperativeHandle(ref, () => ({
    toggle: () => setCollapsed(!collapsed),
  }))
  return (
    <>
      <PlaceholderElement size={size} />
      <aside
        className={cn(
            `md:fixed md:h-full bg-[#2a2f2c] transition-all w-full  md:w-auto`,
            collapsed ? `md:w-[64px]` : `md:w-[256px]`,
        )}
      >
        <div className={cn('relative flex flex-col h-full ps-2 pe-2')}>
          <Title collapsed={collapsed} showMenu={showMenu} toggleMenuShow={toggle} />
          {/* <Logo bigLogo={size === LARGE_SIZE} /> */}
          {/* <Trigger size={size} collapsed={collapsed} toggle={toggle} /> */}
          <MenuAntd
            inlineCollapsed={breakpoint === 'SM' ? false : collapsed}
            menu={[
              {
                title: '1',
                label: '1',
                key: '1',
                icon: <AliwangwangOutlined />,
                children: [{ title: '1-1', label: '1-1', key: '1-1' }],
              },
              {
                title: '2',
                label: '2',
                key: '2',
                icon: <AliwangwangOutlined />,
                children: [{ title: '2-1', label: '2-1', key: '2-1' }],
              },
            ]}
            className={cn(showMenuComputed() ? 'block' : 'hidden')}
          />

          {/* <MenuRC inlineCollapsed={collapsed} /> */}
          {/* <Menu collapsed={collapsed} /> */}
        </div>
      </aside>
    </>
  )
})

interface PlaceholderElementProps {
  size: number
}

function PlaceholderElement(props: PlaceholderElementProps) {
  const { size } = props
  return (
    <div
      className="hidden md:block"
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
  collapsed: boolean
}
function Logo(props: LogoProps) {
  const { collapsed } = props
  return (
    <>
      <div className="box-border block justify-center p-4 md:hidden">
        <img
          className={cn('max-w-[178px] h-[40px]')}
          src="https://webstack.cc/assets/images/logo@2x.png"
          alt="logo"
        />
      </div>

      <div className={cn('box-border justify-center md:flex hidden', !collapsed ? 'p-4' : 'p-4')}>

        <img
          className={cn('max-w-[178px] h-[40px]', !collapsed ? 'block' : 'hidden')}
          src="https://webstack.cc/assets/images/logo@2x.png"
          alt="logo"
        />
        <img
          className={cn('max-w-[30px]', collapsed ? 'block' : 'hidden')}
          src="https://webstack.cc/assets/images/logo-collapsed@2x.png"
          alt="logo"
        />
      </div>
    </>
  )
}

// interface TriggerProps {
//   size: number
//   collapsed: boolean
//   toggle: () => void
// }

// function Trigger(props: TriggerProps) {
//   // const size = props.size
//   return (
//     <div
//       className="absolute -right-3 top-4 flex size-6 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white"
//       onClick={props.toggle}
//     >
//       <span className="icon-[mingcute--right-fill] size-3 rounded-full bg-black"></span>
//     </div>
//   )
// }

interface TitleProps {
  collapsed: boolean
  showMenu: boolean
  toggleMenuShow: () => void
}
function Title(props: TitleProps) {
  const { collapsed, toggleMenuShow } = props
  return (
    <div className="flex w-full justify-between px-4 md:justify-center md:p-0">
      <Logo collapsed={collapsed} />
      <div className="flex  bg-[var(--background-color)] text-white md:hidden">
        <ToggleSlider onClick={() => { toggleMenuShow() }} />
        <SwitchMode />
      </div>
    </div>
  )
}
