"use client"
import { useAuthContext } from '@/app/provider'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/configs/firebaseConfig'
import { toast } from 'sonner'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'


function AppHeader() {
    const { user, setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const handleSignOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser(null);
            toast.success("Signed out successfully");
            router.replace('/');
        }).catch((error) => {
            // An error happened.
            console.error("Sign-out error:", error);
            toast.error("Failed to sign out. Please try again.");
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className='p-3 flex justify-between items-center'>
            <SidebarTrigger />

            <Popover>
                <PopoverTrigger>
                    {user?.pictureURL ? (
                        <Image
                            src={user?.pictureURL}
                            alt='user'
                            width={40}
                            height={40}
                            className='rounded-full cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all'
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-all">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                    )}
                </PopoverTrigger>
                <PopoverContent className='w-[220px]'>
                    <div className="flex flex-col space-y-1 p-2">
                        <div className="flex items-center gap-2 p-2 rounded-md">
                            {user?.pictureURL ? (
                                <Image
                                    src={user?.pictureURL}
                                    alt='user'
                                    width={32}
                                    height={32}
                                    className='rounded-full'
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-4 w-4 text-primary" />
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{user?.name || "User"}</span>
                                <span className="text-xs text-muted-foreground">{user?.email || ""}</span>
                            </div>
                        </div>

                        <div className="h-px bg-border my-1" />

                        <Link href="/settings">
                            <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Button>
                        </Link>

                        <Button
                            variant="ghost"
                            className="w-full justify-start text-sm"
                            size="sm"
                            onClick={handleSignOut}
                            disabled={isLoading}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            {isLoading ? "Signing out..." : "Sign out"}
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default AppHeader