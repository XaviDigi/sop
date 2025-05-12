"use client"
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HomeIcon, FileText, Search, Users, Settings, Bell, MessageSquare, Youtube } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '@/app/provider'

const MenuItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: HomeIcon
    },
    {
        title: 'My SOPs',
        url: '/my-sops',
        icon: FileText
    },
    {
        title: 'Explore',
        url: '/explore',
        icon: Search
    },
    {
        title: 'YouTube Highlights',
        url: '/youtube-highlights',
        icon: Youtube,
        highlight: true
    },
    {
        title: 'Team',
        url: '/team',
        icon: Users
    },
    {
        title: 'Notifications',
        url: '/notifications',
        icon: Bell
    },
    {
        title: 'SOP Assistant',
        url: '/chat',
        icon: MessageSquare
    },
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings
    }
]

function AppSidebar() {
    const path = usePathname();
    const { user } = useAuthContext();
    console.log(path)
    return (
        <Sidebar>
            <SidebarHeader>
                <div>
                    <div className='flex items-center gap-3 w-full justify-center mt-5'>
                        <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-md">
                            <Youtube className="w-6 h-6" />
                        </div>
                        <h2 className='font-bold text-2xl'>YouTube Shorts</h2>
                    </div>
                    <h2 className='text-lg text-gray-400 text-center mt-3'>AI-Powered Video Highlights</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className='mx-3 mt-8'>
                            <Link href={'/create-new-video'}>
                                <Button className="w-full">+ Create New Video</Button>
                            </Link>
                        </div>
                        <SidebarMenu>
                            {MenuItems.map((menu, index) => (
                                <SidebarMenuItem className="mt-3" key={index}>
                                    <SidebarMenuButton
                                        isActive={path == menu.url}
                                        className={`p-5 ${menu.highlight ? 'bg-primary/10 hover:bg-primary/20' : ''}`}
                                    >
                                        <Link href={menu?.url} className='flex items-center gap-4 p-3'>
                                            <menu.icon className={menu.highlight ? 'text-primary' : ''} />
                                            <span className={menu.highlight ? 'font-medium text-primary' : ''}>{menu?.title}</span>
                                            {menu.highlight && (
                                                <span className="ml-2 flex h-2 w-2 rounded-full bg-primary"></span>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter >
                <div className='p-5 border rounded-lg mb-6 bg-gray-800'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-gray-400'>Need help?</h2>
                    </div>
                    <Link href={'/contact'} className='w-full'>
                        <Button className="w-full mt-3">Contact Support</Button>
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar