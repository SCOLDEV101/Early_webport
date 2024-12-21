'use client'

import Enquiry from './components/enquiry';
import Footer from './components/Footer';
import Navbar from './components/navbar'
import Order from './components/order';
import Portfolio from './components/portfolio';
import Service from './components/service';
import Member from './components/member';
import Link from "next/link";
import './globals.css';


export default function Home() {
  return (
    <div className="w-full flex flex-col overflow-x-hidden relative">
      {/* พื้นหลัง */}
    <div className='backguard-circleblue opacity-[.33] top-[-20%] left-[50%]'/>
    <div className='backguard-circleblue opacity-[.13] top-[15%] left-[30%]'/>
    <div className='backguard-circlestockgradient top-[30%] left-[50%]'/>
    <div className='backguard-circleblue opacity-[.09] top-[50%] left-[45%]'/>
    <div className='backguard-circleblue opacity-[.13] top-[75%] left-[60%]'/>
    <div className='backguard-circlewhite opacity-[.2] top-[5%] left-[-20%]'/>
    <div className='backguard-circlewhite opacity-[.2] top-[0%] left-[130%] '/>
       <Navbar />

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="Home" className="pt-[150px]">
        <div className='text-center	my-48 text-[#ECF0FF]'>
          <h1
            className="font-bold animated-text-gradient"
          >
            &quot;เปลี่ยนไอเดียของคุณให้กลายเป็น<br />
            เว็บไซต์ระดับมืออาชีพ!&quot;
          </h1>
          <h5 className='mb-14'>เราพร้อมพัฒนาเว็บไซต์ เพื่อตอบโจทย์ความต้องการของคุณโดยเฉพาะ <br /> อย่าปล่อยให้ไอเดียของคุณเป็นแค่ความฝัน!</h5>

          <Link href="#Enquiry" className="bg-gradient-to-r from-[#6580E1] to-[#5844D7] rounded-[10px] px-10 py-3 transition-shadow hover:shadow-[0px_4px_13.1px_0px_rgba(255,255,255,0.4),0px_10px_20px_-15px_rgba(236,240,255,1)]">
                    <span className="text-[1.25rem] text-[#ECF0FF] text-center font-bold">
                        Enquiry now
                    </span>
          </Link>
        </div>
        {/* <Projectslider/> */}
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="Portfolio" className="pt-[150px]">
        <div className='max-w-full mx-[160px]'>
          <Portfolio />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="About" className="pt-[150px]">
        <div className="flex flex-nowrap flex-row justify-between items-center gap-20 max-w-full mx-[160px]">
          <div className="text-[#ECF0FF]">
            <h1 className="font-bold">
              About us
            </h1>
            <p className="text-[1rem]"><span className="font-bold">SCOLDEV</span> เราคือผู้เชี่ยวชาญด้านการพัฒนาเว็บไซต์ สร้างสรรค์ให้ตรงตามความต้องการ และ
               ช่วยเสริมศักยภาพทางธุรกิจให้กับลูกค้า โดยมุ่งเน้นการพัฒนาเว็บไซต์ที่ สวยงาม ใช้งานง่าย
               และมีประสิทธิภาพ เพื่อสร้างความเชื่อมั่นแก่ผู้ใช้งานและแบรนด์ของคุณ เราให้ความสำคัญ
               ตั้งแต่การวิเคราะห์ความต้องการของลูกค้า ไปจนถึงการส่งมอบโซลูชันที่ตอบโจทย์ในทุกมิติ
            </p>{" "}
          </div>
          <div
            className="gradient-border-mask p-10 text-right rounded-[20px] w-[350px] text-[#ECF0FF] bg-white/10 backdrop-blur-[30px]"
            style={{
              boxShadow: "0 25px 90px -30px rgba(236,240,255,0.41), inset 0 3px 3.9px -2px rgba(255,255,255,0.36)"
            }}
          >
            <h2 className="my-2 bg-gradient-to-br from-[#BDCBFD] to-[#E5D5FF] inline-block text-transparent bg-clip-text font-[900]">
              Contact
            </h2> {/*textgradient */}
            <h5 className="font-bold">063-874-0176</h5>
            <h5 className="font-bold break-words">scoldev101@gmail.com</h5>
          </div>
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}


      <section id="services" className="pt-[150px]">
        <div className='max-w-full mx-[160px]'>
          <Service />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}


      <section id="member" className="pt-[150px]">
        <div className='max-w-full md:mx-[160px] mx-[50px]'>
          <Member />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="services" className="pt-[150px]">
        <div className='max-w-full mx-[160px]'>
          <Order />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="Enquiry" className="pt-[150px] mb-[150px]">
        <div className="max-w-full mx-[160px]">

          <Enquiry />
        </div>
      </section>


      {/* //////////////////////////////////////////////////////////////////////// */}


      <Footer/>

    </div>
  );
}