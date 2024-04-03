import { AuthService } from '../services';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    handleAuth(req: any): Promise<{
        access_token: string;
        _id: string;
        name: string;
        email: string;
        role: string;
    }>;
    getProfile(req: any): any;
}
