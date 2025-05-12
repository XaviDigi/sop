"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Bell, Search, Clock } from "lucide-react"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuthContext } from '@/app/provider'

function Dashboard() {
    const { user } = useAuthContext();

    // Mock data for dashboard
    const recentSOPs = [
        { id: 1, title: "Customer Onboarding Process", department: "Sales", updatedAt: "2 hours ago" },
        { id: 2, title: "Employee Offboarding Checklist", department: "HR", updatedAt: "1 day ago" },
        { id: 3, title: "Software Deployment Protocol", department: "IT", updatedAt: "2 days ago" },
        { id: 4, title: "Quarterly Financial Review", department: "Finance", updatedAt: "3 days ago" },
    ];

    const notifications = [
        { id: 1, message: "John updated 'Customer Onboarding Process'", time: "2 hours ago" },
        { id: 2, message: "Sarah requested approval for 'New Hire Training'", time: "5 hours ago" },
        { id: 3, message: "IT Security SOP needs review", time: "1 day ago" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className='font-bold text-3xl'>Dashboard</h2>
                <Link href="/create-sop">
                    <Button>+ Create New SOP</Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total SOPs"
                    value="24"
                    description="Across all departments"
                    icon={<FileText className="h-5 w-5 text-muted-foreground" />}
                />
                <StatCard
                    title="Team Members"
                    value="12"
                    description="Active users"
                    icon={<Users className="h-5 w-5 text-muted-foreground" />}
                />
                <StatCard
                    title="Pending Reviews"
                    value="5"
                    description="Awaiting approval"
                    icon={<Bell className="h-5 w-5 text-muted-foreground" />}
                />
                <StatCard
                    title="Search Queries"
                    value="156"
                    description="This month"
                    icon={<Search className="h-5 w-5 text-muted-foreground" />}
                />
            </div>

            {/* Recent SOPs */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent SOPs</CardTitle>
                    <CardDescription>Your recently updated standard operating procedures</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentSOPs.map(sop => (
                            <div key={sop.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <Link href={`/my-sops/${sop.id}`}>
                                            <h3 className="font-medium hover:underline">{sop.title}</h3>
                                        </Link>
                                        <p className="text-sm text-muted-foreground">{sop.department}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{sop.updatedAt}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <Link href="/my-sops">
                            <Button variant="outline">View All SOPs</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                    <CardDescription>Stay updated on changes to your SOPs</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {notifications.map(notification => (
                            <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Bell className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p>{notification.message}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{notification.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <Link href="/notifications">
                            <Button variant="outline">View All Notifications</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function StatCard({ title, value, description, icon }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

export default Dashboard