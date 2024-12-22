import { sendEmail } from "@/utils/mail.utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // รับข้อมูลจากฝั่ง Client
    const { sender, receipients, subject, message, attachments, } = await req.json(); // รับ JSON ที่ส่งมาจาก Client

    try {
        const result = await sendEmail({
            sender,
            receipients,
            subject,
            message,
            attachments,
        });

        return NextResponse.json({
            accepted: result.accepted,
        });
    } catch (err) {
        console.error("Error sending email:", err); // สำหรับ Debugging
        return NextResponse.json(
            {
                message: "Unable to send email this time",
            },
            {
                status: 500,
            }
        );
    }
}