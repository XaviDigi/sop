"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Search, Filter, ArrowRight, Clock, Users, Building, Tag } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/app/provider'

function Explore() {
  const router = useRouter()
  const { user } = useAuthContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Mock data for public SOPs
  const publicSOPs = [
    {
      id: 1,
      title: "Customer Onboarding Process",
      industry: "Technology",
      category: "Customer Success",
      description: "A comprehensive guide to onboarding new customers to your SaaS platform.",
      author: "TechCorp Inc.",
      updatedAt: "2 weeks ago",
      views: 1245,
      tags: ["onboarding", "customer success", "saas"]
    },
    {
      id: 2,
      title: "Employee Offboarding Checklist",
      industry: "Human Resources",
      category: "HR",
      description: "Step-by-step process for offboarding employees to ensure a smooth transition.",
      author: "HR Best Practices",
      updatedAt: "1 month ago",
      views: 987,
      tags: ["hr", "offboarding", "employees"]
    },
    {
      id: 3,
      title: "Software Deployment Protocol",
      industry: "Technology",
      category: "IT",
      description: "Standardized procedure for deploying software updates to production environments.",
      author: "DevOps Solutions",
      updatedAt: "3 weeks ago",
      views: 2341,
      tags: ["devops", "deployment", "software"]
    },
    {
      id: 4,
      title: "Quarterly Financial Review",
      industry: "Finance",
      category: "Accounting",
      description: "Process for conducting thorough quarterly financial reviews and reporting.",
      author: "Financial Excellence Group",
      updatedAt: "2 months ago",
      views: 765,
      tags: ["finance", "reporting", "quarterly"]
    },
    {
      id: 5,
      title: "Customer Support Escalation Process",
      industry: "Service",
      category: "Support",
      description: "Guidelines for escalating customer support issues to ensure timely resolution.",
      author: "Support Heroes",
      updatedAt: "1 week ago",
      views: 1876,
      tags: ["support", "escalation", "customer service"]
    },
    {
      id: 6,
      title: "New Hire Training Program",
      industry: "Human Resources",
      category: "Training",
      description: "Comprehensive training program for new employees across all departments.",
      author: "Training Excellence",
      updatedAt: "3 months ago",
      views: 2198,
      tags: ["training", "onboarding", "new hires"]
    },
    {
      id: 7,
      title: "Server Maintenance Procedure",
      industry: "Technology",
      category: "IT",
      description: "Regular maintenance procedures to ensure optimal server performance and security.",
      author: "IT Infrastructure Pros",
      updatedAt: "1 month ago",
      views: 1543,
      tags: ["servers", "maintenance", "it"]
    },
    {
      id: 8,
      title: "Sales Proposal Template",
      industry: "Sales",
      category: "Sales",
      description: "Standardized template and process for creating effective sales proposals.",
      author: "Sales Excellence Academy",
      updatedAt: "2 weeks ago",
      views: 3210,
      tags: ["sales", "proposals", "templates"]
    },
  ];

  // Filter SOPs based on search query and filters
  const filteredSOPs = publicSOPs.filter(sop => {
    const matchesSearch =
      sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sop.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustry = industryFilter === 'all' || sop.industry === industryFilter;
    const matchesCategory = categoryFilter === 'all' || sop.category === categoryFilter;

    return matchesSearch && matchesIndustry && matchesCategory;
  });

  // Get unique industries and categories for filters
  const industries = ['all', ...new Set(publicSOPs.map(sop => sop.industry))];
  const categories = ['all', ...new Set(publicSOPs.map(sop => sop.category))];

  const handleViewSOP = (id) => {
    router.push(`/explore/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className='font-bold text-3xl'>Explore SOP Templates</h2>
      </div>

      <p className="text-muted-foreground mb-8">
        Browse our collection of professionally crafted Standard Operating Procedure templates
        across various industries and categories.
      </p>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* SOP Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSOPs.map(sop => (
          <Card key={sop.id} className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{sop.title}</CardTitle>
                  <CardDescription className="mt-2">{sop.description}</CardDescription>
                </div>
                <div className="bg-primary/10 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                {sop.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>{sop.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>{sop.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>By {sop.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Updated {sop.updatedAt}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button
                className="w-full"
                onClick={() => handleViewSOP(sop.id)}
              >
                View Template
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredSOPs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium">No templates found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default Explore