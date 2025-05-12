"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2Icon, Youtube } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { useAuthContext } from '@/app/provider'
import HighlightCard from './_components/HighlightCard'
import { isValidYoutubeUrl, extractVideoId } from '@/utils/youtube'

function YouTubeHighlights() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [highlights, setHighlights] = useState([])
  const { user } = useAuthContext()

  const [videoId, setVideoId] = useState(null)

  const generateHighlights = async () => {
    if (!youtubeUrl) {
      toast.error('Please enter a YouTube URL')
      return
    }

    if (!isValidYoutubeUrl(youtubeUrl)) {
      toast.error('Please enter a valid YouTube URL')
      return
    }

    const extractedVideoId = extractVideoId(youtubeUrl)
    if (!extractedVideoId) {
      toast.error('Could not extract video ID from URL')
      return
    }

    setVideoId(extractedVideoId)
    setLoading(true)
    try {
      const response = await axios.post('/api/analyze-youtube', {
        videoId: extractedVideoId,
        url: youtubeUrl
      })

      setHighlights(response.data.highlights)
      toast.success('Highlights generated successfully!')
    } catch (error) {
      console.error('Error generating highlights:', error)
      toast.error('Failed to generate highlights. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">YouTube Highlights Generator</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate Video Highlights</CardTitle>
          <CardDescription>
            Enter a YouTube URL to analyze and generate engaging highlights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={generateHighlights}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Youtube className="mr-2 h-4 w-4" />
                  Generate Highlights
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {highlights.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Generated Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={index}
                highlight={highlight}
                videoId={videoId}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default YouTubeHighlights
