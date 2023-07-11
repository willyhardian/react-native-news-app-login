import { createContext, useState } from "react";

const ThemeContext = createContext();
function ThemeProvider({ children }) {
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme)
    }
    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }