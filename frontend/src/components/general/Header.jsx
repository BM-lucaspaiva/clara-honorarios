import { Link } from "react-router-dom"

import React from "react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
            <Link className="flex items-center gap-3" to="/dashboard">
                <div className="size-6 text-blue-600">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <h2 className="text-lg font-bold tracking-tight">Clara Honorários</h2>
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium">
                <Link className="text-blue-600" to="/dashboard">
                    Dashboard
                </Link>
                <Link className="text-slate-600 transition-colors hover:text-slate-900" to="/historico">
                    Histórico
                </Link>
            </nav>
        </div>
    </header>
    )
}