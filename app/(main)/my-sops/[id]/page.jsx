"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Clock, Edit, FileText, MessageSquare, Share, Users } from 'lucide-react'
import Link from 'next/link'

function SOPDetail({ params }) {
  const id = params.id
  
  // Mock SOP data
  const sop = {
    id: id,
    title: "Customer Onboarding Process",
    department: "Sales",
    updatedAt: "2 hours ago",
    author: "John Smith",
    version: "1.2",
    lastReviewed: "June 15, 2023",
    approvedBy: "Sarah Johnson",
    content: `
# Customer Onboarding Process

## Purpose
This Standard Operating Procedure (SOP) outlines the process for onboarding new customers to ensure a smooth transition and positive customer experience.

## Scope
This procedure applies to all Sales and Customer Success team members involved in the customer onboarding process.

## Responsibilities
- **Sales Representative**: Initial customer contact, needs assessment, and handoff to Customer Success
- **Customer Success Manager**: Primary point of contact during onboarding, responsible for implementation
- **Technical Support**: Provides technical assistance during setup and integration

## Procedure

### 1. Pre-Onboarding Preparation
1.1. Sales Representative completes the Customer Information Form with all relevant details
1.2. Sales Representative schedules a handoff meeting with the assigned Customer Success Manager
1.3. Customer Success Manager reviews customer information and prepares onboarding plan

### 2. Kickoff Meeting
2.1. Customer Success Manager schedules kickoff meeting with customer within 3 business days of contract signing
2.2. During the kickoff meeting:
   - Introduce the Customer Success team
   - Review customer goals and expectations
   - Outline the onboarding timeline and milestones
   - Confirm key stakeholders and their roles
   - Schedule regular check-in meetings

### 3. Implementation
3.1. Customer Success Manager creates customer account in the system
3.2. Technical Support assists with any necessary integrations
3.3. Customer Success Manager provides access credentials to customer
3.4. Customer Success Manager conducts initial training session

### 4. Follow-up and Monitoring
4.1. Customer Success Manager conducts weekly check-in meetings for the first month
4.2. Technical Support addresses any issues within 24 hours
4.3. Customer Success Manager documents all customer interactions in CRM

### 5. Onboarding Completion
5.1. Customer Success Manager conducts final review meeting
5.2. Customer completes satisfaction survey
5.3. Customer Success Manager transitions customer to regular support channels

## Related Documents
- Customer Information Form
- Onboarding Checklist
- Training Materials
    `,
    comments: [
      { id: 1, author: "Sarah Johnson", text: "We should update section 3.2 to include the new integration process.", timestamp: "1 day ago" },
      { id: 2, author: "Mike Chen", text: "I've updated the training materials referenced in this SOP.", timestamp: "3 days ago" }
    ],
    history: [
      { version: "1.2", updatedBy: "John Smith", changes: "Updated section 4.1 to change check-in frequency", date: "June 10, 2023" },
      { version: "1.1", updatedBy: "Sarah Johnson", changes: "Added section 5 for onboarding completion", date: "May 15, 2023" },
      { version: "1.0", updatedBy: "John Smith", changes: "Initial creation", date: "April 2, 2023" }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/my-sops">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold">{sop.title}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Link href={`/my-sops/${id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Metadata */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Department</span>
              <span className="font-medium">{sop.department}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="font-medium">{sop.version}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Last Updated</span>
              <span className="font-medium">{sop.updatedAt}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Author</span>
              <span className="font-medium">{sop.author}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Content Tabs */}
      <Tabs defaultValue="content">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">
            <FileText className="mr-2 h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="comments">
            <MessageSquare className="mr-2 h-4 w-4" />
            Comments ({sop.comments.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: sop.content.replace(/\n/g, '<br>') }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>Discussion about this SOP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sop.comments.map(comment => (
                  <div key={comment.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{comment.author}</h4>
                        <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Version History</CardTitle>
              <CardDescription>Changes made to this SOP over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sop.history.map((version, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Version {version.version}</h4>
                        <span className="text-sm text-muted-foreground">{version.date}</span>
                      </div>
                      <p className="mt-1">Updated by {version.updatedBy}</p>
                      <p className="text-sm text-muted-foreground mt-1">{version.changes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SOPDetail
