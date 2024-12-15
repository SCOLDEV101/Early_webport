import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.resolve(process.cwd(), "public/uploads");

export const POST = async (req: NextRequest) => {
    const { fileNames } = await req.json();

    if (!fileNames || !Array.isArray(fileNames)) {
        return NextResponse.json({
            success: false,
            message: "Invalid file names provided.",
        });
    }

    const deletedFiles: string[] = [];
    const errors: string[] = [];

    for (const fileName of fileNames) {
        try {
            const filePath = path.resolve(UPLOAD_DIR, fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                deletedFiles.push(fileName);
            } else {
                errors.push(`File not found: ${fileName}`);
            }
        } catch (error) {
            console.error(`Error deleting file ${fileName}:`, error);
            errors.push(`Error deleting file: ${fileName}`);
        }
    }

    return NextResponse.json({
        success: errors.length === 0,
        deletedFiles,
        errors,
    });
};
