'use client'

import type { MenuProps } from 'antd'
import { Button, ConfigProvider, Menu } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useMedia } from 'react-use'

import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

type MenuItem = Required<MenuProps>['items'][number]
interface MenuSliderProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  menu: MenuItem[]
}
export default function MenuSlider(props: MenuSliderProps) {
  const isMd = useMedia('(min-width: 768px)', true)
  // const isLg = useMedia('(min-width: 1024px)')
  const isXl = useMedia('(min-width: 1280px)', false)
  const { collapsed, setCollapsed } = props
  const [mobileIsShowMenu, setMobileIsShowMenu] = useState(false)
  const [openKeys, setOpenKeys] = useState<any[]>([])
  const { setTheme, systemTheme, theme } = useTheme()
  useEffect(() => {
    setCollapsed(isMd && !isXl)
  }, [isMd, isXl])
  const rootSubmenuKeys = useMemo(() => props.menu.filter(item => item?.key).map(item => item?.key), [props.menu])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key))
    if (latestOpenKey && !rootSubmenuKeys.includes(latestOpenKey!))
      setOpenKeys(keys)
    else
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  function onSelect(props: { key: string }) {
    // eslint-disable-next-line react/prop-types
    const element = document.getElementById(props.key)
    if (element)
      element.scrollIntoView({ behavior: 'smooth' })
  }
  function toggle() {
    let currentTheme = theme
    if (currentTheme === 'system')
      currentTheme = systemTheme

    if (currentTheme === 'dark')
      setTheme('light')

    else if (currentTheme === 'light')
      setTheme('dark')
  }

  return (
    <div className="scrollbar-hide relative left-0 bg-[#2c2e2f]">
      <header className="box-border flex w-full items-center justify-between border-b border-[#313437] p-5 xl:flex xl:justify-center">
        <img src="https://webstack.cc/assets/images/logo@2x.png" className={cn('block md:hidden w-full max-w-[178px] xl:block', collapsed ? 'xl:hidden' : '')} />
        <img src="https://webstack.cc/assets/images/logo-collapsed@2x.png" className={cn('hidden w-[40px] md:block lg:block xl:hidden', collapsed ? 'xl:block' : '')} />
        <div className="flex gap-2 text-white md:hidden">
          <span className="icon-[line-md--light-dark] size-6" onClick={toggle}></span>
          <span className="icon-[line-md--menu] size-6" onClick={() => setMobileIsShowMenu(!mobileIsShowMenu)}></span>
        </div>
      </header>

      <div className={cn(
        'text-xs w-full md:block bg-[#2c2e2f]',
        'absolute md:relative',
        mobileIsShowMenu ? '' : 'hidden',
        !collapsed ? 'xl:w-72' : 'w-[80px]',
      )}
      >
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkItemSelectedBg: 'transparent',
                controlOutlineWidth: 0,
                lineWidthFocus: 0,
                darkSubMenuItemBg: 'transparent',
                darkPopupBg: '#2c2e2f',
                // collapsedWidth: '100%' as unknown as number,
              },
            },
          }}
        >
          <Menu
            style={{ background: 'transparent' }}
            theme="dark"

            mode="inline"
            items={props.menu}
            inlineCollapsed={collapsed}
            onSelect={onSelect}
            onOpenChange={onOpenChange}
            openKeys={openKeys}
          />

        </ConfigProvider>
      </div>

    </div>
  )
}
