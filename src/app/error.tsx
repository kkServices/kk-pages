'use client'

import { css } from '@emotion/css'
import type { AnimationEvent } from 'react'
import React, { startTransition, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const tiltcard = css`
  @keyframes tiltcard { 0% { transform: rotateY(0deg)} 100% {transform: rotateY(-30deg)}}
  animation: tiltcard .5s ease-in-out 1s forwards;`
const explode = css`
  @keyframes explode {
    0% {transform: translate(0, 0) scale(1);}
    100% {transform: translate(var(--spreaddist), var(--vertdist)) scale(var(--scaledist));}
  }
  animation: explode .5s ease-in-out forwards;
`
const writeLine = css`
  @keyframes writeLine {
    0% {width: 0;}
    100% {width: var(--linelength);}
  }
  animation: writeLine .4s ease-in-out forwards;
`
const pokeup = css`
  transition: all .3s ease;
    &:hover {
      transform: translateY(-10px);
      transition: .3s ease;
    }
`

const containerMedia = css`
  @media screen and (max-width: 1000px) {
    transform: scale(.85);
  }

  @media screen and (max-width: 850px) {
    transform: scale(.75);
  }

  @media screen and (max-width: 775px) {
    flex-wrap: wrap-reverse;
    align-items: inherit;
  }

  @media screen and (max-width: 370px) {
    transform: scale(.6);
  }`

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter()
  const reload = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }
  return (
    <div className={cn('flex h-screen w-full items-center justify-center transition-transform duration-500', containerMedia)}>
      <div className="w-[400px] p-[40px] text-center">
        <h1 className="m-0 p-0 text-[125px] font-bold">500</h1>
        <h2 className="mx-0 mb-0 mt-[-30px] p-0 text-[47px] tracking-[12px]">error</h2>
        <p className="text-base">
          发生了一些错误（$
          {error.digest}
          ）：
          {error.message}
        </p>
        <div className="flex justify-center gap-4">
          <button type="button" className="btn" onClick={reload}>重试</button>
          <button type="button" className="btn" onClick={() => router.push('/')}>返回首页</button>
        </div>
      </div>
      <div className="stack-container relative h-[210px] w-[420px] transition-[width,height] duration-500">
        <Card scaledist={0.75} spreaddist="125px" vertdist="-25px" />
        <Card scaledist={0.8} spreaddist="100px" vertdist="-20px" />
        <Card scaledist={0.85} spreaddist="75px" vertdist="-15px" />
        <Card scaledist={0.9} spreaddist="50px" vertdist="-10px" />
        <Card scaledist={0.95} spreaddist="25px" vertdist="-5px" />
        <Card scaledist={1} spreaddist="0px" vertdist="0px" />
      </div>
    </div>
  )
}

function Card({ spreaddist, scaledist, vertdist }: { spreaddist: string, scaledist: number, vertdist: string }) {
  const perspecCss = css`perspective: 1000px;`
  const [isCardAnimationEnd, setIsCardAnimationEnd] = useState(false)

  const [isPerspecAnimationEnd, setIsPerspecAnimationEnd] = useState(false)

  function perspecAnimationEnd(e: AnimationEvent) {
    if (e.animationName === 'explode') {
      setIsPerspecAnimationEnd(true)
    }
  }
  return (
    <div className={cn('card-container', isPerspecAnimationEnd ? [pokeup, 'hover:cursor-pointer'] : '')}>
      <div
        style={{
          '--spreaddist': spreaddist,
          '--scaledist': scaledist,
          '--vertdist': vertdist,
        } as React.CSSProperties}
        className={cn('_perspec', perspecCss, 'absolute', isCardAnimationEnd ? explode : '')}
        onAnimationEnd={perspecAnimationEnd}
      >
        <div className={cn('_card', tiltcard)} onAnimationEnd={() => { setIsCardAnimationEnd(true) }}>
          <div className={cn('_writing w-[320px] h-[200px] bg-[#3f3f3f] border border-[#bbb] rounded-t-[6px] rounded-b-[4px] relative')}>
            <div className={cn('_topbar', 'absolute w-full h-[12px] bg-[#f1f1f1] rounded-t-[4px]')}>
              <div className={cn('_red', 'h-[6px] w-[6px] rounded-[50%] m-[3px] float-left bg-[red]')}></div>
              <div className={cn('_yellow', 'h-[6px] w-[6px] rounded-[50%] m-[3px] float-left bg-[#e6c015]')}></div>
              <div className={cn('_green', 'h-[6px] w-[6px] rounded-[50%] m-[3px] float-left bg-[#60d060]')}></div>
            </div>
            <div className={cn('_code', 'p-[15px]')}>
              <ul className={cn('list-none m-0 p-0')}>
                {isPerspecAnimationEnd && <CodeLines />}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CodeLines() {
  const [lines, setLines] = useState<any[]>([])
  const numLines = randomIntFromInterval(5, 10)
  useEffect(() => {
    const newLines = []
    for (let index = 0; index < numLines; index++) {
      const lineLength = randomIntFromInterval(25, 97)
      newLines.push({ index, lineLength, writeLine: index === 0 })
    }
    setLines(newLines)
  }, [])

  useEffect(() => {
    lines.forEach((line, index) => {
      if (index > 0) {
        const prevLine = document.querySelector(`.node-${index - 1}`)
        prevLine?.addEventListener('animationend', () => {
          setLines(prevLines => prevLines.map(l => l.index === index ? { ...l, writeLine: true } : l))
        }, { once: true })
      }
    })
  }, [lines])

  return (
    <div className="code">
      <ul>
        {lines.map(line => (
          <li
            key={line.index}
            style={{ '--linelength': `${line.lineLength}%` } as React.CSSProperties}
            className={cn(`node-${line.index}`, `${line.writeLine ? writeLine : ''}`, 'bg-[#9e9e9e] w-0 h-[7px] rounded-[6px] mx-0 my-[10px]')}
          />
        ))}
      </ul>
    </div>
  )
}
