import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2, Undo2Icon } from 'lucide-react';
import SetFeaturedImage from '@/components/media-image-select';
import { MediaItem } from '@/types/globals';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Posts',
        href: '/create/posts',
    },
];

export default function CreatePost() {
    const { data, setData, post, errors, processing } = useForm<{
        title: string;
        category: string;
        status: string;
        content: string;
        media_id: number | null;
    }>({
        title: '',
        category: '',
        status: '',
        content: '',
        media_id: null,
    });

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/posts');
    }
    const handleImageSelect = (media: Partial<MediaItem> | null) => {
        if (media?.id !== undefined) {
            setData('media_id', media?.id ?? null);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="text-xl text-slate-600">Create Post</div>

                    <Link href={route('posts.index')} as="button">
                        <Button className="cursor-pointer" variant="outline">
                            <Undo2Icon size={16} />
                            <span>Back</span>
                        </Button>
                    </Link>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-4 gap-4">
                        {/* Main Content (3/4 width) */}
                        <div className="col-span-4 md:col-span-3">
                            <Card>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                type="text"
                                                id="title"
                                                placeholder="Title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                aria-invalid={!!errors.title}
                                            />
                                            <InputError message={errors.title} />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea
                                            rows={6}
                                            id="content"
                                            placeholder="Type content here..."
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            aria-invalid={!!errors.content}
                                        />
                                        <InputError message={errors.content} />
                                    </div>


                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar (1/4 width) */}
                        <div className="col-span-4 md:col-span-1">
                            <Card>
                                <CardContent>
                                    <div className=''>
                                        <div className="">
                                            <Button className='cursor-pointer' disabled={processing}>
                                                {processing && <Loader2 className="animate-spin" />}
                                                <span>Publish</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="category">Category</Label>
                                        <Select value={data.category} onValueChange={(e) => setData('category', e)}>
                                            <SelectTrigger id="category" aria-invalid={!!errors.category} className="w-full">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Marvel">Marvel</SelectItem>
                                                <SelectItem value="DC">DC</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.category} />
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="status">Status</Label>
                                        <Select value={data.status} onValueChange={(e) => setData('status', e)}>
                                            <SelectTrigger id="status" aria-invalid={!!errors.status} className="w-full">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Active</SelectItem>
                                                <SelectItem value="0">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>
                                    <div className="mt-4">
                                        <h6 className='mb-4'>Featured Image</h6>
                                        <SetFeaturedImage onSelect={handleImageSelect} />
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>

    );
}
