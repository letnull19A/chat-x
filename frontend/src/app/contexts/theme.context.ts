import {createContext} from 'react'

export type TThemeContext = {
 theme: string
 setTheme: (theme: string) => null
}

const ThemeContext = createContext<TThemeContext>({
 theme: 'default',
 setTheme: () => null
})

export default ThemeContext
