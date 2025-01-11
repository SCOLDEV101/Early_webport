'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import './globals.css';
import dynamic from "next/dynamic";

const Enquiry = dynamic(() => import('./components/enquiry'), { ssr: false })
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const Navbar = dynamic(() => import('./components/navbar'), { ssr: false })
const Order = dynamic(() => import('./components/order'))
const Portfolio = dynamic(() => import('./components/portfolio'), { ssr: false })
const Service = dynamic(() => import('./components/service'), { ssr: false })
const Member = dynamic(() => import('./components/member'), { ssr: false })


export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col overflow-x-hidden relative">
      {/* พื้นหลัง */}
      <div className='backguard-circleblue opacity-[.33] top-[-20%] left-[50%]' />
      <div className='backguard-circleblue opacity-[.13] top-[15%] left-[30%]' />
      <div className='md:backguard-circlestockgradient top-[30%] left-[50%]' />
      <div className='backguard-circleblue opacity-[.09] top-[50%] left-[45%]' />
      <div className='backguard-circleblue opacity-[.13] top-[75%] left-[60%]' />
      <div className='backguard-circlewhite opacity-[.2] top-[5%] left-[-20%]' />
      <div className='backguard-circlewhite opacity-[.2] top-[0%] left-[130%] ' />
      <Navbar activeSection={activeSection} />

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="home" className="pt-[150px] max-w-[100vw]">
        <div className='max-w-full sm:mx-[160px] mx-[20px] w-auto text-center	my-20 text-[#ECF0FF]'>
          <h3
            className="md:text-[3.5rem] font-bold animated-text-gradient"
          >
            &quot;เปลี่ยนไอเดียของคุณให้กลายเป็นเว็บไซต์ระดับมืออาชีพ!&quot;
          </h3>
          <h6 className='md:text-[1.25rem] mb-10 md:mb-14'>เราพร้อมพัฒนาเว็บไซต์ เพื่อตอบโจทย์ความต้องการของคุณโดยเฉพาะ อย่าปล่อยให้ไอเดียของคุณเป็นแค่ความฝัน!</h6>

          <Link href="#enquiry" className="bg-gradient-to-r from-[#6580E1] to-[#5844D7] rounded-[15px] px-10 md:px-10 py-3 transition-shadow hover:shadow-[0px_4px_13.1px_0px_rgba(255,255,255,0.4),0px_10px_20px_-15px_rgba(236,240,255,1)]">
            <span className="text-[1rem] md:text-[1.25rem] text-[#ECF0FF] text-center font-bold">
              Enquiry now
            </span>
          </Link>
          <div className="flex justify-center items-center mt-20">
            <a href="#portfolio">
              <img
                src="./arrow-dropdown.svg"
                alt="arrow-dropdown"
                style={{ width: '62px', height: 'auto' }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="portfolio" className="pt-[150px] max-w-[100vw]">
        <div className='max-w-full sm:mx-[160px] mx-[20px] w-auto min-h-[1000px]'>
          <Portfolio />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="about" className="pt-[150px] max-w-[100vw]">
        <div className="flex flex-wrap md:flex-nowrap flex-row justify-between items-center gap-20 max-w-full sm:mx-[160px] mx-[20px] w-auto">
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
            className="gradient-border-mask p-8 md:p-10 text-right rounded-[20px] w-[350px] text-[#ECF0FF] bg-white/10 backdrop-blur-[30px]"
            style={{
              boxShadow: "0 25px 90px -30px rgba(236,240,255,0.41), inset 0 3px 3.9px -2px rgba(255,255,255,0.36)"
            }}
          >
            <h3 className="md:text-[2.5rem] my-1 md:my-2 bg-gradient-to-br from-[#BDCBFD] to-[#E5D5FF] inline-block text-transparent bg-clip-text font-[900]">
              Contact
            </h3>
            <h6 className="md:text-[1.25rem] font-bold">063-874-0176</h6>
            <h6 className="md:text-[1.25rem] font-bold break-words">scoldev101@gmail.com</h6>
          </div>
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}


      <section id="services" className="pt-[150px] max-w-[100vw]">
        <div className='max-w-full sm:mx-[160px] mx-[20px] w-auto'>
          <Service />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}


      <section id="member" className="pt-[150px] max-w-[100vw]">
        <div className='max-w-full sm:mx-[160px] mx-[20px] w-auto'>
          <Member />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="order" className="pt-[150px] max-w-[100vw]">
        <div className='max-w-full sm:mx-[160px] mx-[20px] min-h-[900px]'>
          <Order />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}

      <section id="enquiry" className="pt-[150px] max-sm:pt-0 mb-[150px] max-w-[100vw]">
        <div className="max-w-full sm:mx-[160px] mx-[20px] w-auto">
          <Enquiry />
        </div>
      </section>

      {/* //////////////////////////////////////////////////////////////////////// */}


      <Footer />

    </div>
  );
}