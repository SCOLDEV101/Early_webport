import Image from 'next/image'
import React, { useState } from 'react'
import { portfolio_data } from '../constants/staticData';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../globals.css';

// import required modules
import { Navigation } from 'swiper/modules';

type Props = {}

export default function Portfolio({ }: Props) {

    // State สำหรับการ active ของปุ่ม menu filter
    const [Filter, setFilter] = useState<string>("all"); // ค่า filter เริ่มต้นเป็น all
    const [openPopup, setOpenPopup] = useState(false); // State สำหรับการเปิด/ปิด popup modal
    const [modalID, setModalID] = useState<number>(); // State สำหรับเก็บ id ของข้อมูลที่ถูกเลือก

    // function ในการปิด popup
    const HandleRemovePopUp = () => setOpenPopup(false); // ฟังก์ชันเพื่อปิด modal

    // Menu ตัวเลือกสำหรับการ filter มี field เป็นชื่อ<anycase> และหมวดหมู่<lowercase>
    const menus = [
        { name: "Web", category: "web" }, // หมวดหมู่ web
        { name: "Mobile", category: "mobile" }, // หมวดหมู่ mobile
        { name: "All", category: "all" }, // หมวดหมู่ทั้งหมด
    ]

    // function สำหรับการ filter ตัวข้อมูล
    const filterPortfolio = (selectedCategory: string) => {
        if (selectedCategory === "all") { // กรณี filter เป็น all 
            return portfolio_data; // คืนค่าชุดข้อมูลทั้งหมด (ไม่กรอง)
        }
        return portfolio_data.filter((item) => // กรณี filter เป็นหมวดหมู่อื่น จะกรองข้อมูลที่หมวดหมู่ตรงกับ category
            item.category.includes(selectedCategory) // includes กรณี category เป็น array สามารถอยู่ในหลายหมวดหมู่ได้
        );
    };

    // ตัวแปรใหม่ ที่ได้จากการ filter
    const filteredData = filterPortfolio(Filter); // เรียกฟังก์ชัน filterPortfolio เพื่อกรองข้อมูลตาม Filter ปัจจุบัน

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
                        key={idx} // ใช้ key เพื่อเพิ่มประสิทธิภาพการ render ใน React
                        onClick={() => { 
                            setOpenPopup(true); // เปิด popup modal
                            setModalID(data.id); // เก็บ id ของข้อมูลที่ถูกคลิก
                            console.log(modalID); // Debugging: ตรวจสอบค่า modalID
                        }}
                        className="w-full bg-transparent space-y-4 transition-shadow p-4 rounded-[15px] hover:bg-[linear-gradient(0deg,_var(--tw-gradient-stops))] from-[rgba(200,189,228,.55)_0%] to-[rgba(96,81,81,0.1)_64%] hover:shadow-[inset_0px_3px_3.9px_-2px_#ffff,0px_10px_30px_-5px_#ECF0FF]"
                    >
                        {/* รูปของแต่ละ 1 ชุดข้อมูล */}
                        <img
                            src={data.img_src} // URL รูปภาพของข้อมูล
                            alt={data.img_alt} // คำอธิบายรูปภาพ
                            className="w-full h-auto object-cover rounded-[10px]" // CSS class สำหรับการจัดการรูป
                        />

                        {/* ส่วนของ detail */}
                        <div className="space-y-1">
                            {/* หัวเรื่องของแต่ละชุดข้อมูล */}
                            <h4 className="font-extrabold text-[#FFFFFF] break-words">{data.title}</h4>
                            {/* description ของแต่ละชุดข้อมูล */}
                            <p className="text-sm text-[#ECF0FF]">{data.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Modal แสดงรายละเอียด */}
            {openPopup && modalID !== null && ( // เงื่อนไขการแสดง Modal
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="rounded-lg max-w-[90vw] w-full relative">
                        {/* ปุ่มปิด Popup */}
                        <button
                            onClick={HandleRemovePopUp}
                            className="flex justify-end w-[100%] z-[60]"
                        >
                            <Image 
                                src={"./Close.svg"} // รูปไอคอนปิด
                                alt='close' // คำอธิบายรูป
                                width={50}
                                height={50}
                            />
                        </button>

                        {/* Swiper สำหรับแสดงภาพ */}
                        <Swiper
                            navigation // เปิดใช้งานปุ่มนำทาง
                            modules={[Navigation]} // นำ Navigation module มาใช้
                            spaceBetween={30} // ระยะห่างระหว่าง slide
                            slidesPerView={1} // แสดง 1 slide ต่อหน้า
                            className="w-full h-full"
                            initialSlide={portfolio_data.findIndex(item => item.id === modalID)} // เริ่มต้นที่ slide ตรงกับ modalID
                        >
                            {/* แสดงรูปภาพในแต่ละ slide */}
                            {portfolio_data.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div 
                                        className="overflow-y-auto h-[80vh] w-full" // จัดการ scroll ใน modal
                                        style={{scrollbarWidth:"none"}} // ซ่อน scrollbar
                                    >
                                        <Image
                                            src={item.poster} // URL รูปใน Swiper
                                            alt={item.img_alt} // คำอธิบายรูป
                                            width={800}
                                            height={1500}
                                            className="mx-auto rounded-lg"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
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
                    key={menu.name} // key สำหรับปุ่ม
                    className={`group/filter-btn cursor-pointer py-1 px-4 w-[125px] text-center
                        ${menu.category === Filter // เช็คว่าปุ่มนี้เป็นปุ่มที่ active อยู่มั้ย ถ้าใช่ (===) ให้ทำในส่วนด้านหลัง && (และ)
                        && "rounded-[10px] shadow-[inset_0px_3px_3.9px_-2px_#ffff,0px_10px_30px_-15px_#B2A9E7] bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[rgba(200,189,228,1)_0%] to-[rgba(255,255,255,0.5)_100%]"}`}
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
