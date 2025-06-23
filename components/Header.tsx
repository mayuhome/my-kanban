'use client';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';
import { UserMenu } from './UserMenu';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { Button } from './ui/button';

interface HeaderProps {
    className?: string;
}

const supabase = createClient();

export const Header = ({className}: HeaderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const isLandingPage = pathname === '/';

    useEffect(() => {
        // get initial user state via session
        supabase.auth.getSession().then(({data}) => {
            setUser(data.session?.user ?? null);
            setIsLoading(false);
        });

        // listen for auth changes
        const {
            data: { subscription },
          } = supabase.auth.onAuthStateChange((_event, session) => {
            // if(!session){
            //     useActionStore.
            // }
            setUser(session?.user ?? null);
          });
          
        return () => subscription.unsubscribe();
    }, []);

    if(isLoading){
        return null;
    }

    return (
        <header className={cn('fixed border-b top-0  w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
            <div className='container flex h-16 items-center justify-between'>
                <Link href={user ? './projects' : '/'} className='flex items-center space-x-2 font-bold text-xl hover:text-primary transition-colors'>My Kanban</Link>

                <div className='flex items-center gap-4'>
                   {user ? (<UserMenu user={user}/>) : (
                    <div className='flex items-center gap-3'>
                        {isLandingPage && (
                                        <>
                                        <Button variant="ghost" asChild>
                                            <Link href="/login">Sign in</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href="/create-account">Get Started</Link>
                                        </Button>
                                        </>
                                    )}    
                    </div>
                   ) }

                <div className='border-l pl-4 dark:border-gray-800'>
                    <ThemeToggle />
                </div>
                </div>

            </div>
        </header>
    );
};