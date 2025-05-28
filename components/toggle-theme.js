"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ToggleTheme() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const [isDark, setIsDark] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  React.useEffect(() => {
    if (!hasMounted) return

    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark, hasMounted])

  const toggleTheme = () => {
    setIsAnimating(true)

    setTimeout(() => {
      setIsDark((prev) => !prev)
      setTimeout(() => {
        setIsAnimating(false)
      }, 600)
    }, 300)
  }

  if (!hasMounted) return null

  return (
    <>
      {/* Full Page Animation Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 transition-all duration-700 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            !isDark
              ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
              : "bg-gradient-to-br from-yellow-200 via-orange-300 to-pink-200"
          }`}
        >
          {/* Ripple Effect */}
          <div
            className={`absolute inset-0 ${
              isAnimating ? "animate-ping" : ""
            } ${
              !isDark ? "bg-purple-600/20" : "bg-yellow-400/20"
            } rounded-full transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2`}
          ></div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full animate-bounce ${
                  !isDark ? "bg-purple-300" : "bg-yellow-400"
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 1.5}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Expanding Circles */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              isAnimating ? "animate-pulse" : ""
            }`}
          >
            <div
              className={`w-32 h-32 rounded-full border-4 ${
                !isDark
                  ? "border-purple-400/50"
                  : "border-yellow-400/50"
              } animate-ping`}
            ></div>
            <div
              className={`absolute w-64 h-64 rounded-full border-2 ${
                !isDark
                  ? "border-purple-300/30"
                  : "border-yellow-300/30"
              } animate-ping`}
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Theme Toggle Button - Top Right Corner */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          disabled={isAnimating}
          className={`relative h-12 w-12 rounded-full transition-all duration-300 hover:scale-110 ${
            isAnimating ? "animate-spin" : ""
          } ${
            isDark
              ? "bg-slate-800 border-yellow-400 text-yellow-400 shadow-lg shadow-yellow-400/25"
              : "bg-white border-purple-400 text-purple-600 shadow-lg shadow-purple-400/25"
          }`}
        >
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all duration-500 ${
              isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ${
              isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
            }`}
          />
        </Button>
      </div>
    </>
  )
}
