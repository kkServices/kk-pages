'use client'
import type { Layout } from 'react-grid-layout'
import React from 'react'
import GridLayoutResponsive from '@/components/kUi/layout/GridLayoutResponsive'
import { ModeToggle } from '@/components/business/mode/Toggle'
import { ModeSelect } from '@/components/business/mode/Select'

const Page: React.FC = () => {
  // 12
  const layoutXl: Layout[] = [
    { i: 'a', x: 0, y: 0, w: 8, h: 4, isDraggable: true, isResizable: false },
    { i: 'b', x: 8, y: 0, w: 3, h: 2, isDraggable: true, isResizable: false },
    { i: 'c', x: 8, y: 0, w: 1, h: 2, isDraggable: true, isResizable: false },
  ]
  // 10
  const layoutLg: Layout[] = [
    { i: 'a', x: 0, y: 0, w: 5, h: 4, isDraggable: true, isResizable: false },
    { i: 'b', x: 5, y: 0, w: 3, h: 2, isDraggable: true, isResizable: false },
    { i: 'c', x: 5, y: 0, w: 1, h: 2, isDraggable: true, isResizable: false },
  ]
  // 8
  const layoutMd: Layout[] = [
    { i: 'a', x: 0, y: 0, w: 4, h: 4, isDraggable: true, isResizable: false },
    { i: 'b', x: 4, y: 0, w: 3, h: 2, isDraggable: true, isResizable: false },
    { i: 'c', x: 4, y: 0, w: 1, h: 2, isDraggable: true, isResizable: false },
  ]
  // 1
  const layoutSm: Layout[] = [
    { i: 'a', x: 0, y: 0, w: 1, h: 4, isDraggable: true, isResizable: false },
    { i: 'b', x: 0, y: 2, w: 1, h: 2, isDraggable: true, isResizable: false },
    { i: 'c', x: 0, y: 6, w: 1, h: 2, isDraggable: true, isResizable: false },
  ]
  const layouts = {
    xl: layoutXl,
    lg: layoutLg,
    md: layoutMd,
    sm: layoutSm,
  }

  return (
    <div className="mx-auto max-w-[1440px] border">
      <GridLayoutResponsive
        layouts={layouts}
        rowHeight={30}
        loading={<div className="absolute">loading</div>}
        cols={{ xl: 12, lg: 10, md: 8, sm: 1 }}
        breakpoints={{ xl: 1280, lg: 1024, md: 768, sm: 640 }}
      >
        <div key="a" className="bg-card">
          <p className="text-[16px]">16px </p>
          <p className="text-[12px]">12px</p>
          <p className="text-[.5rem]">.5rem</p>
          <div>
            <p>这是一个块级盒子</p>
            <span className="text-[12px] ">12px</span>
            <span className="scale-[50%] text-[12px]">transform</span>
            <span className="text-[12px] ">后边的文字</span>
          </div>
        </div>
        <div key="b" className="bg-blue-200">
          <ModeSelect />
        </div>
        <div key="c" className="absolute z-10 flex items-center justify-center bg-blue-300">
          <ModeToggle />
        </div>
      </GridLayoutResponsive>
    </div>
  )
}

export default Page
