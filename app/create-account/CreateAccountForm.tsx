'use client';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/utils/auth';
import { getAuthError } from '@/utils/auth-errors';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export function CreateAccountForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error('Validation Error', {
        description: 'Passwords do not match',
      });
      return;
    }

    try {
      setIsLoading(true);

      await auth.signUp(email, password);
      toast.success('Please check your email to verify your account.');

      router.push('/login');

    } catch (error) {
      const { message } = getAuthError(error);
      toast.error('Account Creation Error', {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card className="w-96">
      <form onSubmit={handleSubmit}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription className="text-xs">
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          />
        </div>

        <Button className="w-full" disabled={isLoading}>
        {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
          Create account
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-2 gap-6 w-full">
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </CardFooter>
      </form>
      
    </Card>
  );
}