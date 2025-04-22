import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { Toaster } from 'react-hot-toast';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
        </AuthLayoutTemplate>
    );
}
