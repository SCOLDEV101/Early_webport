import React, { useState } from 'react'


const step_order = [
    {
        title: "ส่งรายละเอียด",
        img: "/order/1-form.svg",
        img_size: {
            w: "600px",
            h: "auto",
        },
        alt: "1-form",
        desc: {
            title: "กรอกแบบฟอร์ม หรือ ส่งข้อมูลรายละเอียดงานมาที่อีเมล <br/> Scoldev001@gmail.com",
            sub: "",
        }
    },
    {
        title: "ยืนยันการสั่งงาน",
        img: "/order/2-confirm.svg",
        img_size: {
            w: "500px",
            h: "auto",
        },
        alt: "2-confirm",
        desc: {
            title: "เราประเมินงานและจัดส่งใบเสนอราคา พร้อมขอบเขตงาน (Scope) <br/> ให้พิจารณาตกลงเงื่อนไขและชำระเงินงวดแรกเพื่อเริ่มงาน",
            sub: "",
        }
    },
    {
        title: "ดำเนินงาน",
        img: "/order/3-update.svg",
        img_size: {
            w: "650px",
            h: "auto",
        },
        alt: "3-update",
        desc: {
            title: "ทีมงานเริ่มดำเนินการและอัปเดตความคืบหน้า <br/> ลูกค้าสามารถแจ้งแก้ไขได้ตามที่ตกลงไว",
            sub: "",
        }
    },
    {
        title: "ส่งมอบงาน",
        img: "/order/4-check.svg",
        img_size: {
            w: "600px",
            h: "auto",
        },
        alt: "4-check",
        desc: {
            title: "เมื่องานเสร็จสมบูรณ์ เราส่งมอบงานทั้งหมดให้ พร้อมชำระเงินส่วนที่เหลือ",
            sub: "*บริการหลังการขาย: เรามีบริการดูแลและบำรุงรักษาเว็บไซต์ เช่น การปรับปรุงข้อมูล <br/> แก้ไขข้อบกพร่อง หรืออัปเดตฟีเจอร์เล็ก ๆ ในระยะเวลาที่กำหนด",
        }
    },
]



export default function Order() {
    const [stepSelected, setStepSelected] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const handleStepChange = (idx: number) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setStepSelected(idx);
            setIsTransitioning(false);
        }, 300); // ระยะเวลา transition
    };

    return (
        <div className="grid grid-cols-3 pb-32">
            <div className="col-span-1">
                <h1 className="text-[#ECF0FF] font-extrabold mb-6">How to Order</h1>
                <div className="w-[200px]">
                    <ul className="flex flex-col gap-6">
                        {step_order.length > 0 && step_order.map((step, idx) => (
                            <li
                                key={idx}
                                onClick={() => handleStepChange(idx)}
                                className={`w-full cursor-pointer py-1 rounded-full text-center ${stepSelected === idx
                                    ? "bg-[rgba(236,240,255,1)] shadow-[0px_4px_13px_0px_rgba(255,255,255,.2),0px_10px_30px_-15px_rgba(236,240,255,.9)]"
                                    : "bg-[rgba(236,240,255,0.01)] shadow-[inset_0px_3px_3.9px_-2px_rgba(255,255,255,.5),inset_0px_-14px_33.2px_-10px_rgba(200,189,228,.33)] hover:shadow-[0px_4px_13px_0px_rgba(255,255,255,.3),0px_10px_30px_-15px_rgba(236,240,255,.9),inset_0px_3px_3.9px_-2px_rgba(255,255,255,.9),inset_0px_-14px_33.2px_-2px_rgba(200,189,228,.9)]"
                                    }
                                    transition-all duration-300`}
                                style={{
                                    marginLeft: `calc(${idx} * 3rem)`,
                                }}
                            >
                                <h3
                                    className={`text-[20px] font-bold ${stepSelected === idx
                                        ? "bg-[linear-gradient(-97deg,_var(--tw-gradient-stops))] from-[#5844D7] to-[#6580E1]"
                                        : "bg-opacity-[0.1] bg-[linear-gradient(-97deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD]"
                                        } bg-clip-text text-transparent`}
                                >
                                    {step.title}
                                </h3>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-span-2 relative">
                <img
                    src={step_order[stepSelected].img}
                    alt={step_order[stepSelected].alt}
                    width={step_order[stepSelected].img_size.w}
                    height={step_order[stepSelected].img_size.h}
                    className={`absolute ${stepSelected === 1 ? "top-[-150px]" : "top-[-110px]"} right-32 transition-opacity duration-300 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}
                />
                <div className="absolute -bottom-[50px] w-full text-end pe-[14rem]">
                    {step_order[stepSelected].desc.title && (
                        <h6
                            className="text-white font-bold [text-shadow:_0_10px_30px_rgba(236_240_255_/_0.9)]"
                            dangerouslySetInnerHTML={{
                                __html: step_order[stepSelected].desc.title,
                            }}
                        ></h6>
                    )}
                    {step_order[stepSelected].desc.sub && (
                        <p
                            className="text-white font-thin"
                            dangerouslySetInnerHTML={{
                                __html: step_order[stepSelected].desc.sub,
                            }}
                        ></p>
                    )}

                </div>
            </div>
        </div>
    );
}
