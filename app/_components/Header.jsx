"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Authentication from './Authentication'
import { useAuthContext } from '../provider'
import Link from 'next/link'

function Header() {
    const { user } = useAuthContext();
    return (
        <div className='py-5 px-6 md:px-8 flex items-center justify-between border-b border-border bg-background'>
            <div className='flex items-center gap-3'>
                <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-md">
                    <span className="font-bold text-lg">SOP</span>
                </div>
                <h2 className='text-2xl font-bold text-primary'>SOP Manager</h2>
            </div>

            <div>
                {!user ? (
                    <div className='flex items-center gap-4'>
                        <Link href={'/sign-in'}>
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Sign In</Button>
                        </Link>
                        <Authentication>
                            <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
                        </Authentication>
                    </div>
                ) : (
                    <div className='flex items-center gap-4'>
                        <Link href={'/dashboard'}>
                            <Button className="bg-primary hover:bg-primary/90 text-white">Dashboard</Button>
                        </Link>
                        {user?.pictureURL && (
                            <Image
                                src={user?.pictureURL}
                                alt='userImage'
                                width={40}
                                height={40}
                                className='rounded-full border-2 border-primary/20'
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header