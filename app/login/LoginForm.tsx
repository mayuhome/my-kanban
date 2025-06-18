import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export const LoginForm = () => {
    return (
        <Card className='w-96'>
            <form>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl'>Login</CardTitle>
                    <CardDescription className='text-xs'>Welcome back</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                    <div>
                        Don't have an account? {' '}
                        <Link href={'/create-account'} className='text-blue-500'>Create account</Link>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor='email'>Email</Label>
                        <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        required
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor='password'>Password</Label>
                            <Link href={'/forgot-password'} className='text-xs text-blue-500'>Fotgot password?</Link>
                        </div>
                        <Input id='password' required/>
                    </div>

                    <Button className='w-full' type='submit'>Sign In</Button>

                </CardContent>
                <CardFooter>
                    <div className="grid grid-cols-2 gap-6 w-full">
                        <Button variant={'outline'}>
                            <Icons.gitHub className='mr-2 h-4 w-4' />                      
                            Github
                        </Button>
                        <Button variant={'outline'}>
                            <Icons.google className='mr-2 h-4 w-4' />                      
                            Google
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}