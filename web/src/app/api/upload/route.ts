import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.cwd() ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();

    // ตรวจสอบว่า directory อัปโหลดมีอยู่หรือไม่
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const uploadedFiles: string[] = [];
    for (const [key, value] of formData.entries()) {
        // ใช้ type guard เพื่อตรวจสอบว่า value เป็น File
        console.log(key);
        if (value instanceof File) {
            const buffer = Buffer.from(await value.arrayBuffer());
            const fileName = value.name; // ใช้ชื่อไฟล์จาก File

            fs.writeFileSync(path.resolve(UPLOAD_DIR, fileName), buffer);
            uploadedFiles.push(fileName);
        }
    }

    if (uploadedFiles.length > 0) {
        return NextResponse.json({
            success: true,
            files: uploadedFiles,
        });
    } else {
        return NextResponse.json({
            success: false,
            message: "No files uploaded.",
        });
    }
};

