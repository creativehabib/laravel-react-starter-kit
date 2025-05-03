import { EmployeeType, EmployeeFormData } from '@/types/globals';

export function transformEmployeeToFormData(employee: EmployeeType): EmployeeFormData {
    return {
        id: employee.id,
        name: employee.name ?? '',
        email: employee.email ?? '',
        phone: employee.phone ?? '',
        position: employee.position ?? '',
        department_id: employee.department?.id ?? '',
        designation_id: employee.designation?.id ?? '',
        user_id: employee.user?.id ?? '',
        pf_number: employee.pf_number ?? '',
        joining_date: employee.joining_date ?? '',
        date_of_birth: employee.date_of_birth ?? '',
        blood_group: employee.blood_group ?? '',
        emergency_contact: employee.emergency_contact ?? '',
        employee_image: employee.employee_image ?? '',
        bank_account_number: employee.bank_account_number ?? '',
        bank_name: employee.bank_name ?? '',
        verify: employee.verify ?? '',
        status: !!Number(employee.status), // ✅ convert "1" | "0" into true | false
        present_address: employee.present_address ?? '',
        permanent_address: employee.permanent_address ?? '',
        about: employee.about ?? '',
    };
}
export function getImageUrl(path?: string | null, width = 300, height = 200, text = 'No Image') {
    if (!path) {
        return `https://placehold.co/${width}x${height}?text=${encodeURIComponent(text)}`;
    }

    return `/storage/${path}`;
}
