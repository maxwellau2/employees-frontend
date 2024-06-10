export interface LoginInterface {
    username: string;
    password: string;
}

export interface LoginInterfaceReturn {
    status: string;
    user: string;
}

export interface SignupInterface {
    username: string;
    password: string;
    departmentId: number;
}

export interface SignupInterfaceReturn {
    status: string;
    message: string;
}

export interface LogoutInterfaceReturn {
    status: string;
    message: string;
}
