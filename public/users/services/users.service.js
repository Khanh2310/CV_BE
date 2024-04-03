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
let UsersService = class UsersService {
    constructor(UserModel) {
        this.UserModel = UserModel;
        this.getHashPassword = (Hashpassword) => {
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            const hash = (0, bcryptjs_1.hashSync)(Hashpassword, salt);
            return hash;
        };
    }
    findAll() {
        return `Find User Success`;
    }
    async create(addUser) {
        const hash = this.getHashPassword(addUser.password);
        const user = await this.UserModel.create({
            email: addUser.email,
            password: hash,
            name: addUser.name,
        });
        return user;
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
            return 'user not found';
        return this.UserModel.deleteOne({
            _id: id,
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map