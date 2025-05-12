"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, FileText, Wand2 } from 'lucide-react'
import Link from 'next/link'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function CreateSOP() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    content: ''
  })
  
  const departments = [
    "Sales",
    "Marketing",
    "HR",
    "IT",
    "Finance",
    "Support",
    "Operations",
    "Legal"
  ]
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Here you would normally save the SOP to your database
    console.log("Submitting SOP:", formData)
    
    // Show success message
    toast.success("SOP created successfully!")
    
    // Redirect to the SOPs list
    router.push('/my-sops')
  }
  
  const generateWithAI = () => {
    if (!formData.title || !formData.department || !formData.description) {
      toast.error("Please fill in the title, department, and description first")
      return
    }
    
    setIsGenerating(true)
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const generatedContent = `
# ${formData.title}

## Purpose
This Standard Operating Procedure (SOP) outlines the process for ${formData.description.toLowerCase()}.

## Scope
This procedure applies to all ${formData.department} team members involved in this process.

## Responsibilities
- **${formData.department} Manager**: Oversees the process and ensures compliance
- **${formData.department} Team Members**: Execute the procedure as outlined
- **Quality Assurance**: Reviews and validates the outputs

## Procedure

### 1. Preparation
1.1. Gather all necessary information and resources
1.2. Review relevant documentation and requirements
1.3. Ensure all prerequisites are met

### 2. Execution
2.1. Step 1 of the process
2.2. Step 2 of the process
2.3. Step 3 of the process
   - Sub-step A
   - Sub-step B
   - Sub-step C

### 3. Review and Validation
3.1. Conduct quality check of outputs
3.2. Document any issues or deviations
3.3. Make necessary adjustments

### 4. Completion
4.1. Finalize all documentation
4.2. Obtain required approvals
4.3. Communicate completion to stakeholders

## Related Documents
- Reference Document 1
- Reference Document 2
- Reference Document 3
      `
      
      setFormData(prev => ({
        ...prev,
        content: generatedContent
      }))
      
      setIsGenerating(false)
      toast.success("AI-generated content created! Please review and edit as needed.")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Link href="/my-sops">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold">Create New SOP</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* SOP Details */}
          <Card>
            <CardHeader>
              <CardTitle>SOP Details</CardTitle>
              <CardDescription>Basic information about this Standard Operating Procedure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="Enter SOP title" 
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">Department</label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => handleSelectChange('department', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Briefly describe the purpose of this SOP" 
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>
          
          {/* SOP Content */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>SOP Content</CardTitle>
                  <CardDescription>The detailed procedure steps and information</CardDescription>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={generateWithAI}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea 
                id="content" 
                name="content" 
                placeholder="Enter the detailed SOP content here or use the AI generator" 
                rows={20}
                value={formData.content}
                onChange={handleChange}
                required
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-end gap-3">
          <Link href="/my-sops">
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button type="submit">Create SOP</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateSOP
