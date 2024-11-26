'use client'

import Navbar from './components/navbar'
import Portfolio from './components/portfolio';
import Service from './components/service';
import './globals.css';


export default function Home() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <Navbar />

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="Home">
        <div className='text-center	my-48 text-[#ECF0FF]'>
          <h1
            className="font-bold animated-text-gradient"
          >
            "เปลี่ยนไอเดียของคุณให้กลายเป็น<br />
            เว็บไซต์ระดับมืออาชีพ!"
          </h1>
          <h5>เราพร้อมพัฒนาเว็บไซต์ เพื่อตอบโจทย์ความต้องการของคุณโดยเฉพาะ <br /> อย่าปล่อยให้ไอเดียของคุณเป็นแค่ความฝัน!</h5>
        </div>
        {/* <Projectslider/> */}
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="portfolio">
        <div className='max-w-full mx-[60px]'>
          <Portfolio />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="About">
        <div className="grid grid-cols-4 gap-12 max-w-full mx-[60px]">
          <div className="col-span-2 text-[#ECF0FF]">
            <h1 className="font-bold" >
              About us
            </h1>
            <span className="font-bold text-[1rem]">SCOLDEV</span>{" "}
            <span className="text-wrap text-[1rem]">เราคือผู้เชี่ยวชาญด้านการพัฒนาเว็บไซต์ สร้างสรรค์ให้ตรงตามความต้องการ และ ช่วยเสริมศักยภาพทางธุรกิจให้กับลูกค้า โดยมุ่งเน้นการพัฒนาเว็บไซต์ที่ สวยงาม ใช้งานง่าย และมีประสิทธิภาพ เพื่อสร้างความเชื่อมั่นแก่ผู้ใช้งานและแบรนด์ของคุณ เราให้ความสำคัญ ตั้งแต่การวิเคราะห์ความต้องการของลูกค้า ไปจนถึงการส่งมอบโซลูชันที่ตอบโจทย์ในทุกมิติ</span>
          </div>
          <div className='col-span-1'></div>

          <div
            className="gradient-border-mask p-8 text-right rounded-[20px] col-span-1   text-[#ECF0FF] bg-white/10 backdrop-blur-[30px]"
            style={{
              boxShadow: "0 25px 90px -30px rgba(236,240,255,0.41), inset 0 3px 3.9px -2px rgba(255,255,255,0.36)"
            }}
          >
            <h2 className="font-bold my-2 bg-gradient-to-br from-[#BDCBFD] to-[#E5D5FF] inline-block text-transparent bg-clip-text">Contact</h2>   {/*textgradient */}
            <h5 className="font-bold">063-874-0176</h5>
            <h5 className="font-bold break-words">scoldev101@gmail.com</h5>
          </div>
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}


      <section id="services">
        <div className='max-w-full mx-[60px]'>
          <Service />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}


      {/* <section id="member">
       {MemberData.map((data,i) => (
            <MemberDataList data={data} />
          ))}
       </section> */}

      {/* //////////////////////////////////////////////////////////////////////// */}

      {/* <section id="Enquiry">
        <Enquiry/>
       </section> */}


      {/* //////////////////////////////////////////////////////////////////////// */}


      {/* <Footer/> */}

    </div>
  );
}
