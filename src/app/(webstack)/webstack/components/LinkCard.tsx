'use client'
import { useMeasure } from 'react-use'
import React from 'react'
import LazyLoad from 'react-lazy-load'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface LinkCardProps {
  title: string
  description: string
  image: string
  url: string
}
export function LinkCard({ title, description, image, url }: LinkCardProps) {
  const [ref, { width }] = useMeasure()
  function onClick(e: MouseEvent) {
    e.preventDefault()
    window.open(url)
  }
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <a
            onClick={onClick as unknown as any}
            href={url}
            ref={ref as unknown as any}
            className="flex size-4 h-24 w-full cursor-pointer items-center rounded border border-[var(--card-border)] bg-[var(--background-color)] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_40px_-24px_rgba(0,36,100,.3)]"
          >
            <LazyLoad width="2.5rem" height="2.5rem" threshold={0.99}>
              <img src={image} className="size-10 " alt="" />
            </LazyLoad>

            <div className="ml-3 text-xs">
              <p className="line-clamp-1 text-left">
                <strong>{title}</strong>
              </p>
              <p className="line-clamp-2 break-all">{description}</p>
            </div>
          </a>
        </TooltipTrigger>
        <TooltipContent
          className="bg-black"
          style={{ maxWidth: width }}
          side="bottom"
        >
          <p className="break-all text-white">{url}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
