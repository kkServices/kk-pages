'use client'
import React, { useDeferredValue } from 'react'
import type { Layout, Layouts, ResponsiveProps } from 'react-grid-layout'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { cn } from '@/lib/utils'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import '@/style/override/reactGridLayout.scss'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface GridLayoutProps extends ResponsiveProps {
  loading?: React.ReactNode
}
const GridLayoutResponsive: React.FC<GridLayoutProps> = (props: GridLayoutProps) => {
  const { className, loading, onBreakpointChange: _onBreakpointChange, onLayoutChange: _onLayoutChange, ...rest } = props
  const [isInitial, setIsInitial] = React.useState(false)
  const deferredIsInitial = useDeferredValue(isInitial)

  function onBreakpointChange(newBreakpoint: string, newCols: number) {
    if (!isInitial)
      setTimeout(() => setIsInitial(true), 100)

    _onBreakpointChange?.(newBreakpoint, newCols)
  }
  function onLayoutChange(currentLayout: Layout[], allLayouts: Layouts) {
    _onLayoutChange?.(currentLayout, allLayouts)
  }

  return (
    <>
      {loading && !deferredIsInitial && loading}
      <ResponsiveGridLayout
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        className={cn(deferredIsInitial ? 'duration-0 transition-none' : 'opacity-0 duration-0 transition-none')}
        {...rest}
      />
    </>

  )
}

export default GridLayoutResponsive
