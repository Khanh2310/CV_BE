import { AppService } from './app.service';
import { AuthService } from './auth/services/auth.service';
export declare class AppController {
    private readonly appService;
    private authService;
    constructor(appService: AppService, authService: AuthService);
    getHello(): string;
}
