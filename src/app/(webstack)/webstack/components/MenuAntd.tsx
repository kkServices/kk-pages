import { ConfigProvider, Menu, type MenuProps } from 'antd'
import { useMemo, useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]
interface MenuAntdProps {
  menu: MenuItem[]
  inlineCollapsed: boolean

  className?: string
}
export function MenuAntd(props: MenuAntdProps) {
  const { menu, inlineCollapsed, className } = props
  const rootSubmenuKeys = useMemo(() => props.menu.filter(item => item?.key).map(item => item?.key), [props.menu])
  const [openKeys, setOpenKeys] = useState<any[]>([])
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key))
    if (latestOpenKey && !rootSubmenuKeys.includes(latestOpenKey!))
      setOpenKeys(keys)
    else
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  function onSelect(props: { key: string }) {
    const element = document.getElementById(props.key)
    if (element)
      element.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemSelectedBg: 'transparent',
            controlOutlineWidth: 0,
            lineWidthFocus: 0,
            darkSubMenuItemBg: 'transparent',
            darkPopupBg: '#2c2e2f',
            collapsedWidth: 64 - 16,
          },
        },
      }}
    >
      <Menu
        style={{ background: 'transparent' }}
        theme="dark"
        mode="inline"
        items={menu}
        inlineCollapsed={inlineCollapsed}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        className={className}
      />

    </ConfigProvider>
  )
}
