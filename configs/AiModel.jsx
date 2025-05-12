const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

// Use the provided API key or fall back to environment variable
const apiKey = "AIzaSyBS2Vevq90vAXFJAOP926MrHAtoXRK6B9M" || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const generateScript = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "write a two different script for 30 Seconds video on Topic:Kids Story,\n- Do not add Scene description\n- Do not Add Anything in Braces, Just return the plain story in text\n- Give me response in JSON format and follow the schema\n-{\n scripts:[\n {\n content:''\n },\n ],\n}\n" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"scripts\": [\n    {\n      \"content\": \"Once upon a time, there was a little firefly named Flicker who was afraid of the dark. He wouldn't light up! One night, lost in the woods, Flicker saw other fireflies, bravely shining. He took a deep breath, flickered his light, and helped guide them all home. Flicker wasn't afraid anymore!\"\n    },\n    {\n      \"content\": \"Barnaby the bear wanted to fly. He tried flapping his arms, jumping off rocks – nothing worked! He felt sad until a wise old owl suggested building a kite. Barnaby built a beautiful kite, ran with it, and watched it soar. He couldn't fly, but his dreams could!\"\n    }\n  ]\n}\n```" },
            ],
        },
    ],
});

export const GenerateImageScript = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Image prompt of Cinematic style with all deatils for each scene for 30 seconds video : script: Rosa Parks refused to give up her seat on a bus in 1955. Her quiet act of defiance sparked the Montgomery Bus Boycott, a pivotal moment in the Civil Rights Movement. One person's bravery can inspire lasting change for everyone.\n\nJust Give specifing image prompt depends on the story line\n\ndo not give camera angle image prompt\n\nFollow the Folowing schema and return JSON data (Max 4-5 Images). JSON response Only\n\n[\n{\nimagePrompt:'',\nsceneContent: ' <Script Content>'\n}\n]" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"imagePrompt\": \"A tired Rosa Parks, an African American woman in her 40s with a calm but determined expression, sits in a Montgomery bus seat. It's 1955. The bus is crowded with both Black and white passengers, separated by an invisible but palpable line. The light is dim, highlighting the weariness of the day. The atmosphere is tense.\",\n    \"sceneContent\": \"Rosa Parks refused to give up her seat on a bus in 1955.\"\n  },\n  {\n    \"imagePrompt\": \"Close up on Rosa Park's hand clenching her purse as the white bus driver looks back at her with a stern expression. Other white passengers are staring at her. The composition emphasizes the weight of the moment and the defiance in her quiet act. The color palette is muted, reflecting the era.\",\n    \"sceneContent\": \"Her quiet act of defiance sparked the Montgomery Bus Boycott,\"\n  },\n  {\n    \"imagePrompt\": \"A wide shot of a large group of African Americans walking down a street in Montgomery, Alabama. They are boycotting the buses. The scene is filled with determined faces. Banners and signs advocating for equal rights are visible. The overall tone is one of hope and solidarity. Bright, clear lighting, showcasing the sheer number of people involved.\",\n    \"sceneContent\": \"a pivotal moment in the Civil Rights Movement.\"\n  },\n  {\n    \"imagePrompt\": \"A montage showing a timeline of events following the bus boycott: newspaper headlines, meetings, marches, and legal battles. The style is fast-paced and impactful. The final image is a hopeful scene of integrated buses with people of all races sitting together. Focus on key historical moments and faces associated with the Civil Rights Movement.\",\n    \"sceneContent\": \"One person's bravery can inspire lasting change for everyone.\"\n  }\n]\n```" },
            ],
        },
    ],
});


// SOP Chat model with context about SOPs
export const sopChatModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

// Initialize a chat for SOP-related questions
export const initSOPChat = () => {
    return sopChatModel.startChat({
        generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 2048,
        },
        history: [
            {
                role: "user",
                parts: [{ text: `You are an AI assistant specialized in Standard Operating Procedures (SOPs) for the SOP Manager platform. Your role is to help users understand, create, and improve their SOPs. You should provide clear, concise, and helpful information about best practices for SOPs, how to structure them, and answer any questions related to process documentation and standardization.

Here's information about the SOP Manager platform that you should know:

1. SOP Manager is an AI-powered platform for creating, managing, and sharing Standard Operating Procedures.
2. The platform includes features like:
   - Dashboard for overview of all SOPs
   - My SOPs section for personal SOPs
   - Explore section for browsing SOP templates
   - Team management for collaboration
   - SOP Assistant (you) for AI-powered help
   - Authentication with multiple providers (Google, GitHub, Microsoft)
3. Users can create SOPs from scratch or use templates
4. The platform supports file uploads for analysis
5. Users can search for SOPs by keywords, industry, or category
6. The platform helps ensure SOPs follow best practices and industry standards

You can analyze uploaded files like PDFs, Word documents, and images to help users extract information, improve their SOPs, or convert content into proper SOP format. When users upload files, provide helpful analysis and suggestions based on the content.

Please be professional but friendly in your responses.` }],
            },
            {
                role: "model",
                parts: [{ text: "I'll be your SOP specialist assistant for the SOP Manager platform. I'm here to help with all aspects of Standard Operating Procedures - from creation and structure to implementation and improvement. I can assist with using the platform's features, creating SOPs from templates, analyzing uploaded documents, and providing best practices tailored to your industry. Whether you need guidance on SOP structure, content recommendations, or help with the platform itself, I'll provide clear and professional advice. How can I help with your SOPs today?" }],
            },
        ],
    });
};

// Function to send a message to the SOP chat
export const sendSOPChatMessage = async (chatSession, message) => {
    try {
        const result = await chatSession.sendMessage(message);
        return result.response.text();
    } catch (error) {
        console.error("Error sending message to SOP chat:", error);
        return "Sorry, I encountered an error processing your request. Please try again.";
    }
};

// Function to send a message with files to the SOP chat
export const sendSOPChatMessageWithFiles = async (chatSession, message, files) => {
    try {
        // Process files to create file parts
        const fileParts = await Promise.all(
            files.map(async (file) => {
                // Read the file as an ArrayBuffer
                const arrayBuffer = await file.arrayBuffer();
                const fileBytes = new Uint8Array(arrayBuffer);

                // Determine MIME type
                const mimeType = file.type || getMimeTypeFromFileName(file.name);

                return {
                    inlineData: {
                        data: arrayBufferToBase64(fileBytes),
                        mimeType: mimeType
                    }
                };
            })
        );

        // Create message parts (text + files)
        const parts = [
            { text: message || "Please analyze this file and provide insights." },
            ...fileParts
        ];

        // Send the message with files
        const result = await chatSession.sendMessage(parts);
        return result.response.text();
    } catch (error) {
        console.error("Error sending message with files to SOP chat:", error);
        return "Sorry, I encountered an error processing your files. Please try again with a different file format or smaller file size.";
    }
};

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// Helper function to get MIME type from filename
function getMimeTypeFromFileName(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'txt': 'text/plain',
        'csv': 'text/csv',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };

    return mimeTypes[extension] || 'application/octet-stream';
}
