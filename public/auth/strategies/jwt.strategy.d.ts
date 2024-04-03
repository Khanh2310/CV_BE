import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/types';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: IUser): Promise<{
        _id: string;
        name: string;
        email: string;
        role: string;
    }>;
}
export {};
