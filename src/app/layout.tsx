import {Providers} from "./Providers"
import { Navbar } from "@/components/Navbar"
import "./globals.css"

export default function RootLayout({
  children, 
} : {
  children: React.ReactNode
}){
  return(
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  )
}