import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Loader2, X } from 'lucide-react';
import SetFeaturedImage from '@/components/media-image-select';
import { MediaItem, PostType } from '@/types/globals';
import React from 'react';

interface PostFormProps {
    post?: PostType | null;
    media?: MediaItem[];
    onClose: () => void;
    onSuccess?: () => void;
}

export default function PostForm({ post, onClose, onSuccess }: PostFormProps) {
    const isEditing = !!post;

    const { data, setData, post: submitPost, put, processing, errors } = useForm({
        title: post?.title || '',
        category: post?.category || '',
        status: post?.status?.toString() || '',
        content: post?.content || '',
        media_id: post?.media_id || null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const method = isEditing ? put : submitPost;
        const url = isEditing ? route('posts.update', post.id) : route('posts.store');

        method(url, {
            onSuccess: () => {
                onSuccess?.();
                onClose();
            },
        });
    };

    const handleImageSelect = (media: Partial<MediaItem> | null) => {
        setData('media_id', media?.id ?? null);
    };


    return (
        <Card className="p-4 relative">
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                onClick={onClose}
            >
                <X size={18} />
            </button>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={data.category}
                                onValueChange={(value) => setData('category', value)}
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Marvel">Marvel</SelectItem>
                                    <SelectItem value="DC">DC</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.category} />
                        </div>

                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) => setData('status', value)}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Active</SelectItem>
                                    <SelectItem value="0">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            rows={6}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                        <InputError message={errors.content} />
                    </div>

                    <SetFeaturedImage
                        onSelect={handleImageSelect}
                        initial={post?.media}
                    />

                    <div className="text-end">
                        <Button type="submit" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEditing ? 'Update Post' : 'Create Post'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
