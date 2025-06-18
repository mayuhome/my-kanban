import { CircleUser, CreditCard, LogOut, Plus, ProjectorIcon, UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import Link from 'next/link';


export const UserMenu = () => {
    const handleSignOut = async () => (console.log('signing out'));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'}
                size={'icon'}
                className='relative h-9 w-9 rounded-full border bg-background'
                >
                    <CircleUser className='h-5 w-5'/>
                    <span className='sr-only'>Open user menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-56' align='end'>
                <DropdownMenuLabel className='font-normal'>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-muted-foreground">Jade@example.com</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={'/profile'} className='w-full cursor-pointer'>
                            <UserIcon className='mr-2 h-4 w-4'/>
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href={'/projects'} className='w-full cursor-pointer'>
                            <CreditCard className='mr-2 h-4 w-4'/>
                            <span>Projects</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href={'/new-project'} className='w-full cursor-pointer'>
                        <Plus className='mr-2 h-4 w-4'/>
                        <span>New Project</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className='cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400' onSelect={handleSignOut}>
                    <LogOut className='mr-2 h-4 w-4'/>
                    <span>Sign Out</span>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}