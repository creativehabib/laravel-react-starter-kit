import { FlashProps, LinksType, MediaItem, MetaType, PostType } from '@/types/globals';
import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { CirclePlus, Edit, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getImageUrl } from '@/helper/employee';
import Toggle from '@/components/toggle';
import InertiaPagination from '@/components/inertia-pagination';
import DeleteDialog from '@/components/delete-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

interface PostsType {
    data: PostType[];
    meta: MetaType;
    links: LinksType[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

export default function Posts(){

    const { flash, posts } = usePage<{
        flash: FlashProps;
        posts: PostsType;
        media: MediaItem[];
    }>().props;


    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);

    // Search functionality
    const handleSearch = useRef(
        debounce((value: string) => {
            const params: Record<string, string> = {};
            if(value.trim() !== ''){
                params.search = value;
            }
            router.get('/posts', params, { preserveState: true, replace: true });
        }, 500),
    ).current;

    const handleDeleteClick = (id: number) => {
        setPostToDelete(id);
        setOpenDeleteDialog(true);
    };
    const handleDelete = () => {
        if (postToDelete !== null) {
            router.delete(route('posts.destroy', postToDelete), {
                preserveScroll: true,
                preserveState: true,
                only: ['posts', 'flash'],
            });
            setOpenDeleteDialog(false);
        }
    };

    // search method
    function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;
        handleSearch(query);
    }
    const handleStatusToggle = (id: number) => {
        router.put(
            route('posts.toggle-status', id), {},
            {
                only: ['posts', 'flash'], // Re-fetch only these props
                preserveScroll: true,
                preserveState: false, // 👈 ensures updated props come back
            });
    }

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Posts" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                        <div className="relative w-full sm:w-1/3">
                            <Input
                                id="search"
                                className="peer ps-9"
                                placeholder="Search..."
                                type="text"
                                onChange={onSearchChange}
                            />
                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                <Search size={16} aria-hidden="true" />
                            </div>
                        </div>
                        <Link href={route('posts.create')}>
                            <Button className="cursor-pointer" variant="outline">
                                <CirclePlus size={16}/>
                                Add Post
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Content</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {posts.data.length > 0 ? (
                                        posts.data?.map((post, index) => (
                                            <TableRow key={post.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <img
                                                        src={getImageUrl(post.media?.path, 400, 300, post.media?.name || 'No Image')}
                                                        alt={post.title}
                                                        className="w-14 rounded"
                                                    />
                                                </TableCell>
                                                <TableCell>{post.title}</TableCell>
                                                <TableCell>{post.content.substring(0, 50)}</TableCell>
                                                <TableCell>{post.category}</TableCell>

                                                <TableCell>
                                                    <Toggle initial={post.status}  onChange={() => handleStatusToggle(post.id)}/>
                                                </TableCell>
                                                <TableCell className="space-x-1">
                                                    <button
                                                        className="rounded bg-blue-500 cursor-pointer px-3 py-1 text-white hover:bg-blue-600">
                                                        <Edit size={16} />
                                                    </button>

                                                    <button className='bg-red-500 hover:bg-red-400 cursor-pointer rounded px-3 py-1 text-white' onClick={() => handleDeleteClick(post.id)}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="text-center py-4">
                                                No posts found.
                                            </td>
                                        </tr>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <InertiaPagination meta={posts.meta} />
                </div>
            </AppLayout>
            <DeleteDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description="Are you sure you want to delete this post?"
            />
        </>
    );
}
