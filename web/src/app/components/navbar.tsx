"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";



export default function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={"fixed top-10 inset-x-0 max-w-full mx-[60px] z-50"}
        >
            <Menu setActive={setActive}>
                <div className=""><Image src={"./navbar-logo.svg"} alt="logo" width={150} height={100} /></div>
                <div className="flex flex-row flex-nowrap justify-center items-center gap-16">
                    <MenuItem setActive={setActive} active={active} item="Home"></MenuItem>
                    <MenuItem setActive={setActive} active={active} item="Portfolio"></MenuItem>
                    <MenuItem setActive={setActive} active={active} item="About >">
                        <div className="flex flex-col space-y-1 text-sm">
                            <HoveredLink href="/hobby">ประวัติการทำงาน</HoveredLink>
                            <HoveredLink href="/individual">Contact</HoveredLink>
                            <HoveredLink href="/team">Services</HoveredLink>
                            <HoveredLink href="/enterprise">Member</HoveredLink>
                        </div>
                    </MenuItem>
                </div>
                <button type="button" className="bg-[#ECF0FF] rounded-[10px] w-[150px] px-3 py-1 transition-shadow hover:shadow-[0px_4px_13.1px_0px_rgba(255,255,255,0.4),0px_10px_20px_-15px_rgba(236,240,255,1)]"><h5 className="bg-gradient-to-r from-[#6580E1] to-[#5844D7] bg-clip-text text-transparent font-bold">Enquiry</h5></button>
            </Menu>
        </div>
    );
}

const MenuItem = ({
    setActive,
    active,
    item,
    children,
}: {
    setActive: (item: string | null) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
}) => {
    return (
        <div onClick={() => setActive(active ? null : item)} className="relative "> {/* onMouseEnter={() => setActive(item)} */}
            <h5
                className="cursor-pointer transition-shadow [text-shadow:_0_4px_3px_rgba(0_0_0_/_0.25)] text-[#453E72] hover:[text-shadow:_0_4px_3px_rgba(0_0_0_/_0.25),_0_4px_4px_rgba(255_255_255_/_0.4)]"
            >
                {item}
            </h5>
            {children && active !== null && (
                <div>
                    {active === item && (
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
                                    {children}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const Menu = ({
    setActive,
    children,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle clicks outside of the menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActive(null); // Close menu when clicking outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setActive]);

    return (
        <nav
            ref={menuRef}
            className="relative rounded-[15px] flex justify-between items-center space-x-4 ps-8 pe-4 h-[70px] backdrop-blur-[30px]"
            style={{
                backgroundColor: "#ffffff",
                background: "linear-gradient(90deg, rgba(200, 189, 228, 1) 0%, rgba(255, 255, 255, 0.5) 100%)",
                boxShadow: `
                    inset 0px 3px 3.9px -2px rgba(255, 255, 255, .93),
                    0px 10px 30px -15px #B2A9E7`,
            }}
        >
            {children}
        </nav>
    );
};


// const ProductItem = ({
//     title,
//     description,
//     href,
//     src,
// }: {
//     title: string;
//     description: string;
//     href: string;
//     src: string;
// }) => {
//     return (
//         <Link href={href} className="flex space-x-2">
//             <Image
//                 src={src}
//                 width={140}
//                 height={70}
//                 alt={title}
//                 className="flex-shrink-0 rounded-md shadow-2xl"
//             />
//             <div>
//                 <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
//                     {title}
//                 </h4>
//                 <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
//                     {description}
//                 </p>
//             </div>
//         </Link>
//     );
// };

const HoveredLink = ({ children, ...rest }: any) => {
    return (
        <Link
            {...rest}
            className="text-[#453E72] text-[20px] px-8 py-2 rounded-[10px] bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[rgba(200,189,228,1)_0%] to-[rgba(255,255,255,0.5)_100%] text-center hover:bg-[linear-gradient(200deg,_var(--tw-gradient-stops))] hover:from-[rgba(88,68,215,1)_0%] hover:via-[rgba(101,128,225,1)_40%] hover:to-[rgba(150,159,193,1)_60%] hover:shadow-[inset_0px_3px_3.9px_-2px_#ffff,0px_10px_30px_-15px_#B2A9E7]"
            style={{
                backgroundColor: "rgba(200, 200, 200, 1)",
            }}
        >
            {children}
        </Link>
    );
};