import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { error } from "console";
import fs from 'fs';
import { diskStorage } from "multer";
import path, { join } from "path";
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {

    getRootPath = () => {

        // là một phương thức của Node.js để lấy ra đường dẫn hiện tại của thư mục làm việc (current working directory - cwd). Thường thì nó trả về đường dẫn tới thư mục mà ứng dụng NestJS đang chạy trong đó
        return process.cwd();
        // trả ra đường link thư mục root
    }



    // nếu chưa có thư mục thì tạo 1 thư mục chưa tồn tại thì chúng ta tạo, còn chưa tồn tại thì tạo mới
    ensureExists(targetDirectory: string) {
        fs.mkdir(targetDirectory, { recursive: true }, (error) => { 
            if (!error) {
                console.log('Directory successfully created, or it already exists.');
                return;
            }
            switch (error.code) {
case 'EEXIST':
// Error:
// Requested location already exists, but it's not a directory.
break;
case 'ENOTDIR':
// Error:
// The parent hierarchy contains a file with the same name as the dir
// you're trying to create.
break;
default:
// Some other error like permission denied.
console.error(error);
break;
}
        });
    }



    createMulterOptions(): MulterModuleOptions {
      
   return {
  storage: diskStorage({
    //diskStorage: Không gian lưu trữ, ví dụ ổ đĩa C hoặc D
    destination: (req, file, cb) => {
      // destination ghi đè lại dest
      const folder = req?.headers?.folder_type ?? "default";
      this.ensureExists(`public/images/${folder}`);
      cb(null, join(this.getRootPath(), `public/images/${folder}`));
    },
    filename: (req, file, cb) => {
      // filename giúp đổi được tên file
      //get image extension
      let extName = path.extname(file.originalname);
      //get image's name (without extension)
      let baseName = path.basename(file.originalname, extName);
      let finalName = `${baseName}-${Date.now()}${extName}`;
      cb(null, finalName);
    },
  }),
};

  }
}