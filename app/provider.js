"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/configs/firebaseConfig'
import { AuthContext } from './_context/AuthContext'
import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import { api } from '@/convex/_generated/api'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
function Provider({ children }) {

    const [user, setUser] = useState();
    const [authError, setAuthError] = useState(null);

    // Safely use the mutation - it might fail if Convex is not properly configured
    let CreateUser;
    try {
        CreateUser = useMutation(api.users.CreateNewUser);
    } catch (error) {
        console.error("Failed to initialize Convex mutation:", error);
    }

    useEffect(() => {
        try {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                console.log("Auth state changed:", user ? "User logged in" : "No user");

                if (user && CreateUser) {
                    try {
                        const result = await CreateUser({
                            name: user?.displayName || "Anonymous",
                            email: user?.email || "anonymous@example.com",
                            pictureURL: user?.photoURL || "https://via.placeholder.com/150"
                        });
                        console.log("User created/updated in Convex:", result);
                        setUser(result);
                    } catch (error) {
                        console.error("Failed to create/update user in Convex:", error);
                        // Still set the user from Firebase auth to allow basic functionality
                        setUser({
                            name: user?.displayName || "Anonymous",
                            email: user?.email || "anonymous@example.com",
                            pictureURL: user?.photoURL || "https://via.placeholder.com/150",
                            credits: 3 // Default credits
                        });
                    }
                }
            }, (error) => {
                console.error("Auth state change error:", error);
                setAuthError(error.message);
            });

            return () => {
                try {
                    unsubscribe();
                } catch (error) {
                    console.error("Error unsubscribing from auth state:", error);
                }
            };
        } catch (error) {
            console.error("Error setting up auth state listener:", error);
            setAuthError("Failed to initialize authentication");
        }
    }, [CreateUser]);

    // Get PayPal client ID with fallback
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb"; // "sb" is PayPal sandbox default

    return (
        <div>
            {authError && (
                <div style={{ padding: '10px', backgroundColor: '#ffdddd', color: 'red', margin: '10px 0' }}>
                    Authentication Error: {authError}
                </div>
            )}

            <AuthContext.Provider value={{ user, setUser }}>
                <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <NextThemesProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </NextThemesProvider>
                </PayPalScriptProvider>
            </AuthContext.Provider>

        </div>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}

export default Provider