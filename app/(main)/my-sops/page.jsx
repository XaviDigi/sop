"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileText, Search, Filter, Plus, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function MySOPs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  
  // Mock data for SOPs
  const sopsList = [
    { id: 1, title: "Customer Onboarding Process", department: "Sales", updatedAt: "2 hours ago", author: "John Smith" },
    { id: 2, title: "Employee Offboarding Checklist", department: "HR", updatedAt: "1 day ago", author: "Sarah Johnson" },
    { id: 3, title: "Software Deployment Protocol", department: "IT", updatedAt: "2 days ago", author: "Mike Chen" },
    { id: 4, title: "Quarterly Financial Review", department: "Finance", updatedAt: "3 days ago", author: "Lisa Wong" },
    { id: 5, title: "Customer Support Escalation Process", department: "Support", updatedAt: "5 days ago", author: "David Miller" },
    { id: 6, title: "New Hire Training", department: "HR", updatedAt: "1 week ago", author: "Sarah Johnson" },
    { id: 7, title: "Server Maintenance Procedure", department: "IT", updatedAt: "1 week ago", author: "Mike Chen" },
    { id: 8, title: "Sales Proposal Template", department: "Sales", updatedAt: "2 weeks ago", author: "John Smith" },
  ];
  
  // Filter SOPs based on search query and department filter
  const filteredSOPs = sopsList.filter(sop => {
    const matchesSearch = sop.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sop.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || sop.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });
  
  // Get unique departments for filter dropdown
  const departments = ['all', ...new Set(sopsList.map(sop => sop.department))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className='font-bold text-3xl'>My SOPs</h2>
        <Link href="/create-sop">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New SOP
          </Button>
        </Link>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search SOPs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* SOPs List */}
      <Card>
        <CardContent className="p-6">
          {filteredSOPs.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No SOPs found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSOPs.map(sop => (
                <Link href={`/my-sops/${sop.id}`} key={sop.id}>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{sop.title}</h3>
                        <p className="text-sm text-muted-foreground">{sop.department}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{sop.updatedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{sop.author}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MySOPs
