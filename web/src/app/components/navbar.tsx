"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";


// Navbar main Element

export default function Navbar() { // Navbar

    const [active, setActive] = useState<string | null>(null); // ใช้สำหรับ active ของตัว dropdown

    return (
        <div
            className={"fixed top-10 inset-x-0 max-w-full mx-[60px] z-50"}
        >
            <Menu setActive={setActive}>
                {/* Logo */}
                <div>
                    <Image
                        src="./navbar-logo.svg"
                        alt="logo"
                        width="0"
                        height="0"
                        style={{ width: '150px', height: 'auto' }}
                        priority
                    />
                </div>

                {/* Menus */}
                <div className="flex flex-row flex-nowrap justify-center items-center gap-16">
                    {/* Home menu กดแล้วไป section Home */}
                    <MenuItem setActive={setActive} active={active} item="Home" href="#home"></MenuItem>
                    {/* Portfolio menu กดแล้วไป section Portfolio */}
                    <MenuItem setActive={setActive} active={active} item="Portfolio" href="#portfolio"></MenuItem>
                    {/* About menu กดแล้วจะขึ้น popup ของ About */}
                    <MenuItem setActive={setActive} active={active} item="About >">
                        {/*  Popup menus ของ About ทั้งชุด */}
                        <div className="flex flex-col space-y-1">
                            {/*  Popup menu ของ About แค่ปุ่มเดียว ในที่นี้มี 4 ปุ่ม */}
                            <HoveredLink href="/hobby">ประวัติการทำงาน</HoveredLink>
                            <HoveredLink href="/individual">Contact</HoveredLink>
                            <HoveredLink href="/team">Services</HoveredLink>
                            <HoveredLink href="/enterprise">Member</HoveredLink>
                        </div>
                    </MenuItem>
                </div>

                {/* Enquiry button */}
                <button type="button" className="bg-[#ECF0FF] rounded-[10px] w-[150px] px-3 py-1 transition-shadow hover:shadow-[0px_4px_13.1px_0px_rgba(255,255,255,0.4),0px_10px_20px_-15px_rgba(236,240,255,1)]">
                    <h5 className="bg-gradient-to-r from-[#6580E1] to-[#5844D7] bg-clip-text text-transparent font-bold">
                        Enquiry
                    </h5>
                </button>
            </Menu>
        </div>
    );
}



// Navbar sub Elements

