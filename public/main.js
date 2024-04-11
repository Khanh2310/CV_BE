"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const interceptor_1 = require("./interceptor");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configServices = app.get(config_1.ConfigService);
    const reflector = app.get(core_1.Reflector);
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(reflector));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('/v1/api');
    app.useGlobalInterceptors(new interceptor_1.TransformInterceptor(reflector));
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });
    app.use(cookieParser());
    await app.listen(configServices.get('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map