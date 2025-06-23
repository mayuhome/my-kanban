'use client';
import { auth } from "@/utils/auth";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Icons } from "../Icons";

interface Props {
    isLoading?: boolean;
    onLoadingChange?: (isLoading: boolean) => void;
    redirectUrl?: string;
}

 const OAuthButtons = ({isLoading, onLoadingChange, redirectUrl}: Props) => {
    const [internalLoading, setInternalLoading] = useState(false);
    const searchParams = useSearchParams();

    const nextUrl = redirectUrl || searchParams.get('next') || './projects';

    const loading = isLoading ?? internalLoading;
    const setLoading = onLoadingChange ?? setInternalLoading;

    const handleOAuthSignIn = async (provider: 'github' | 'google') => {
        try {
            setLoading(true);
            await auth.signInWithOAuth(provider, nextUrl);
            
        } catch (error) {
            console.error(error);
            toast.error('Failed to sign in');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <Button variant={'outline'} type="button" disabled={loading} onClick={() => handleOAuthSignIn('github')}>
                <Icons.gitHub className="mr-2 w-4 h-4" />GitHub
            </Button>
            <Button variant={'outline'} type="button" disabled={loading} onClick={() => handleOAuthSignIn('google')}>
                <Icons.google className="mr-2 w-4 h-4" />Google
            </Button>
        </div>
    );
}

export const OAuthSignIn = (props: Props) => {
    return (
        <div className="w-full">
            <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted-foreground"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>

            <Suspense fallback={
                <div className="grid grid-cols-2 gap-4">
                    <Button variant={'outline'} disabled>
                        <Icons.gitHub className="mr-2 w-4 h-4" />Github
                    </Button>
                    <Button variant={'outline'} disabled>
                        <Icons.google className="mr-2 w-4 h-4" />Google
                    </Button>
                </div>
            }>
                <OAuthButtons {...props} />
            </Suspense>
        </div>
    );
}