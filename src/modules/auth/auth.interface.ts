export type TRegisterUser = {
    name: string;
    email: string;
    password: string;
    role: 'TENANT' | 'LANDLORD';
    phoneNumber?: string;
};

export type TLoginUser = {
    email: string;
    password: string;
};