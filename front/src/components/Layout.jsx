import React from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <main className="bg-appbg text-apptext px-12 lg:px-24 py-12 min-h-custom">
                <div className="py-10"></div>
                {children}
            </main>
            <Footer/>
        </>
    )
}