import { Modulo } from './modulo';

export class LoginResponse {
    jwt: string;
    user: User;
}

export class User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    created_at: Date;
    updated_at: Date;
    role: Role;
    modulo: Modulo;
}

export class Role {
    id: number;
    name: string;
    description: string;
    type: string;
}