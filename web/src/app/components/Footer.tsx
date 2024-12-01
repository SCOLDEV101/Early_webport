import Link from 'next/link'
import React from 'react'

type Props = {}

function Footer({ }: Props) {
    return (
        // แบ่ง Footer ออกเป้น 2 ฝั่ง หลัก ๆ
        <div className="h-[400px] w-screen flex justify-center items-center bg-[linear-gradient(2deg,rgba(71,92,165,0.5)0%,rgba(27,35,63,1)45%)]">
            <div className="flex flex-row gap-32">
                {/* ส่วนด้านซ้าย ของ footer */}
                <div className="">
                    {/* Brand company */}
                    <h1 className="text-[#FFFFFF] text-[3rem] font-extrabold">SCOLDEV</h1>
                    <br />
                    {/* เบอร์โทร */}
                    <h4 className="text-[#ECF0FF] font-extrabold">063-874-0176</h4>
                    {/* Email */}
                    <p className="text-[#D9D9D9] [text-shadow:_0_0_7.8px_rgb(255_255_255_/_25%)]">
                        email : <span className="text-[#FFFFFF] font-bold">
                            scoldev101@gmail.com
                        </span>
                    </p>
                </div>

                {/* ส่วนด้านขวาของ footer */}
                <div className="flex flex-row justify-between gap-24">
                    {/* ปุ่ม menu ที่ใช้ในการ href กลับไปที่ section ต่าง ๆ */}
                    <Link href={"#Home"} className="text-[#FFFFFF] text-[1.25rem]">home</Link>
                    <Link href={"#Portfolio"} className="text-[#FFFFFF] text-[1.25rem]">portfolio</Link>
                    <Link href={"#About"} className="text-[#FFFFFF] text-[1.25rem]">about</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer