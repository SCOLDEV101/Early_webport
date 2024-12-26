import Image from "next/image";
import React, { useState, useEffect } from "react";
import { member_data } from "../constants/staticData"; // Import ข้อมูล member
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import CSS ของ Swiper
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../globals.css";
type Props = object;

import { Navigation } from "swiper/modules"; // Import Module Navigation ของ Swiper

export default function Member({}: Props) {
  const [openPopup, setOpenPopup] = useState(false); // State สำหรับควบคุมการเปิด/ปิด popup
  const [modalID, setModalID] = useState(""); // State สำหรับเก็บ ID ของ card ที่ถูกคลิก
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State สำหรับตรวจสอบขนาดหน้าจอ

  useEffect(() => {
    // ฟังก์ชันสำหรับตรวจสอบขนาดหน้าจอ
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 845);
    };

    // ตรวจสอบขนาดจอเมื่อคอมโพเนนต์โหลดครั้งแรก
    handleResize();

    // ฟังค์ชันรีไซส์เมื่อมีการเปลี่ยนแปลงขนาดจอ
    window.addEventListener("resize", handleResize);

    // ลบ event listener เมื่อคอมโพเนนต์ unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ฟังก์ชันสำหรับปิด popup
  const HandleRemovePopUp = () => setOpenPopup(false);

  return (
    <>
      <div className="flex flex-row justify-between items-center px-3">
        {/* Header ของ section นี้ */}
        <h2 className="font-extrabold text-white">Our Team</h2>
      </div>

      <div className="my-8">
        {isSmallScreen ? (
          // ใช้ Swiper สำหรับหน้าจอเล็ก
          <>
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={2} // 1 card ต่อหน้า
              style={{ paddingBottom: "35px" }}
            >
              {member_data.map((data, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className="w-full relative bg-transparent space-y-4 transition-shadow rounded-[10px] hover:shadow-[0px_4px_13px_0px_rgba(255,255,255,.3),0px_10px_30px_-15px_rgba(236,240,255,.9),inset_0px_3px_4px_-2px_rgba(255,255,255,1),inset_0px_-14px_33.2px_-2px_rgba(200,189,228,.9)]"
                    onClick={() => {
                      setOpenPopup(true);
                      setModalID(data.id);
                    }}
                  >
                    <img
                      src={data.img_src}
                      alt={data.img_alt}
                      className="w-full h-[300px] object-cover rounded-[10px]"
                    />
                    <div className="space-y-1 absolute px-4 bottom-0 h-[100px] flex flex-col items-start justify-center rounded-b-[10px] w-full bg-[linear-gradient(0deg,_var(--tw-gradient-stops))] from-[rgba(28,29,43,1)] via-[rgba(88,68,215,.5)] to-[rgba(88,68,215,0)]">
                      <p className="font-extrabold text-[#FFFFFF] text-[0.75rem] break-words w-full">
                        {data.position}
                      </p>
                      <p className="text-[#ECF0FF] text-[0.75rem] w-full">
                        {data.name}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Popup แสดงรายละเอียดสมาชิก */}
            {openPopup && modalID !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div className="rounded-lg max-w-[85vw] h-[55vh] w-full relative">
                  {/* ปุ่มปิด popup */}
                  <button
                    onClick={HandleRemovePopUp}
                    className="flex justify-end w-[100%] z-[60]"
                  >
                    <Image
                      src="./Close.svg"
                      alt="close"
                      width={40}
                      height={40}
                    />
                  </button>

                  {/* Swiper สำหรับแสดงรายละเอียด */}
                  <Swiper
                    navigation
                    modules={[Navigation]} // ใช้ module Navigation
                    spaceBetween={30} // ระยะห่างระหว่าง slides
                    slidesPerView={1} // จำนวน slides ที่แสดงต่อหน้าจอ
                    className="w-full h-full"
                    initialSlide={member_data.findIndex(
                      (item) => item.id === modalID // กำหนด slide เริ่มต้นตาม id ที่ถูกคลิก
                    )}
                  >
                    {member_data.map((item) => (
                      <SwiperSlide key={item.id}>
                        <div className="flex justify-center h-[55vh]">
                          {/* Card รายละเอียดของสมาชิก */}
                          <div
                            className="relative flex flex-row flex-wrap justify-center gap-4 pt-4 w-[60vw] bg-gradient-to-t from-[#999999] to-[#FFFFFF] overflow-y-auto overflow-x-hidden rounded-[10px]"
                            style={{ scrollbarWidth: "none" }} // ซ่อน scrollbar
                          >
                            {/* Effect Gradient Background */}
                            <div className="absolute -z-[0] -top-[10%] -left-[5%] rounded-full blur-[140px]  w-[25vw] h-[25vw] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD]" />
                            <div className="absolute -z-[0] -top-[15%] -right-[20%] rounded-full blur-[140px]  w-[40vw] h-[40vw] bg-[linear-gradient(45deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD]" />
                            <div className="absolute -z-[0] top-[30%] left-[5%] rounded-full blur-[140px]  w-[35vw] h-[35vw] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD]" />

                            <div className="w-fit h-fit rounded-[20px] bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD] z-10 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                              <div className="max-w-[50vw] space-y-4 pt-8 pb-8 px-6 rounded-[20px] bg-[rgba(236,240,255,.96)]">
                                {/* รูปบุคคล */}
                                <img
                                  src={item.img_src}
                                  alt={item.img_alt}
                                  className="w-[40vw] h-[45vw] object-cover rounded-[10px] shadow-[0_6px_4px_0_rgba(0,0,0,0.25)]"
                                />
                                {/* ตำแหน่งและชื่อ */}
                                <div>
                                  <h6 className="font-extrabold text-[#453E72] text-center">
                                    {item.position}
                                  </h6>
                                  <p className="text-[#16151D] text-center">
                                    {item.name}
                                  </p>
                                  <hr className="m-0 my-2 border-0 bg-gradient-to-r from-[#1E1E1E] via-[#5844D7] to-[#6580E1] p-[1.2px] w-[40vw]" />
                                  <p className="text-[#453E72] text-[0.75rem] text-center break-words">
                                    {item.email}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* (Skills & Certificates) */}
                            <div className="w-[50vw] my-12 space-y-8 py-8 px-5 rounded-[10px] bg-[rgba(255,255,255,.25)] z-10">
                              {/* Skills */}
                              <div className="-space-y-1">
                                <h3 className="w-fit font-bold bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[#1E1E1E] via-[#5844D7] to-[#6580E1] bg-clip-text text-transparent">
                                  Skills
                                </h3>
                                <hr className="m-0 border-0 bg-gradient-to-r from-[#1E1E1E] via-[#5844D7] to-[#6580E1] p-[1.2px] w-[14%]" />
                              </div>

                              {/* Skills List */}
                              <div className="grid grid-cols-1 space-y-8">
                                {item.skills.map((skill, idx) => (
                                  <div
                                    key={idx}
                                    className="text-start w-[20vw] h-[5vw] flex flex-row gap-4"
                                  >
                                    <img
                                      src={skill.skill_icon}
                                      alt={skill.skill_title}
                                      className="w-fit max-w-[24px] h-full mt-1"
                                    />
                                    <h5 className="font-medium">
                                      {skill.skill_title}
                                    </h5>
                                  </div>
                                ))}
                              </div>

                              {/* Certificates */}
                              {item.certificates.length > 0 && (
                                <>
                                  <div className="-space-y-1">
                                    <h3 className="w-fit font-bold bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[#1E1E1E] via-[#5844D7] to-[#6580E1] bg-clip-text text-transparent">
                                      Certificates
                                    </h3>
                                    <hr className="m-0 border-0 bg-gradient-to-r from-[#1E1E1E] via-[#5844D7] to-[#6580E1] p-[1.2px] w-[28%]" />
                                  </div>
                                  {/* Certificates List */}
                                  {item.certificates.map((cert, idx) => (
                                    <CertificateCard
                                      key={idx}
                                      cert_data={cert}
                                    />
                                  ))}
                                </>
                              )}
                            </div>

                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {member_data.map((data, idx) => (
                <div
                  key={idx}
                  className="w-full relative bg-transparent space-y-4 transition-shadow rounded-[10px] hover:shadow-[0px_4px_13px_0px_rgba(255,255,255,.3),0px_10px_30px_-15px_rgba(236,240,255,.9),inset_0px_3px_4px_-2px_rgba(255,255,255,1),inset_0px_-14px_33.2px_-2px_rgba(200,189,228,.9)]"
                  onClick={() => {
                    setOpenPopup(true);
                    setModalID(data.id);
                  }}
                >
                  <img
                    src={data.img_src}
                    alt={data.img_alt}
                    className="w-full h-[400px] object-cover rounded-[10px]"
                  />
                  <div className="space-y-1 absolute px-8 bottom-0 h-[150px] flex flex-col items-start justify-center rounded-b-[10px] w-full bg-[linear-gradient(0deg,_var(--tw-gradient-stops))] from-[rgba(28,29,43,1)] via-[rgba(88,68,215,.5)] to-[rgba(88,68,215,0)]">
                    <h5 className="font-extrabold text-[#FFFFFF] break-words w-full">
                      {data.position}
                    </h5>
                    <h5 className="text-[#ECF0FF] w-full">{data.name}</h5>
                  </div>
                </div>
              ))}
            </div>
            {/* Popup แสดงรายละเอียดสมาชิก */}
            {openPopup && modalID !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div className="rounded-lg max-w-[90vw] h-[90vh] w-full relative">
                  {/* ปุ่มปิด popup */}
                  <button
                    onClick={HandleRemovePopUp}
                    className="flex justify-end w-[100%] z-[60]"
                  >
                    <Image
                      src="./Close.svg"
                      alt="close"
                      width={50}
                      height={50}
                    />
                  </button>

                  {/* Swiper สำหรับแสดงรายละเอียด */}
                  <Swiper
                    navigation
                    modules={[Navigation]} // ใช้ module Navigation
                    spaceBetween={30} // ระยะห่างระหว่าง slides
                    slidesPerView={1} // จำนวน slides ที่แสดงต่อหน้าจอ
                    className="w-full h-full"
                    initialSlide={member_data.findIndex(
                      (item) => item.id === modalID // กำหนด slide เริ่มต้นตาม id ที่ถูกคลิก
                    )}
                  >
                    {member_data.map((item) => (
                      <SwiperSlide key={item.id}>
                        <div className="flex justify-center h-[80vh]">
                          {/* Card รายละเอียดของสมาชิก */}
                          <div
                            className="relative flex flex-row flex-wrap justify-center gap-4 pb-8 px-8 w-fit bg-gradient-to-t from-[#999999] to-[#FFFFFF] overflow-y-auto overflow-x-hidden rounded-[10px]"
                            style={{ scrollbarWidth: "none" }} // ซ่อน scrollbar
                          >
                            {/* Effect Gradient Background */}
                            <div className="absolute -z-[0] -top-[10%] -left-[5%] rounded-full blur-[140px]  w-[25vw] h-[25vw] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD]" />
                            <div className="absolute -z-[0] -top-[15%] -right-[20%] rounded-full blur-[140px]  w-[40vw] h-[40vw] bg-[linear-gradient(45deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD]" />
                            <div className="absolute -z-[0] top-[30%] left-[5%] rounded-full blur-[140px]  w-[35vw] h-[35vw] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD]" />

                            {/* Section ซ้าย (รูปและข้อมูลพื้นฐาน) */}
                            <div className="p-1 w-fit mt-12 h-fit rounded-[20px] bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD] z-10 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                              <div className="max-w-[20vw] space-y-4 pt-8 pb-12 px-6 rounded-[20px] bg-[rgba(236,240,255,.96)]">
                                {/* รูปบุคคล */}
                                <img
                                  src={item.img_src}
                                  alt={item.img_alt}
                                  className="w-[20vw] h-[20vw] object-cover rounded-[10px] shadow-[0_6px_4px_0_rgba(0,0,0,0.25)]"
                                />
                                {/* ตำแหน่งและชื่อ */}
                                <div>
                                  <h4 className="font-extrabold text-[#453E72] text-center">
                                    {item.position}
                                  </h4>
                                  <h5 className="text-[#16151D] text-center">
                                    {item.name}
                                  </h5>
                                  <hr className="m-0 my-2 mx-auto border-0 bg-gradient-to-r from-[#1E1E1E] via-[#5844D7] to-[#6580E1] p-[1.2px] w-[15vw]" />
                                  <p className="text-[#453E72] text-[0.75rem] text-center break-words">
                                    {item.email}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Section ขวา (Skills & Certificates) */}
                            <div className="max-w-[30vw] min-w-[475px] mt-12 space-y-8 py-8 px-10 rounded-[10px] bg-[rgba(255,255,255,.25)] z-10">
                              {/* Skills */}
                              <div className="-space-y-1">
                                <h3 className="w-fit font-bold bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[#1E1E1E] via-[#5844D7] to-[#6580E1] bg-clip-text text-transparent">
                                  Skills
                                </h3>
                                <hr className="m-0 border-0 bg-gradient-to-r from-[#1E1E1E] via-[#5844D7] to-[#6580E1] p-[1.2px] w-[14%]" />
                              </div>

                              {/* Skills List */}
                              <div className="grid grid-cols-2 space-y-2">
                                {item.skills.map((skill, idx) => (
                                  <div
                                    key={idx}
                                    className="w-[5vw] h-[3vw] flex flex-row gap-4"
                                  >
                                    <img
                                      src={skill.skill_icon}
                                      alt={skill.skill_title}
                                      className="h-2/3"
                                    />
                                    <h5 className="font-medium">
                                      {skill.skill_title}
                                    </h5>
                                  </div>
                                ))}
                              </div>

                              {/* Certificates */}
                              {item.certificates.length > 0 && (
                                <>
                                  <div className="-space-y-1">
                                    <h3 className="w-fit font-bold bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[#1E1E1E] via-[#5844D7] to-[#6580E1] bg-clip-text text-transparent">
                                      Certificates
                                    </h3>
                                    <hr className="m-0 border-0 bg-gradient-to-r from-[#1E1E1E] via-[#5844D7] to-[#6580E1] p-[1.2px] w-[28%]" />
                                  </div>
                                  {/* Certificates List */}
                                  {item.certificates.map((cert, idx) => (
                                    <CertificateCard
                                      key={idx}
                                      cert_data={cert}
                                    />
                                  ))}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
// Type ของ Certificate
type CertData = {
  cert_img: string;
  cert_title: string;
  cert_category: string[];
  cert_reward: string;
};
const CertificateCard = ({ cert_data }: { cert_data: CertData }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-fit h-fit bg-gradient-to-r from-[#1E1E1E] via-[#5844D7] to-[#6580E1] p-[3px] rounded-[10px]">
        {/* รูปใบ cert */}
        <img
          src={cert_data.cert_img}
          alt={cert_data.cert_title}
          className="rounded-[8px] w-[280px] h-[150px] object-cover object-center"
        />
      </div>

      {/* Detail เกี่ยวกับใบ cert */}
      <div className="w-full">
        <h5 className="text-[#16151D] font-bold break-words w-full">
          {cert_data.cert_title}
        </h5>
        <h5 className="text-[#16151D] break-words w-full">
          {/* join array แล้วคั่นแต่ละ element ด้วย (,) */}
          {cert_data.cert_category.join(", ")}
        </h5>
        <h5 className="text-[#16151D] break-words w-full">
          {cert_data.cert_reward}
        </h5>
      </div>
    </div>
  );
};
