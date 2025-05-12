"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Clock, Download, FileText, Share, ThumbsUp, Users, Building, Tag, Copy } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/app/provider'

function TemplateDetailPage({ params }) {
  const router = useRouter()
  const { user } = useAuthContext()
  const id = params.id
  const [activeTab, setActiveTab] = useState('content')
  
  // Mock template data
  const templateData = {
    id: id,
    title: "Customer Onboarding Process",
    industry: "Technology",
    category: "Customer Success",
    description: "A comprehensive guide to onboarding new customers to your SaaS platform.",
    author: "TechCorp Inc.",
    updatedAt: "2 weeks ago",
    views: 1245,
    likes: 87,
    tags: ["onboarding", "customer success", "saas"],
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
    relatedTemplates: [
      { id: 3, title: "Software Deployment Protocol" },
      { id: 5, title: "Customer Support Escalation Process" },
      { id: 8, title: "Sales Proposal Template" },
    ]
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(templateData.content)
      .then(() => {
        toast.success("Template content copied to clipboard")
      })
      .catch(() => {
        toast.error("Failed to copy content")
      })
  }

  const handleUseTemplate = () => {
    // In a real app, this would create a new SOP based on this template
    toast.success("Template added to your SOPs")
    router.push('/my-sops')
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/explore">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{templateData.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyToClipboard}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button onClick={handleUseTemplate}>
            <Download className="mr-2 h-4 w-4" />
            Use Template
          </Button>
        </div>
      </div>
      
      {/* Metadata */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Industry</span>
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span className="font-medium">{templateData.industry}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Category</span>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span className="font-medium">{templateData.category}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Author</span>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">{templateData.author}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Updated</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{templateData.updatedAt}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Views</span>
              <div className="flex items-center gap-1">
                <span className="font-medium">{templateData.views}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Likes</span>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span className="font-medium">{templateData.likes}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <span className="text-sm text-muted-foreground">Tags</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {templateData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Template Content</CardTitle>
              <CardDescription>
                Standard Operating Procedure template that you can customize for your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: templateData.content.replace(/\n/g, '<br>') }} />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Related Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templateData.relatedTemplates.map(template => (
                  <Link href={`/explore/${template.id}`} key={template.id}>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{template.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/explore">
                  Browse More Templates
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TemplateDetailPage
