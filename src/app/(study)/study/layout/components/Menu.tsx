/* eslint-disable react/no-children-prop */
'use client'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const menu = [
  {
    text: '1',
    children: [
      { text: '1 - 1', children: [{ text: '1 - 1 - 1' }, { text: '1 - 1 - 2' }, { text: '1 - 1 - 3' }] },
      { text: '1 - 2' },
      { text: '1 - 2' },
    ],
  },
  {
    text: '2',
    children: [
      { text: '2 - 1' },
      { text: '2 - 2' },
      { text: '2 - 3' },
    ],
  },
  {
    text: '3',
    children: [
      { text: '3 - 1' },
      { text: '3 - 2' },
      { text: '3 - 3' },
    ],
  },
  {
    text: '4',
    children: [
      { text: '4 - 1' },
      { text: '4 - 2' },
      { text: '4 - 3' },
    ],
  },
]

interface MenuProps {
  collapsed: boolean
}
export function Menu(props: MenuProps) {
  // const [showKeys, setShowKeys] = useState([])
  return (
    <>
      <ul className={cn('text-sm text-white scrollbar-hide', props.collapsed ? 'overflow-y-visible' : 'px-5 overflow-y-scroll')}>
        {
              menu.map((item, index) => {
                if (item.children) {
                  return (
                    <SubMenu
                      text={item.text}
                      collapsed={props.collapsed}
                      key={`${index}`}
                      // onClick={(e) => {
                      //   console.log('click', e)
                      // }}
                    >
                      {
                        item.children?.map((child, index) => {
                          return (
                            <MenuItem
                              key={index}
                              text={child.text}
                              collapsed={false}
                              // onClick={(e) => {
                              //   console.log('click', e)
                              // }}
                            />
                          )
                        })
                      }
                    </SubMenu>
                  )
                }
                return (
                  <MenuItem
                    key={index}
                    text={item.text}
                    collapsed={props.collapsed}
                    children={item.children}
                    // onClick={(e) => {
                    //   console.log('click', e)
                    // }}
                  />
                )
              })
          }
      </ul>
    </>
  )
}

interface MenuItemProps {
  key?: number
  text: string
  collapsed: boolean
  link?: string
  onClick?: (e: any) => void
  children?: any[]
  className?: string
  style?: React.CSSProperties

}
function MenuItem(props: MenuItemProps) {
  const { text, collapsed } = props

  return (
    <li className="relative">
      <a
        className={cn(
          'relative flex items-center border-b border-[#313437] px-1 py-3.5 text-[#979898] transition-all duration-200 ease-in-out',
          'hover:text-white',
          collapsed && 'justify-center',
        )}
        href="#"
        onClick={(e) => {
          e.preventDefault()

          props.onClick && props.onClick(props.key)
        }}
      >
        <span className={cn('icon-[fa6-regular--star] mr-2.5 block', collapsed ? 'mr-0' : '')}></span>
        <span className={cn('block', collapsed ? 'hidden' : 'flex-1')}>
          {text}
        </span>
        <span
          className={cn('icon-[fa6-solid--angle-right] transition duration-300 ease-in-out block', collapsed ? 'hidden' : '')}
        >
        </span>
      </a>
    </li>

  )
}

interface SubMenuProps {
  key: string
  text: string
  collapsed: boolean
  showKeys?: string[]
  children: ReactNode
  onClick?: (e: any) => void
}
function SubMenu(props: SubMenuProps) {
  const { collapsed, text, showKeys, key } = props
  const [_showChildren, setShowChildren] = useState(false)
  const showChildren = showKeys ? showKeys.includes(key) : _showChildren
  return (
    <li className="group relative" key={key}>
      <a
        className={cn(
          'relative flex items-center border-b border-[#313437] px-1 py-3.5 text-[#979898] transition-all duration-200 ease-in-out',
          'hover:text-white',
          collapsed && 'justify-center',
        )}
        href="#"
        onClick={(e) => {
          e.preventDefault()
          if (showKeys !== undefined)
            props.onClick && props.onClick(key)
          else
            setShowChildren(!showChildren)
        }}
      >
        <span className={cn('icon-[fa6-regular--star] mr-2.5 block', collapsed ? 'mr-0' : '')}></span>
        <span className={cn('block', collapsed ? 'hidden' : 'flex-1')}>
          {text}
        </span>
        <span
          className={cn('icon-[fa6-solid--angle-right] transition duration-300 ease-in-out block', collapsed ? 'hidden' : '')}
        >
        </span>
      </a>

      <div className={cn(
        'h-0 overflow-hidden',
        collapsed ? 'hidden group-hover:block absolute bg-[#2a2f2c] left-full top-0 group-hover:h-auto group-hover:w-32 px-4 box-border' : '',
        (!collapsed && showChildren) ? 'h-auto' : '',
      )}
      >
        <ul className={cn(
          'transition-all duration-200 ease-in-out relative',
          showChildren ? '' : '',
        )}
        >
          {props.children}
        </ul>
      </div>
    </li>
  )
}
