import { createContext, useState } from "react"

export const IsLoadingContext = createContext()

export const IsLoadingContextProvider = ({children})=> {
  const [isLoading, setIsLoading] = useState(true)

  return(
    <IsLoadingContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </IsLoadingContext.Provider>
  )
}