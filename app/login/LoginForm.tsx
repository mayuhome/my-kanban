'use client';

import { OAuthSignIn } from '@/components/auth/OAuthSignIn';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/utils/auth';
import { getAuthError } from '@/utils/auth-errors';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            setIsLoading(true);
            await auth.signIn(email, password);
            router.push('/projects');
            router.refresh();
        }catch(err){
            const { message } = getAuthError(err);
            toast.error('Authentication Error',{
                description: message,
                duration: 5000
            });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Card className='w-96'>
            <form onSubmit={handleSubmit}>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl'>Login</CardTitle>
                    <CardDescription className='text-xs'>Welcome back</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                    <div>
                        Don&apos;t have an account? {' '}
                        <Link href={'/create-account'} className='text-blue-500'>Create account</Link>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor='email'>Email</Label>
                        <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor='password'>Password</Label>
                            <Link href={'/forgot-password'} className='text-xs text-blue-500'>
                                Forgot password?
                            </Link>
                        </div>
                        <Input 
                        id='password' 
                        type='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        />
                    </div>

                    <Button className='w-full' disabled={isLoading} type='submit'>
                        {isLoading && (<Icons.spinner className='mr-2 w-4 h-4 animate-spin'/>)}
                        Sign In
                    </Button>

                </CardContent>
                <CardFooter>
                    <OAuthSignIn isLoading={isLoading} onLoadingChange={setIsLoading} />
                </CardFooter>
            </form>
        </Card>
    );
}