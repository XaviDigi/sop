"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Play, Share2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { formatTime, getYoutubeEmbedUrl, getYoutubeTimestampUrl, getYoutubeThumbnail } from '@/utils/youtube'

function HighlightCard({ highlight, videoId, index }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Handle download - process and download the video segment
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDownload = async () => {
    try {
      setIsProcessing(true)

      // Call the API to process the video
      const response = await fetch('/api/process-youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          highlightId: index,
          startTime: highlight.startTime,
          endTime: highlight.endTime
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process video')
      }

      // In a real implementation, this would download the processed video
      // For now, we'll open the video in a new tab
      window.open(data.processedVideoUrl, '_blank')
    } catch (error) {
      console.error('Error processing video:', error)
      alert('Failed to process video. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Highlight from YouTube video`,
          text: highlight.caption,
          url: getYoutubeTimestampUrl(videoId, highlight.startTime)
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      const shareUrl = getYoutubeTimestampUrl(videoId, highlight.startTime)
      navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard')
    }
  }

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg">Highlight {index + 1}</CardTitle>
          <CardDescription>
            {formatTime(highlight.startTime)} - {formatTime(highlight.endTime)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div
            className="aspect-video bg-muted rounded-md mb-4 overflow-hidden cursor-pointer relative group"
            onClick={() => setIsDialogOpen(true)}
            style={{
              backgroundImage: `url(${getYoutubeThumbnail(videoId)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Play className="w-12 h-12 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <p className="text-sm">{highlight.caption}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
            <Play className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={handleDownload} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
                  Processing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Highlight Preview</DialogTitle>
            <DialogDescription>
              {highlight.caption}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={getYoutubeEmbedUrl(videoId, highlight.startTime, highlight.endTime)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default HighlightCard
