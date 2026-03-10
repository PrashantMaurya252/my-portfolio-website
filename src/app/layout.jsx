import localFont from "next/font/local";
import "./globals.css";
import { Icon } from "@iconify/react";
import ComputerNavbar from "@/components/ComputerNavbar";
import { Inter } from 'next/font/google'
import {Analytics} from '@vercel/analytics/react';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});


const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Prashant Kumar Maurya",
  description: "Full Stack Developer",
};

export default function RootLayout({ children }) {

  const navItems =[
    {
      id:1,
      label:'About Me',
      path:'/',
      icon:<Icon icon="material-symbols:person" width="1.2em" height="1.2em"  style={{color: 'gray'}} />

    },
    {
      id:2,
      label:'Skills',
      path:'/skills',
      icon:<Icon icon="game-icons:skills" width="1.2em" height="1.2em"  style={{color: 'gray'}} />

    },
    {
      id:3,
      label:'Projects',
      path:'/projects',
      icon:<Icon icon="academicons:ideas-repec" width="1.2em" height="1.2em"  style={{color: 'gray'}} />

    },
    {
      id:4,
      label:'Experience',
      path:'/experience',
      icon:<Icon icon="academicons:ideas-repec" width="1.2em" height="1.2em"  style={{color: 'gray'}} />

    },
    {
      id:5,
      label:'Education/Certificates',
      path:'/education',
      icon:<Icon icon="ph:certificate-fill" width="1.2em" height="1.2em"  style={{color: 'gray'}}  />

    },
   
  ]
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        {children}
        <Analytics />
      </body>
    </html>
  );
}
