import { NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with the provided key
const genAI = new GoogleGenerativeAI("AIzaSyCnt3UjOX3rhh5MJxRNXnTxq9HN55t5uWA");

// YouTube API key (you would need to set this up in your environment variables)
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "";

export async function POST(req) {
  try {
    const { videoId, url } = await req.json();

    if (!videoId) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    // 1. Fetch video metadata from YouTube API
    const videoData = await fetchVideoMetadata(videoId);
    
    // 2. Get video transcript (this would require a separate service or library)
    // For this example, we'll simulate a transcript
    const transcript = await simulateTranscript(videoId);
    
    // 3. Analyze the video content using Gemini API
    const highlights = await analyzeVideoContent(videoData, transcript);

    return NextResponse.json({ highlights });
  } catch (error) {
    console.error("Error analyzing YouTube video:", error);
    return NextResponse.json(
      { error: "Failed to analyze video" },
      { status: 500 }
    );
  }
}

async function fetchVideoMetadata(videoId) {
  // In a real implementation, you would use the YouTube API to fetch video metadata
  // For now, we'll simulate this
  return {
    id: videoId,
    title: "Sample Video Title",
    description: "This is a sample video description",
    duration: "PT10M30S", // ISO 8601 duration format
  };
}

async function simulateTranscript(videoId) {
  // In a real implementation, you would use a service like YouTube's transcript API
  // or a third-party service to get the transcript
  return [
    { text: "Hello and welcome to this video.", startTime: 0, endTime: 3 },
    { text: "Today we're going to talk about an interesting topic.", startTime: 3, endTime: 7 },
    { text: "This is a very engaging part of the video that should be highlighted.", startTime: 7, endTime: 12 },
    // ... more transcript segments
  ];
}

async function analyzeVideoContent(videoData, transcript) {
  try {
    // Combine transcript segments into a single text
    const transcriptText = transcript.map(segment => segment.text).join(" ");
    
    // Create a prompt for Gemini to analyze the video content
    const prompt = `
    You are an AI video editor assistant. Your task is to analyze the following video transcript and identify 3-5 of the most engaging segments that would make good highlights (15-60 seconds each).

    Video Title: ${videoData.title}
    Video Description: ${videoData.description}
    
    Transcript:
    ${transcriptText}
    
    For each highlight segment:
    1. Identify the start and end points (in seconds)
    2. Explain why this segment is engaging or interesting
    3. Create a caption that would work well with this highlight
    
    Return your analysis in JSON format like this:
    {
      "highlights": [
        {
          "startTime": 120,
          "endTime": 165,
          "reason": "This segment explains a key concept clearly and with enthusiasm",
          "caption": "The perfect caption for this highlight"
        },
        ...
      ]
    }
    `;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    // Note: In a real implementation, you would need to handle potential parsing errors
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                        text.match(/```\n([\s\S]*?)\n```/) || 
                        [null, text];
      const jsonString = jsonMatch[1] || text;
      const parsedResponse = JSON.parse(jsonString);
      
      return parsedResponse.highlights || [];
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      // Return a simulated response for demonstration
      return [
        {
          startTime: 7,
          endTime: 12,
          reason: "This segment is particularly engaging",
          caption: "This is a very engaging part of the video"
        },
        {
          startTime: 45,
          endTime: 75,
          reason: "This segment explains a key concept",
          caption: "Learn about this important concept"
        }
      ];
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
