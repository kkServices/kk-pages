'use client'
import { useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import { animated, useSpring } from '@react-spring/web'
import { cn } from '@/lib/utils'

interface Menu {
  text: string
  link?: string
  children?: Menu[]
}
interface MenuListProps {
  menu: Menu[]
  className?: string
}
export function MenuList(props: MenuListProps) {
  const { menu } = props

  return (
    <>
      <MenuSub menu={menu} isCollapsed={true} init />
      {/* <div className="mt-12">
        <MenuItem text="关于本站" hasChildren={false} isCollapsed={false} />
        <MenuItem text="本站访问量" hasChildren={false} isCollapsed={false} />
        <MenuItem text="本站访问量" hasChildren={false} isCollapsed={false} />
      </div> */}
    </>
  )
}

function MenuItem({ link, text, onClick, className, style, isCollapsed, hasChildren }: { link?: string, text: string, isCollapsed: boolean, hasChildren: boolean, className?: string, style?: any, onClick?: () => void }) {
  return (
    <a
      className={cn(
        'flex items-center border-b border-[#313437] px-1 py-3.5 text-[#979898] transition-all duration-200 ease-in-out',
        'hover:text-white',
        'md:justify-center',
        isCollapsed ? 'text-white' : '',
        className,
      )}
      style={style}
      href={link || ''}
      onClick={(e) => {
        e.preventDefault()
        onClick && onClick()
      }}
    >
      <span className="icon-[fa6-regular--star] mr-2.5 block md:mr-0"></span>
      <span className="block flex-1 ">
        {text}
      </span>
      {
        hasChildren && <span className={cn('icon-[fa6-solid--angle-right] transition duration-300 ease-in-out block md:hidden', isCollapsed ? 'rotate-90' : 'rotate-0')}></span>
      }

    </a>
  )
}

function MenuSub({ menu, isCollapsed, className, init }: { menu: Menu[], isCollapsed: boolean, init: boolean, className?: string }) {
  init = init || false
  const [ref, { height }] = useMeasure()
  const props = useSpring({ height: isCollapsed ? height : 0 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    setOpenIndex(null)
  }, [isCollapsed])

  return (
    <animated.div className={cn('overflow-hidden h-auto md:block')} style={init ? {} : props}>
      <ul
        ref={ref as unknown as any}
        className={cn(
          'list-none transition-all duration-200 ease-in-out',
          className,
        )}
      >
        {menu.map((item, index) => (
          <li key={index} className="relative">
            <MenuItem
              isCollapsed={openIndex === index}
              hasChildren={(item.children && item.children.length > 0) || false}
              text={item.text}
              link={item.link}
              className={isCollapsed ? 'fadeInLeft opacity-0' : 'opacity-0'}
              style={{
                animationDelay: `${(index) * 0.06}s`,
                animationFillMode: 'forwards',
              }}
              onClick={() => {
                if (item.children?.length)
                  setOpenIndex(openIndex === index ? null : index)
              }}
            />
            {item.children?.length && (
              <MenuSub menu={item.children} isCollapsed={openIndex === index} className="pl-4" init={false} />
            )}

          </li>
        ))}

      </ul>
    </animated.div>

  )
}
