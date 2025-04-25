import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const toggleMenu = (title: string) => {
        setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    // Automatically open parent if any child matches current page
    useEffect(() => {
        const expanded: Record<string, boolean> = {};
        items.forEach((item) => {
            if (item.children?.some((child) => page.url.startsWith(child.href ?? '#'))) {
                expanded[item.title] = true;
            }
        });
        setOpenMenus((prev) => ({ ...prev, ...expanded }));
    }, [items, page.url]);


    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                    const isParentActive =
                        item.href === page.url ||
                        item.children?.some((child) => page.url.startsWith(child.href ?? ''));

                    return (
                        <div key={item.title}>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild={!hasChildren}
                                    isActive={isParentActive}
                                    tooltip={{ children: item.title }}
                                    onClick={() => hasChildren && toggleMenu(item.title)}
                                >
                                    {hasChildren ? (
                                        <button type="button" className="flex w-full cursor-pointer items-center space-x-2">
                                            {item.icon && <item.icon className="mr-2" />}
                                            <span>{item.title}</span>
                                            {openMenus[item.title] ? (
                                                <ChevronDown className="ml-auto h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="ml-auto h-4 w-4" />
                                            )}
                                        </button>
                                    ) : (
                                        <Link href={item.href || '#'}>
                                            {item.icon && <item.icon className="mr-2" />}
                                            <span>{item.title}</span>
                                        </Link>
                                    )}
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {hasChildren && openMenus[item.title] && (
                                <div className="pl-6">
                                {Array.isArray(item.children) &&
                                    item.children.map((child) => (
                                        <SidebarMenuItem key={child.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={page.url.startsWith(child.href ?? '#')}
                                                tooltip={{ children: child.title }}
                                            >
                                                <Link href={child.href || '#'}>
                                                    {child.icon ? (
                                                        <child.icon className="mr-2" />
                                                    ) : (
                                                        <FileText className="mr-2" />
                                                    )}
                                                    <span>{child.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
