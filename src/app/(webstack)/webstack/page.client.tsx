'use client'
import React from 'react'
import type { MenuProps } from 'antd'
import { Icon } from '@iconify/react'

import { ToggleSlider } from './components/ToggleSlider'
import { SwitchMode } from './components/SwitchMode'
import { LinkCard } from './components/LinkCard'
import { Aside } from './components/Aside'

type MenuItem = Required<MenuProps>['items'][number]

function renderLinkCard(linkArray: WebStack.Link[]) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {linkArray.map((link) => {
        return (
          <LinkCard
            key={link.url}
            title={link.title}
            description={link.description}
            image={link.logo}
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
function renderContent(props: { data: WebStack.Data[] }) {
  return (
    <div className="content mt-8">
      {
          props.data.map((item, index) => {
            return (
              <div key={index}>
                {
                  item.links
                  && item.links.length > 0
                  && (
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

export default function Page(props: { data: WebStack.Data[] }) {
  const { data } = props
  const asideRef = React.useRef<{ toggle: () => void }>(null)
  const menuList: MenuItem[] = data.map((item) => {
    return {
      label: item.taxonomy,
      key: item.taxonomy,
      icon: <Icon icon={item.icon} />,
      children: item.list?.map((list) => {
        return {
          label: list.term,
          key: list.term,
        }
      }),
    }
  })
  return (
    <div className="webstack-theme block h-full md:flex">
      <Aside ref={asideRef} menu={menuList} />

      <div className="box-border h-32 w-full ">
        <div className="hidden h-16 w-full bg-[var(--background-color)] md:flex">
          <ToggleSlider onClick={() => {
            asideRef.current?.toggle()
          }}
          />
          <SwitchMode />
        </div>
        <RenderContentMemo data={data} />
      </div>
    </div>
  )
}
