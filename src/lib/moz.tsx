import { createContext, useContext } from 'react'

export interface Store<T> {
  Provider: (props: ProviderProps) => any
  useStore: () => T
}

interface ProviderProps {
  children?: any
}

export type Hook<S, P> = (params?: P) => S

export function createMozStore<ObservableState, P = void>(useHook: Hook<ObservableState, P>, params?: P): Store<ObservableState> {
  const Context = createContext<ObservableState | null>(null)

  const Provider = (props: ProviderProps) => {
    const { children } = props
    return <Context.Provider value={useHook(params)}>{children}</Context.Provider>
  }

  function useStore(): ObservableState {
    const state = useContext(Context)
    if (state === null) {
      // throw new Error("your target Component must be wrapped by Provider");
      return {} as any
    }
    return state
  }

  return { Provider, useStore }
}
