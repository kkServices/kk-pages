import Menu, { MenuItem, SubMenu } from 'rc-menu'
import { cn } from '@/lib/utils'
// import 'rc-menu/assets/index.css'

function MenuItemLink(props: { isSub?: boolean }) {
  return (
    <a
      className={cn(
        'relative flex flex-1 items-center border-b border-[#313437] px-1 py-3.5 text-[#979898] transition-all duration-200 ease-in-out',
        'hover:text-white',
      )}
      href="#"
    >
      <span className={cn('icon-[fa6-regular--star] mr-2.5 block')}></span>
      <span className={cn('block flex-1')}>
        菜单1
      </span>
      {
            props.isSub && <span className={cn('icon-[fa6-solid--angle-right] block')} />
      }
    </a>
  )
}

interface MenuRCProps {
  inlineCollapsed: boolean
}
export function MenuRC(props: MenuRCProps) {
  return (
    <Menu
      itemIcon={<span className={cn('icon-[fa6-regular--star] itemIcon')}></span>}
      expandIcon={
        <span className={cn('icon-[fa6-solid--angle-right] expandIcon')} />
      }
      prefixCls="webstack-menu"
      className="Menu text-sm text-white"
      mode="inline"
      inlineCollapsed={props.inlineCollapsed}
    >
      <MenuItem
        key="1"
        className="MenuItem 1 flex items-center"
        itemIcon={<></>}
      >
        <MenuItemLink />
      </MenuItem>
      <SubMenu
        className=""
        title="as"
        key="2"
      >
        <MenuItem key="2-1" className="MenuItem 2-1">
          <MenuItemLink />
        </MenuItem>
        <MenuItem key="2-2" className="MenuItem 2-2">
          <MenuItemLink />
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
