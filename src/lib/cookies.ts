"use client"

interface CookieOptions {
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: "strict" | "lax" | "none"
}

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  const { maxAge, expires, path = "/", domain, secure = false, sameSite = "lax" } = options

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (maxAge) {
    cookieString += `; Max-Age=${maxAge}`
  }

  if (expires) {
    cookieString += `; expires=${expires.toUTCString()}`
  }

  cookieString += `; path=${path}`

  if (domain) {
    cookieString += `; domain=${domain}`
  }

  if (secure) {
    cookieString += "; Secure"
  }

  cookieString += `; SameSite=${sameSite}`

  document.cookie = cookieString
}

export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + "="
  const cookies = document.cookie.split(";")

  for (let cookie of cookies) {
    cookie = cookie.trim()
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.slice(nameEQ.length))
    }
  }

  return null
}

export function deleteCookie(name: string) {
  setCookie(name, "", { maxAge: -1 })
}
