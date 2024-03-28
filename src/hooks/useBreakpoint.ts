import { createBreakpoint } from 'react-use'

type Breakpoint = '2XL' | 'XL' | 'LG' | 'MD' | 'SM'
// export const useBreakpoint:Breakpoint as string =

export function useBreakpoint() {
  return createBreakpoint(
    { '2XL': 1536, 'XL': 1280, 'LG': 1024, 'MD': 768, 'SM': 640 },
  ) as unknown as () => Breakpoint
}
