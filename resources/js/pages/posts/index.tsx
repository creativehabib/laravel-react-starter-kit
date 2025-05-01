import InertiaPagination from '@/components/inertia-pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import debounce from 'lodash/debounce';
import { Edit, Search, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import DeleteDialog from '@/components/delete-dialog';
import { LinksType, PostType } from '@/types/globals';
import { Switch } from "@/components/ui/switch"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];


interface PostsType {
    data: PostType[];
    links: LinksType[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

export default function Posts({ posts }: { posts: PostsType }) {
    const { flash } = usePage<{ flash: { success?: string } }>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);

    // Search functionality
    const handleSearch = useRef(
        debounce((query: string) => {
            router.get('/posts', { search: query }, { preserveState: true, replace: true });
        }, 500),
    ).current;

    const handleDeleteClick = (id: number) => {
        setPostToDelete(id);
        setOpenDeleteDialog(true);
    };

    // search method
    function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;
        handleSearch(query);
    }

    const handleDelete = () => {
        if (postToDelete !== null) {
            router.delete(route('posts.destroy', postToDelete), {
                preserveScroll: true,
                preserveState: true,
                only: ['posts', 'flash'], // Only bring back updated data + flash
            });
            setOpenDeleteDialog(false); // Close the dialog after delete
        }
    };

    const handleStatusToggle = (id: number) => {
        router.put(
            route('posts.toggle-status', id),
            {},
            {
                preserveScroll: true,
                preserveState: true, // 👈 ensures updated props come back
                only: ['posts', 'flash'], // Re-fetch only these props
            },
        );
    }

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Posts" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="rounded border p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <div className="relative w-full sm:w-1/3">
                                <Input
                                    id="search"
                                    className="peer ps-9"
                                    placeholder="Search..."
                                    type="search"
                                    onChange={onSearchChange}
                                />
                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                    <Search size={16} aria-hidden="true" />
                                </div>
                            </div>

                            <Button>
                                <Link href="/posts/create" prefetch>
                                    Create Post
                                </Link>
                            </Button>
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
                                        {posts.data?.map((post, index) => (
                                            <TableRow key={post.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <img
                                                        src={`/storage/${post.media?.path}`}
                                                        alt={post.title}
                                                        className="w-14 rounded"
                                                    />
                                                </TableCell>
                                                <TableCell>{post.title}</TableCell>
                                                <TableCell>{post.content.substring(0, 50)}</TableCell>
                                                <TableCell>{post.category}</TableCell>

                                                <TableCell>
                                                    <Switch
                                                        className="cursor-pointer"
                                                        checked={post.status}
                                                        onCheckedChange={() => handleStatusToggle(post.id)}
                                                    />
                                                </TableCell>
                                                <TableCell className="space-x-1">
                                                    <Button asChild size={'sm'}>
                                                        <Link href={`/posts/${post.id}/edit`} prefetch>
                                                            <Edit size={16} />
                                                        </Link>
                                                    </Button>

                                                    <Button size={'sm'} className='bg-red-500 hover:bg-red-400 cursor-pointer' onClick={() => handleDeleteClick(post.id)}>
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <InertiaPagination meta={posts} />
                    </div>
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
