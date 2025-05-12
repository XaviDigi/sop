"use client"
import React, { useState, useEffect } from 'react'
import Provider from './provider';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

function ConvexClientProvider({ children }) {
    const [client, setClient] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            // Check if Convex URL is available
            const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
            if (!convexUrl) {
                console.warn("Convex URL is not set. Some features may not work properly.");
                setError("Convex URL is not set. Some features may not work properly.");
                return;
            }

            const convex = new ConvexReactClient(convexUrl);
            setClient(convex);
        } catch (err) {
            console.error("Error initializing Convex client:", err);
            setError("Failed to initialize Convex client. Some features may not work properly.");
        }
    }, []);

    // If client is not initialized yet, show loading or error
    if (!client && !error) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                <div style={{ padding: '20px', color: 'red' }}>
                    {error}
                </div>
                <Provider>
                    {children}
                </Provider>
            </div>
        );
    }

    return (
        <div>
            <ConvexProvider client={client}>
                <Provider>
                    {children}
                </Provider>
            </ConvexProvider>
        </div>
    )
}

export default ConvexClientProvider