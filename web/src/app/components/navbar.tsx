"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface NavbarProps {
    activeSection: string; // กำหนดชนิดของ activeSection เป็น string
  }
  
  export default function Navbar({ activeSection }: NavbarProps) { // Navbar

    const [active, setActive] = useState<string | null>(null); // ใช้สำหรับ active ของตัว dropdown
    const [mobileNavbarActive, setMobileNavbarActive] = useState<boolean>(false);
    const [mobileNavbarMenuActive, setMobileNavbarMenuActive] = useState<string | null>(null);

    const [isMobile, setIsMobile] = useState(true);

    const router = useRouter()

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 640px)"); //(min-width: 768px)
        const handleMediaChange = () => {
            setIsMobile(!mediaQuery.matches); // กลับค่าของ desktop เป็น mobile
        };

        handleMediaChange(); // ตรวจสอบค่าตั้งต้น
        mediaQuery.addEventListener("change", handleMediaChange);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaChange);
        };
    }, []);

    const MobileMenuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleOutSideClick = (event: MouseEvent) => {
            if (!MobileMenuRef.current?.contains(event.target as Node) && mobileNavbarActive) {
                setMobileNavbarActive(false);
            } else {
                return
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [mobileNavbarActive, mobileNavbarMenuActive]);

    return (
        <div
            className={isMobile ? `${mobileNavbarActive && "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20"}` : ""}
        >
            <div
                className={"fixed top-10 inset-x-0 max-w-full sm:mx-[60px] mx-[20px] z-50"}
            >
                <Menu
                    setActive={setActive}
                    mobileNavbarActive={mobileNavbarActive}
                    setMobileNavbarActive={isMobile ? setMobileNavbarActive : undefined}
                    isMobile={isMobile}
                >
                    {/* Logo */}
                    <div className="max-sm:w-full relative">
                        <Image
                            className="hidden sm:block"
                            src="./navbar-logo.svg"
                            alt="logo"
                            width="0"
                            height="0"
                            style={{ width: '150px', height: 'auto' }}
                            priority
                        />
                        <div
                            className={`relative sm:hidden max-sm:w-[calc(100%+45px)] transform transition-all flex flex-row justify-between items-center`}
                            style={{
                                right: mobileNavbarActive ? "calc(0vw)" : "calc(100vw - 115px)",
                            }}
                        >
                            <Image
                                className={`relative inline-block ${mobileNavbarActive ? "opacity-100" : "opacity-0"}`}
                                src={"./mobileNavDropdonwIcon.svg"}
                                onClick={() => {
                                }}
                                alt="logo"
                                width="0"
                                height="0"
                                style={{
                                    width: '30px',
                                    height: 'auto',
                                }}
                                priority
                            />
                            <Image
                                className={`relative inline-block`}
                                src={mobileNavbarActive ? "./navbar-icon-white.svg" : "./navbar-icon.svg"}
                                onClick={() => {
                                }}
                                alt="logo"
                                width="0"
                                height="0"
                                style={{
                                    width: '30px',
                                    height: 'auto',
                                }}
                                priority
                            />
                        </div>
                    </div>

                    {/* Menus */}
                    {!isMobile && (
                        <div className="flex flex-row flex-nowrap justify-center items-center gap-16">
                            {/* Home menu กดแล้วไป section Home */}
                            <MenuItem setActive={setActive} active={active} activeSection={activeSection} session="home"  item="Home" href="#home"></MenuItem>
                            {/* Portfolio menu กดแล้วไป section Portfolio */}
                            <MenuItem setActive={setActive} active={active} activeSection={activeSection} session="portfolio" item="Portfolio" href="#portfolio"></MenuItem>
                            {/* About menu กดแล้วจะขึ้น popup ของ About */}
                            <MenuItem setActive={setActive} active={active} activeSection={activeSection} session="about" item="About >">
                                {/*  Popup menus ของ About ทั้งชุด */}
                                <div className="flex flex-col space-y-1">
                                    {/*  Popup menu ของ About แค่ปุ่มเดียว ในที่นี้มี 4 ปุ่ม */}
                                    <HoveredLink href="#about">Contact</HoveredLink>
                                    <HoveredLink href="#services">Services</HoveredLink>
                                    <HoveredLink href="#member">Member</HoveredLink>
                                </div>
                            </MenuItem>
                        </div>
                    )}
                    {/* Enquiry button */}
                    <button type="button" onClick={() => router.push('#enquiry')} className="max-sm:hidden bg-[#ECF0FF] rounded-[10px] w-[150px] px-3 py-1 transition-shadow hover:shadow-[0px_4px_13.1px_0px_rgba(255,255,255,0.4),0px_10px_20px_-15px_rgba(236,240,255,1)]">
                        <h5 className="bg-gradient-to-r from-[#6580E1] to-[#5844D7] bg-clip-text text-transparent font-bold">
                            Enquiry
                        </h5>
                    </button>
                    <Image
                        className="block sm:hidden cursor-pointer"
                        // onClick={() => {
                        //     setMobileNavbarActive(!mobileNavbarActive);
                        // }}
                        src={"./menu.svg"}
                        alt="logo"
                        width="0"
                        height="0"
                        style={{
                            width: '30px',
                            height: 'auto',
                            opacity: mobileNavbarActive ? '0' : '100',
                            transition: 'opacity 0.2s ease-in-out',
                        }}
                        priority
                    />
                </Menu >
                {isMobile && mobileNavbarActive && (
                    <div
                        ref={MobileMenuRef}
                        className="absolute top-[70px] z-[50] right-0 flex flex-col w-full gap-1"
                    >
                        {/* Home menu กดแล้วไป section Home */}
                        <MenuItem setActive={setMobileNavbarMenuActive} active={mobileNavbarMenuActive} activeSection={activeSection} session="home" item="Home" href="#home" setMobileNavbarActive={setMobileNavbarActive}></MenuItem>
                        {/* Portfolio menu กดแล้วไป section Portfolio */}
                        <MenuItem setActive={setMobileNavbarMenuActive} active={mobileNavbarMenuActive} activeSection={activeSection} session="portfolio" item="portfolio" href="#portfolio" setMobileNavbarActive={setMobileNavbarActive}></MenuItem>
                        {/* About menu กดแล้วจะขึ้น popup ของ About */}
                        <MenuItem setActive={setMobileNavbarMenuActive} active={mobileNavbarMenuActive} activeSection={activeSection} session="about" item="About &#129170;">
                            <div className="flex flex-col space-y-1">
                                {/*  Popup menu ของ About แค่ปุ่มเดียว ในที่นี้มี 4 ปุ่ม */}
                                <HoveredLink href="#about" onClick={() => setMobileNavbarActive(false)}>Contact</HoveredLink>
                                <HoveredLink href="#services" onClick={() => setMobileNavbarActive(false)}>Services</HoveredLink>
                                <HoveredLink href="#member" onClick={() => setMobileNavbarActive(false)}>Member</HoveredLink>
                            </div>
                        </MenuItem>
                    </div>
                )}
            </div >
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
    setMobileNavbarActive,
    activeSection,
    session,
}: {
    setActive: (item: string | null) => void; // จาก useState ด้านบน
    active: string | null; // จาก useState ด้านบน
    item: string; // ชื่อของหัวข้อที่จะใช้แสดง
    children?: React.ReactNode; // จะมีหรือไม่มีก็ได้
    href?: string; // จะมีหรือไม่มีก็ได้เป็น link ที่จะใช้ href ไปที่หน้าหรือ section อื่น
    setMobileNavbarActive?: Dispatch<SetStateAction<boolean>>;
    activeSection : string;
    session : string;

}) => {


    return (
        <div
            onClick={() => {
                setActive(active === item ? null : item);
                if (setMobileNavbarActive) {
                    setMobileNavbarActive(false);
                }
            }}
            className="relative"
        > {/* onMouseEnter={() => setActive(item)} */} {/* ถ้า active มีค่าอยู่แล้วให้เคลียออก เพื่อที่ dropdown จะได้หายไป ถ้าไม่มีให้ setActive ของ menu นั้นๆ กรณีมีหัวข้อที่กดแล้วเป็น dropdown หลายตัว */}
            {href ? // เช็คว่าปุ่มนั้นเป็นแบบ Link มั้ย
                (
                    // กรณีปุ่มเป็นแบบ Link จะเข้า case นี้
                    <Link href={href}>
                       <h5
                            className={`${activeSection === session ? "sm:bg-gradient-to-b sm:from-[#D9D9D9]/0 sm:from-50% sm:via-[#6580E1] sm:via-95% sm:to-[#453E72] sm:to-120% sm:border-b-[#453E72] sm:border-b-4 py-5 px-3" : ""} 
                            flex-grow h-full max-sm:hover:text-[#ECF0FF] max-sm:hover:bg-gradient-to-tr max-sm:hover:from-[rgba(88,68,215,1)_0%] max-sm:hover:via-[rgba(101,128,225,1)_95%] max-sm:hover:to-[rgba(208,216,242,1)_100%] max-sm:[box-shadow:inset_0px_3px_3.9px_-2px_rgba(255_255_255_/_0.93),_0px_4px_13.1px_rgba(255_255_255_/_0.2)] cursor-pointer transition-shadow [text-shadow:_0_4px_3px_rgba(0_0_0_/_0.25)] text-[#453E72] sm:hover:[text-shadow:_0_4px_3px_rgba(0_0_0_/_0.25),_0_4px_4px_rgba(255_255_255_/_0.4)] 
                            max-sm:w-full max-sm:bg-gradient-to-r max-sm:from-[rgba(200,189,228,1)] max-sm:to-[rgba(255,255,255,.25)] max-sm:rounded-[18px] max-sm:py-2 max-sm:px-16 sm:text-center`}
                        >
                            {item}
                        </h5>
                    </Link>
                )
                :
                (
                    // กรณีปุ่ม<ไม่>เป็นแบบ Link จะเข้า case นี้
                    <h5
                        className={`${ activeSection !== "home" && activeSection !== "portfolio" && activeSection !== "" ? "sm:bg-gradient-to-b sm:from-[#D9D9D9]/0 sm:from-50% sm:via-[#6580E1] sm:via-95% sm:to-[#453E72] sm:to-120% sm:border-b-[#453E72] sm:border-b-4 py-5 px-3" : ""} 
                            flex-grow h-full max-sm:hover:text-[#ECF0FF] max-sm:hover:bg-gradient-to-tr max-sm:hover:from-[rgba(88,68,215,1)_0%] max-sm:hover:via-[rgba(101,128,225,1)_95%] max-sm:hover:to-[rgba(208,216,242,1)_100%] max-sm:[box-shadow:inset_0px_3px_3.9px_-2px_rgba(255_255_255_/_0.93),_0px_4px_13.1px_rgba(255_255_255_/_0.2)] cursor-pointer transition-shadow [text-shadow:_0_4px_3px_rgba(0_0_0_/_0.25)] text-[#453E72] sm:hover:[text-shadow:_0_4px_3px_rgba(0_0_0_/_0.25),_0_4px_4px_rgba(255_255_255_/_0.4)] 
                            max-sm:w-full max-sm:bg-gradient-to-r max-sm:from-[rgba(200,189,228,1)] max-sm:to-[rgba(255,255,255,.25)] max-sm:rounded-[18px] max-sm:py-2 max-sm:px-16 sm:text-center`}
                        >
                        {item}
                    </h5>
                )
            }

            {children && active !== null && ( // Dropdown ตัว children คือ element ของ dropdown
                <div>
                    {active === item && ( // ไว้แสดง dropdown ของแต่ละหัวข้อที่เลือก
                        <div className="absolute top-[-20px] sm:top-[20px] max-sm:top-[35px] sm:left-[calc(100%_+_4rem)] max-sm:right-0 transform sm:-translate-x-1/2 pt-4 sm:pt-8"> {/* top-[calc(100%_+_1.2rem)] left-1/2*/}
                            <div
                                className="sm:bg-[url('/bg-dropdown.svg')] sm:pt-8 px-[0.65rem]  sm:rounded-[10px] overflow-hidden"
                                >
                                <div className="w-max h-full p-1 max-sm:px-2">
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
    mobileNavbarActive,
    setMobileNavbarActive,
    isMobile,
}: {
    setActive: (item: string | null) => void; // จำเป้นต้องมี
    children: React.ReactNode; // จำเป้นต้องมี
    mobileNavbarActive: boolean;
    setMobileNavbarActive?: Dispatch<SetStateAction<boolean>>;
    isMobile: boolean;
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
            className="relative rounded-[20px] sm:rounded-[15px] flex flex-nowrap justify-between items-center space-x-4 ps-8 max-sm:ps-4 pe-4 max-sm:pe-5 h-[70px] max-sm:h-[50px] backdrop-blur-[30px]"
            onClick={() => {
                if (setMobileNavbarActive) {
                    setMobileNavbarActive(!mobileNavbarActive)
                    setActive(null)
                }
            }}
            style={{
                backgroundColor: "#ffffff",
                background: mobileNavbarActive && isMobile ? "linear-gradient(83deg, rgba(30, 30, 30, 0.3) 0%, rgba(88, 68, 215, 0.3) 50%, rgba(101, 128, 225, 0.3) 100%)" : "linear-gradient(90deg, rgba(200, 189, 228, 1) 0%, rgba(255, 255, 255, 0.5) 100%)",
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
const HoveredLink = ({ children, ...rest }: React.PropsWithChildren<React.ComponentProps<typeof Link>>) => { // props ทุกตัวจำเป็นต้องมี
    return (
        <Link
            {...rest} // ตัวนี้เป็น props อื่นๆ ที่เป็น attribute ของ html tag element เช่น src
            className="sm:text-[#453E72] text-[#16151D] text-[1.25rem] max-sm:text-[1rem] px-8 sm:px-28 py-2 rounded-[10px] max-sm:rounded-full bg-[#ECF0FF] sm:bg-[rgba(200,200,200,1)] sm:bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] sm:from-[rgba(200,189,228,1)_0%] sm:to-[rgba(255,255,255,0.5)_100%] text-center hover:bg-[linear-gradient(200deg,_var(--tw-gradient-stops))] hover:from-[rgba(88,68,215,1)_0%] hover:via-[rgba(101,128,225,1)_40%] hover:to-[rgba(150,159,193,1)_60%] hover:shadow-[inset_0px_3px_3.9px_-2px_#ffff,0px_10px_30px_-15px_#B2A9E7]"
        >
            {children}
        </Link>
    );
};