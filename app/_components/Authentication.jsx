"use client"
import { auth } from '@/configs/firebaseConfig';
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    OAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function Authentication({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    const signInWithProvider = (providerName) => {
        setIsLoading(true);
        let provider;

        switch(providerName) {
            case 'google':
                provider = new GoogleAuthProvider();
                break;
            case 'github':
                provider = new GithubAuthProvider();
                break;
            case 'microsoft':
                provider = new OAuthProvider('microsoft.com');
                break;
            default:
                provider = new GoogleAuthProvider();
        }

        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info
                const user = result.user;
                console.log("User signed in:", user);
                toast.success(`Signed in as ${user.displayName || user.email}`);
            })
            .catch((error) => {
                // Handle Errors here
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Sign-in error:", errorCode, errorMessage);

                // Show user-friendly error message
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    toast.error('An account already exists with the same email address but different sign-in credentials.');
                } else if (errorCode === 'auth/popup-closed-by-user') {
                    toast.error('Sign-in was cancelled.');
                } else if (errorCode === 'auth/cancelled-popup-request') {
                    // This is normal when multiple popups are triggered, no need to show error
                } else {
                    toast.error(`Sign-in failed: ${errorMessage}`);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Sign in to SOP Manager</DialogTitle>
                    <DialogDescription>
                        Choose your preferred sign-in method to access the platform.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                        onClick={() => signInWithProvider('google')}
                        disabled={isLoading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            <path d="M1 1h22v22H1z" fill="none"/>
                        </svg>
                        Continue with Google
                    </Button>

                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                        onClick={() => signInWithProvider('github')}
                        disabled={isLoading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Continue with GitHub
                    </Button>

                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                        onClick={() => signInWithProvider('microsoft')}
                        disabled={isLoading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23 23">
                            <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                            <path fill="#f35325" d="M1 1h10v10H1z"/>
                            <path fill="#81bc06" d="M12 1h10v10H12z"/>
                            <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                            <path fill="#ffba08" d="M12 12h10v10H12z"/>
                        </svg>
                        Continue with Microsoft
                    </Button>
                </div>
                <div className="flex justify-center text-sm text-muted-foreground">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Authentication