const MenuItem = ({ // Props
    setActive,
    active,
    item,
    children,
    href,
}: {
    setActive: (item: string | null) => void; // จาก useState ด้านบน
    active: string | null; // จาก useState ด้านบน
    item: string; // ชื่อของหัวข้อที่จะใช้แสดง
    children?: React.ReactNode; // จะมีหรือไม่มีก็ได้
    href?: string, // จะมีหรือไม่มีก็ได้เป็น link ที่จะใช้ href ไปที่หน้าหรือ section อื่น
}) => {
    return (
        <div onClick={() => setActive(active ? null : item)} className="relative "> {/* onMouseEnter={() => setActive(item)} */} {/* ถ้า active มีค่าอยู่แล้วให้เคลียออก เพื่อที่ dropdown จะได้หายไป ถ้าไม่มีให้ setActive ของ menu นั้นๆ กรณีมีหัวข้อที่กดแล้วเป็น dropdown หลายตัว */}
            {href ? // เช็คว่าปุ่มนั้นเป็นแบบ Link มั้ย
                (
                    // กรณีปุ่มเป็นแบบ Link จะเข้า case นี้
                    <Link href={href}> 
                        <h5
                            className="cursor-pointer transition-shadow [text-shadow:_0_4px_3px_rgba(0_0_0_/_0.25)] text-[#453E72] hover:[text-shadow:_0_4px_3px_rgba(0_0_0_/_0.25),_0_4px_4px_rgba(255_255_255_/_0.4)]"
                        >
                            {item}
                        </h5>
                    </Link>
                )
                :
                (
                    // กรณีปุ่ม<ไม่>เป็นแบบ Link จะเข้า case นี้
                    <h5
                        className="cursor-pointer transition-shadow [text-shadow:_0_4px_3px_rgba(0_0_0_/_0.25)] text-[#453E72] hover:[text-shadow:_0_4px_3px_rgba(0_0_0_/_0.25),_0_4px_4px_rgba(255_255_255_/_0.4)]"
                    >
                        {item}
                    </h5>
                )
            }

            {children && active !== null && ( // Dropdown ตัว children คือ element ของ dropdown
                <div>
                    {active === item && ( // ไว้แสดง dropdown ของแต่ละหัวข้อที่เลือก
                        <div className="absolute -top-[20px] left-[calc(100%_+_7rem)] transform -translate-x-1/2 pt-4"> {/* top-[calc(100%_+_1.2rem)] left-1/2*/}
                            <div
                                className="bg-white rounded-[10px] overflow-hidden border border-black/[0.2] shadow-xl"
                                style={{
                                    backgroundColor: "#ffffff",
                                    background: "linear-gradient(90deg, rgba(200, 189, 228, 1) 0%, rgba(255, 255, 255, 0.5) 100%)",
                                    boxShadow: `
                                        inset 0px 3px 3.9px -2px rgba(255, 255, 255, .93),
                                        0px 4px 13.1px 0px rgba(255, 255, 255, .2)`,
                                }}
                            >
                                <div className="w-max h-full p-1">
                                    {children} {/* เมนู dropdown ที่เป็น list ต่อกันเรื่อยๆ */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


// Body ของ Navbar

const Menu = ({ // Props
    setActive,
    children,
}: {
    setActive: (item: string | null) => void; // จำเป้นต้องมี
    children: React.ReactNode; // จำเป้นต้องมี
}) => {
    const menuRef = useRef<HTMLDivElement>(null); // refference จากตัว tag <nav></nav>

    // ใช้ useEffect เพื่อจัดการ side effects เมื่อคอมโพเนนต์ถูก mount หรือ unmount
    useEffect(() => {
        // ฟังก์ชันที่ใช้ตรวจจับการคลิกนอกเมนู
        const handleClickOutside = (event: MouseEvent) => {
            // ตรวจสอบว่าเมนูอ้างอิงอยู่ (menuRef.current) และคลิกที่องค์ประกอบอื่นนอกเมนู
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActive(null); // ปิดเมนูโดยการตั้งค่า setActive(null)
            }
        };

        // เพิ่ม event listener เพื่อฟังการคลิกเมาส์ลง (mousedown) บน document
        document.addEventListener("mousedown", handleClickOutside);

        // คืนค่า cleanup function เพื่อลบ event listener เมื่อคอมโพเนนต์ถูก unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setActive]); // useEffect จะทำงานอีกครั้งหากค่า setActive เปลี่ยนแปลง

    return (
        <nav
            ref={menuRef} // refference ที่อ้างจาก useRef
            className="relative rounded-[15px] flex justify-between items-center space-x-4 ps-8 pe-4 h-[70px] backdrop-blur-[30px]"
            style={{
                backgroundColor: "#ffffff",
                background: "linear-gradient(90deg, rgba(200, 189, 228, 1) 0%, rgba(255, 255, 255, 0.5) 100%)",
                boxShadow: `
                    inset 0px 3px 3.9px -2px rgba(255, 255, 255, .93),
                    0px 10px 30px -15px #B2A9E7`,
            }}
        >
            {children} {/* Element ภายใต้ Menu */}
        </nav>
    );
};

// ปุ่มของ Popup
const HoveredLink = ({ children, ...rest }: any) => { // props ทุกตัวจำเป็นต้องมี
    return (
        <Link
            {...rest} // ตัวนี้เป็น props อื่นๆ ที่เป็น attribute ของ html tag element เช่น src
            className="text-[#453E72] text-[1.25rem] px-8 py-2 rounded-[10px] bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[rgba(200,189,228,1)_0%] to-[rgba(255,255,255,0.5)_100%] text-center hover:bg-[linear-gradient(200deg,_var(--tw-gradient-stops))] hover:from-[rgba(88,68,215,1)_0%] hover:via-[rgba(101,128,225,1)_40%] hover:to-[rgba(150,159,193,1)_60%] hover:shadow-[inset_0px_3px_3.9px_-2px_#ffff,0px_10px_30px_-15px_#B2A9E7]"
            style={{
                backgroundColor: "rgba(200, 200, 200, 1)",
            }}
        >
            {children}
        </Link>
    );
};