'use client'
import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import styles from './theme.module.css'
import dataYml from './data.yml'
import MenuSlider from './components/MenuSlider'
import { ToggleSlider } from './components/ToggleSlider'
import SwitchMode from './components/SwitchMode'
import { LinkCard } from './components/LinkCard'
import { cn } from '@/lib/utils'
import '@fortawesome/fontawesome-free/css/all.css'

type MenuItem = Required<MenuProps>['items'][number]

const data: WebStack.Data[] = dataYml
const menuList: MenuItem[] = data.map((item) => {
  return {
    label: item.taxonomy,
    key: item.taxonomy,
    icon: <i className={item.icon}></i>,
    children: item.list?.map((list) => {
      return {
        label: list.term,
        key: list.term,
      }
    }),
  }
})

function renderLinkCard(linkArray: WebStack.Link[]) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {linkArray.map((link, index) => {
        return (
          <LinkCard
            key={index + link.url}
            title={link.title}
            description={link.description}
            image={`https://static.bioitee.com/webstack/logos/${link.logo}`}
            url={link.url}
          />
        )
      })}
    </div>
  )
}
function renderLabelTittle(label: string) {
  return (
    <h4 className="mt-2 box-border flex items-center px-8 text-lg" id={label}>
      <span className="icon-[ant-design--tag-outlined] mr-2 rotate-45"></span>
      <span>{label}</span>
    </h4>
  )
}
function renderContent() {
  return (
    <div className="content mt-8">
      {
        data.map((item, index) => {
          return (
            <div key={index}>
              {
                item.links && item.links.length > 0 && (
                  <>
                    {renderLabelTittle(item.taxonomy)}
                    {renderLinkCard(item.links)}
                  </>
                )
              }

              {
                item.list && item.list.length > 0 && (
                  <div>
                    {
                      item.list.map((list, index) => {
                        return (
                          <div key={index}>
                            {renderLabelTittle(list.term)}
                            {renderLinkCard(list.links)}
                          </div>
                        )
                      })
                    }

                  </div>
                )
              }
            </div>
          )
        })
      }

    </div>
  )
}
const RenderContentMemo = React.memo(renderContent)

export default function Page() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn('block  flex-col md:flex-row md:flex', styles.webstackTheme)}>
      <MenuSlider collapsed={collapsed} menu={menuList} setCollapsed={setCollapsed} />

      <div className="flex-1 overflow-auto">
        <div className="hidden h-16 w-full bg-[var(--background-color)] md:flex">
          <ToggleSlider onClick={() => {
            setCollapsed(!collapsed)
          }}
          />
          <SwitchMode />
        </div>

        <RenderContentMemo />
      </div>
    </div>
  )
}
