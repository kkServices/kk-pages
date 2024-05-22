'use client'
import React, { useDeferredValue } from 'react'
import type { Layout, ReactGridLayoutProps } from 'react-grid-layout'

import ReactGridLayout from 'react-grid-layout'
import { cn } from '@/lib/utils'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

interface GridLayoutProps extends ReactGridLayoutProps {
  loading?: React.ReactNode
}
const GridLayoutResponsive: React.FC<GridLayoutProps> = (props: GridLayoutProps) => {
  const { className, loading, onLayoutChange: _onLayoutChange, ...rest } = props
  const [isInitial, setIsInitial] = React.useState(false)
  const deferredIsInitial = useDeferredValue(isInitial)
  function onLayoutChange(layout: Layout[]) {
    if (!isInitial) {
      setTimeout(() => {
        setIsInitial(true)
      })
    }
    _onLayoutChange?.(layout)
  }

  return (
    <>
      {loading && !deferredIsInitial && loading}
      <ReactGridLayout
        onLayoutChange={onLayoutChange}
        className={cn(deferredIsInitial ? '' : 'invisible transition-none')}
        {...rest}
      />
    </>

  )
}

export default GridLayoutResponsive
