import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services';
import { IUser } from 'src/users/types';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: IUser): Promise<{
        access_token: string;
        _id: string;
        name: string;
        email: string;
        role: string;
    }>;
}
