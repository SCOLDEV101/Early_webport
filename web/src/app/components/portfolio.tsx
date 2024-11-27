import Image from 'next/image'
import React, { useState } from 'react'
import { portfolio_data } from '../constants/staticData';

type Props = {}

export default function Portfolio({ }: Props) {

    // State สำหรับการ active ของปุ่ม menu filter
    const [Filter, setFilter] = useState<string>("all"); // ค่า filter เริ่มต้นเป็น all

    // Menu ตัวเลือกสำหรับการ filter มี field เป็นชื่อ<anycase> และหมวดหมู่<lowercase>
    const menus = [
        { name: "Web", category: "web" },
        { name: "Mobile", category: "mobile" },
        { name: "All", category: "all" },
    ]

    // function สำหรับการ filter ตัวข้อมูล
    const filterPortfolio = (selectedCategory: string) => {
        if (selectedCategory === "all") { // กรณี filter เป็น all 
            return portfolio_data; // ชุด dummy data ที่ import มาจาก '../constants/staticData'
        }
        return portfolio_data.filter((item) => // กรณี filter เป็นอื่นๆ ที่ไม่ใช้ all จะทำการ filter ชุด dummy data เอาแค่ตัวที่มีหมวดหมู่ตรงกับตัว filter
            item.category.includes(selectedCategory) // includes การณี categories เป็น array ซึ่ง 1 อย่างอาจเป็นได้มากกว่า 1 หมวดหมู่
        );
    };

    // ตัวแปรใหม่ ที่ได้จากการ filter
    const filteredData = filterPortfolio(Filter); 

    return (
        <>
            <div className="flex flex-row justify-between items-center px-3">
                {/* Header ของ section นี้ */}
                <h1 className="font-extrabold text-white">Portfolio</h1>

                {/* Menus ที่ใช้เลือก filter */}
                <FilterMenus setFilter={setFilter} Filter={Filter} Menus={menus} />
            </div>

            {/* ส่วนแสดงผลข้อมูล portfolio */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8">
                
                {/* นำ filteredData ที่ประกาศไว้ก่อนหน้า มาทำการ map แยก array */}
                {filteredData.map((data, idx) => (
                    <div
                        key={idx}
                        className="w-full bg-transparent space-y-4 transition-shadow p-4 rounded-[15px] hover:bg-[linear-gradient(0deg,_var(--tw-gradient-stops))] from-[rgba(200,189,228,.55)_0%] to-[rgba(96,81,81,0.1)_64%] hover:shadow-[inset_0px_3px_3.9px_-2px_#ffff,0px_10px_30px_-5px_#ECF0FF]"
                    >
                        {/* รูปของแต่ละ 1 ชุดข้อมูล */}
                        <Image
                            src={data.img_src}
                            alt={data.img_alt}
                            width={500}
                            height={300}
                            className="w-full h-auto object-cover rounded-[10px]"
                            priority
                        />

                        {/* ส่วนของ detail */}
                        <div className="space-y-4">
                            {/* หัวเรื่องของแต่ละชุดข้อมูล */}
                            <h4 className="font-extrabold text-[#FFFFFF] break-words">{data.title}</h4>
                            {/* description ของแต่ละชุดข้อมูล */}
                            <p className="text-sm text-[#ECF0FF]">{data.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

// ตัวแถบ Menu filter
const FilterMenus = ({
    setFilter, // function ของ useState ใช้ set ค่าปุ่มที่กด (active)
    Filter, // ตัวแปรของ useState ใช้เช็ค Active case 
    Menus // เมนูที่เป็น array
}: {
    // Types ของแต่ละตัวแปร
    setFilter: (item: string) => void,
    Filter: string,
    Menus: any[]
}) => {
    return (
        <div className="flex flex-row flex-nowrap space-x-4">
            {/* Map เมนูแต่ละปุ่มออกมา */}
            {Menus.length > 0 && Menus.map((menu, idx) => (
                <div
                    key={menu.name}
                    className={`group/filter-btn cursor-pointer py-1 px-4 w-[125px] text-center
                        ${menu.category === Filter // เช็คว่าปุ่มนี้เป็นปุ่มที่ active อยู่มั้ย ถ้าใช่ (===) ให้ทำในส่วนด้านหลัง && (และ)
                        && "rounded-[10px] shadow-[inset_0px_3px_3.9px_-2px_#ffff,0px_10px_30px_-15px_#B2A9E7] bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[rgba(200,189,228,1)_0%] to-[rgba(255,255,255,0.5)_100%]"}
                        `}
                    onClick={() => setFilter(menu.category)} // กรณีกดปุ่มนี้แล้วจะ set active ให้ปุ่มที่กด
                >
                    <h5 className={`text-[#ECF0FF] ${menu.category !== Filter && "group-hover/filter-btn:[text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25),_0_4px_13.1px_rgba(255_255_255_/_0.2),_0_10px_20px_rgba(236_240_255_/_0.9)]"}`}>
                        {menu.name} {/* ชื่อปุ่ม */}
                    </h5>
                </div>
            ))}
        </div>
    )
}