"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type FontSize = "normal" | "large"

interface FontSizeContextType {
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  toggleFontSize: () => void
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined)

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>("normal")

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize") as FontSize
    if (savedFontSize) {
      setFontSize(savedFontSize)
    }
  }, [])

  const handleSetFontSize = (size: FontSize) => {
    setFontSize(size)
    localStorage.setItem("fontSize", size)
  }

  const toggleFontSize = () => {
    const newSize = fontSize === "normal" ? "large" : "normal"
    handleSetFontSize(newSize)
  }

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize: handleSetFontSize, toggleFontSize }}>
      <div className={fontSize === "large" ? "font-size-large" : "font-size-normal"}>{children}</div>
    </FontSizeContext.Provider>
  )
}

export function useFontSize() {
  const context = useContext(FontSizeContext)
  if (context === undefined) {
    throw new Error("useFontSize must be used within a FontSizeProvider")
  }
  return context
}
