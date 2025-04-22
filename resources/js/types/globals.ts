export interface FlashProps {
    success?: string;
    error?: string;
}

export interface LinksType {
    url: string;
    label: string;
    active: boolean;
}
export interface MetaType {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: LinksType[];
}

export interface UserType {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    profile_image: string;
}
export interface PostType {
    id: number;
    title: string;
    content: string;
    category: string;
    status: boolean;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface DesignationType {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    status: boolean;
}

export interface DepartmentType {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    status: boolean;
    user: UserType;
    department_image: string;
}
