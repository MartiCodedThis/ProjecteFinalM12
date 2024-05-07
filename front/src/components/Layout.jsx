import React from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <main className="bg-appbg text-apptext px-3 md:px-8 xl:px-16 py-12 min-h-custom">
                <div className="py-6 md:py-10"></div>
                {children}
            </main>
            <Footer/>
        </>
    )
}