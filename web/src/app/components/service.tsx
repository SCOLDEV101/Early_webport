import React from 'react';
import Image from 'next/image';
import { service_data } from '../constants/staticData'; // นำเข้าข้อมูลของบริการจากไฟล์ staticData

export default function Service() {
  return (
    <>
      {/* หัวข้อหลักของส่วนนี้ */}
      <h2 className="font-bold text-white">Services</h2>

      {/* แสดงรายการบริการในรูปแบบ Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 shadow-[0_25px_90px_-30px_rgba(236,240,255,0.41)] bg-white"
      >
        {/* วนลูปแสดงข้อมูลบริการแต่ละรายการ */}
        {service_data.map((data, idx) => (
          <div
            key={idx} // กำหนด key สำหรับแต่ละรายการเพื่อช่วยในการจัดการ Virtual DOM
            className="relative"
          >
            {/* แสดงภาพของบริการ */}
            <Image
              src={data.img_src} // URL ของภาพ
              alt={data.img_alt} // คำอธิบายภาพสำหรับ SEO และการเข้าถึง
              width={1000} // ความกว้างของภาพ
              height={400} // ความสูงของภาพ
              className="object-cover" // กำหนดรูปแบบการครอบภาพให้เหมาะสม
              priority // โหลดภาพนี้ก่อนเพื่อปรับปรุงประสิทธิภาพการแสดงผล
            />

            {/* คอนเทนต์ซ้อนทับบนภาพ */}
            <div
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* ชื่อบริการที่จะแสดงบนภาพ */}
              <h3
                className="font-extrabold inline-block text-transparent bg-clip-text text-center break-words whitespace-pre-wrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                style={{
                  background: `linear-gradient(${data.text_gradient})`, // ใช้ gradient จากข้อมูล
                  display: 'inline-block', // แสดงผลเป็นบล็อกอินไลน์
                  color: 'transparent', // ทำให้ข้อความโปร่งใส เพื่อใช้กับ background-clip
                  WebkitBackgroundClip: 'text', // ทำให้ข้อความตัดตาม gradient
                  backgroundClip: 'text', // สำหรับเบราว์เซอร์ที่รองรับ CSS มาตรฐาน
                }}
              >
                {data.title} {/* ชื่อของบริการ */}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
