/// <reference types="multer" />
import { FileService } from '../services/file.service';
import { UpdateFileDto } from '../dto/update-file.dto';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file: Express.Multer.File): {
        fileName: string;
    };
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFileDto: UpdateFileDto): string;
    remove(id: string): string;
}
