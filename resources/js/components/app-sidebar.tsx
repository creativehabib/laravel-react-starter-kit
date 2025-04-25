import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, LayoutGrid, NotebookPen, ChevronRight, UserRoundCog } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'HR',
        icon: UserRoundCog,
        children: [
            { title: 'Designations', href: '/designations', icon: ChevronRight},
            { title: 'Departments', href: '/departments', icon: ChevronRight},
            { title: 'Employees', href: '/employees', icon: ChevronRight},
            { title: 'Attendance', href: '/attendance', icon: ChevronRight},
            { title: 'Leave Requests', href: '/leave-requests', icon: ChevronRight},
            { title: 'Holidays', href: '/holidays', icon: ChevronRight},
            { title: 'Blood Groups', href: '/blood-groups', icon: ChevronRight},
        ],
    },
    {
        title: 'Posts',
        href: '/posts',
        icon: NotebookPen,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
