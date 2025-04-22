export interface UserSummary {
    id: number;
    name: string;
}

export interface Department {
    id: number;
    name: string;
    description?: string;
    created_at?: string;
    status?: boolean;
    created_by?: UserSummary;
    department_image?: string;
}
