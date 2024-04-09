"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const schemas_1 = require("../schemas");
const dto_1 = require("../dto");
const decorator_1 = require("../../auth/decorator");
let UsersService = class UsersService {
    constructor(UserModel) {
        this.UserModel = UserModel;
        this.getHashPassword = (Hashpassword) => {
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            const hash = (0, bcryptjs_1.hashSync)(Hashpassword, salt);
            return hash;
        };
    }
    async create(createUserDto, user) {
        const { name, email, password, age, gender, address, role, company } = createUserDto;
        const hashPassword = this.getHashPassword(createUserDto.password);
        const isExit = await this.UserModel.findOne({ email });
        if (isExit) {
            throw new common_1.BadRequestException(`Email: ${email} already exits`);
        }
        const newUser = await this.UserModel.create({
            name,
            email,
            password: hashPassword,
            age,
            gender,
            address,
            role,
            company,
            createdBy: {
                _id: user?._id,
                email: user?.email,
            },
        });
        return {
            _id: newUser._id,
            createdAt: newUser.createdAt,
        };
    }
    async update(id, updateUserDto) {
        return await this.UserModel.updateOne({
            _id: updateUserDto._id,
        }, {
            ...updateUserDto,
        });
    }
    findOneByUserName(username) {
        return this.UserModel.findOne({
            email: username,
        });
    }
    isValidPassword(password, hash) {
        return (0, bcryptjs_1.compareSync)(password, hash);
    }
    remove(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id))
            return 'User not found';
        return this.UserModel.deleteOne({
            _id: id,
        });
    }
    async register(user) {
        const { name, email, password, age, gender, address } = user;
        const isExit = await this.UserModel.findOne({ email });
        if (isExit) {
            throw new common_1.BadRequestException(`Email: ${email} already exits`);
        }
        const hashPassword = this.getHashPassword(password);
        const newRegister = await this.UserModel.create({
            name,
            email,
            password: hashPassword,
            age,
            gender,
            address,
            role: 'USER',
        });
        return newRegister;
    }
};
exports.UsersService = UsersService;
__decorate([
    __param(1, (0, decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "create", null);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.User.name)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map