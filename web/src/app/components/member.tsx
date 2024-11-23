import React, { useEffect, useState } from 'react'
import { member_data } from '../constants/staticData'
import { IoClose } from "react-icons/io5";

type Props = {}

export default function Member({ }: Props) {
    const [openPopup, setOpenPopup] = useState(false);
    const [modalID, setModalID] = useState("");

    // function ในการปิด popup
    const HandleRemovePopUp = () => setOpenPopup(false);


    return (
        <>
            <div className="flex flex-row justify-between items-center px-3">
                {/* Header ของ section นี้ */}
                <h1 className="font-extrabold text-white">Our Team</h1>

                {/* Popup */}
                <PopUp openPopUp={openPopup} closePopUp={HandleRemovePopUp} modal_Id={modalID} />
            </div>

            {/* ส่วนแสดงผลข้อมูล member */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-8">
                {member_data.map((data, idx) => (
                    <div
                        key={idx}
                        className="w-full relative bg-transparent space-y-4 transition-shadow rounded-[10px]"
                        onClick={() => { setOpenPopup(true); setModalID(data.id); }} // setModalID ให้เป็น id ของ card ที่เรากด
                    >

                        {/* รูปบุคคล */}
                        <img
                            src={data.img_src}
                            alt={data.img_alt}
                            className={`w-full h-[450px] object-cover rounded-[11px] ${data.img_style}`}
                        />

                        {/* ตำแหน่ง กับ ชื่อ */}
                        <div className="space-y-1 absolute px-8 bottom-0 h-[150px] flex flex-col items-start justify-center rounded-b-[10px] w-full bg-[linear-gradient(0deg,_var(--tw-gradient-stops))] from-[rgba(28,29,43,1)] via-[rgba(88,68,215,.5)] to-[rgba(88,68,215,0)]">
                            <h4 className="font-extrabold text-[#FFFFFF] break-words w-full">{data.position}</h4>
                            <h5 className="text-[#ECF0FF] w-full">{data.name}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

const PopUp = ({ openPopUp, closePopUp, modal_Id }: any) => {

    // function ในการปิด popup สำหรับตอนกดที่ตัว ModalContainer
    const handlelosePopUp = (e: any) => {
        if (e.target.id === 'ModalContainer') {
            closePopUp();
        }
    }

    // ทำไว้ lock ตัว scrolling ของ body ของ website
    useEffect(() => {
        if (openPopUp) { // openPopUp === true
            document.body.classList.add('overflow-hidden'); // add class
        } else { // openPopUp === false
            document.body.classList.remove('overflow-hidden'); // remove class
        }
        // Cleanup เมื่อ component ถูก unmount
        return () => {
            document.body.classList.remove('overflow-hidden'); // remove class
        };
    }, [openPopUp]); // dependency

    if (!openPopUp) return null;



    return (
        // Modal container
        <div
            id='ModalContainer'
            onClick={handlelosePopUp}
            className='fixed z-50 inset-0 bg-black flex flex-col justify-start items-center bg-opacity-80 overflow-hidden'
        >

            {/* ปุ่มปิด popup */}
            <div className="w-full h-[100px] flex flex-row justify-end items-center px-4 z-20">
                <button
                    id='CloseButton'
                    type='button'
                    className="cursor-pointer w-[50px] h-[50px]"
                    onClick={() => closePopUp()}
                >
                    <IoClose className='text-white text-[2.5rem] cursor-pointer' />
                </button>
            </div>

            {/* ทำการ map data ของคนที่เรากด popup ขึ้นมาคนแรก */}
            {member_data.map(member => member.id === modal_Id && (
                <div key={modal_Id} className="relative flex flex-row flex-wrap justify-center gap-4 overflow-y-auto overflow-x-hidden pb-8 p-5 bg-gradient-to-t from-[#999999] to-[#FFFFFF] w-full">

                    {/* พื้นหลัง fade gradient สามอัน */}
                    <div className="absolute -z-[0] -top-[150px] -left-[200px] rounded-full blur-[140px]  w-[400px] h-[400px] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD]" />
                    <div className="absolute -z-[0] -top-[150px] -right-[200px] rounded-full blur-[140px]  w-[600px] h-[600px] bg-[linear-gradient(45deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD]" />
                    <div className="absolute -z-[0] top-[400px] left-[50px] rounded-full blur-[140px]  w-[800px] h-[800px] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD]" />

                    {/* == Section ทางด้านซ็าย == */}
                    <div className="p-1 w-fit h-fit rounded-[20px] bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[#E5D5FF] to-[#BDCBFD] z-10 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                        <div className="w-[400px] space-y-4 pt-8 pb-12 px-10 rounded-[20px] bg-[rgba(236,240,255,.96)]">

                            {/* รูปบุคคล */}
                            <img
                                src={member.img_src}
                                alt={member.img_alt}
                                className="w-[355px] h-[360px] object-cover rounded-[10px] shadow-[0_6px_4px_0_rgba(0,0,0,0.25)]"
                            />

                            {/* ต่ำแหน่ง กับ ชื่อ */}
                            <div className="">
                                <h4 className="font-extrabold text-[#453E72] text-center">{member.position}</h4>
                                <h5 className="text-[#16151D] text-center">{member.name}</h5>
                            </div>

                            {/* เส้นคั้น */}
                            <hr className='m-5 border-0 bg-gradient-to-r from-[#1E1E1E] via-[#5844D7] to-[#6580E1] p-[1.5px]' />

                            {/* เบอร์โทร กับ อีเมล */}
                            <div className="px-5 space-y-1">
                                <h5 className="text-[#453E72] font-normal">{member.tel}</h5>

                                {/* email แบบกดส่งเมลได้เลย */}
                                <h5 className="text-[#453E72] underline underline-offset-1 font-normal break-words w-full">
                                    <a href={"mailto:" + member.email}>
                                        {member.email}
                                    </a>
                                </h5>
                            </div>
                        </div>
                    </div>

                    {/* == Section ทางด้านขวา == */}
                    <div className="w-[650px] space-y-8 py-8 px-10 rounded-[10px] bg-[rgba(255,255,255,.25)] z-10">

                        {/* หัวเรื่อง (Skills) */}
                        <div className="-space-y-1">
                            <h3 className="w-fit font-bold bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[#1E1E1E] via-[#5844D7] to-[#6580E1] bg-clip-text text-transparent">Skills</h3>
                            <hr className='m-0 border-0 bg-gradient-to-r from-[#1E1E1E] via-[#5844D7] to-[#6580E1] p-[1.2px] w-[14%]' />
                        </div>

                        {/* ส่วนแสดงผลสำหรับ skill ของแต่ละคน */}
                        <div className="grid grid-cols-2 space-y-2">
                            {member.skills.map((skill, idx) => (
                                <div key={idx} className="w-[100px] h-[50px] flex flex-row gap-4">
                                    <img src={skill.skill_icon} alt={skill.skill_title} className="h-2/3" />
                                    <h5 className="font-medium">{skill.skill_title}</h5>
                                </div>
                            ))}
                        </div>

                        {/* หัวเรื่อง (Certificates) */}
                        {member.certificates.length > 0 && (
                            <>
                                <div className="-space-y-1" >
                                    <h3 className="w-fit font-bold bg-[linear-gradient(90deg,_var(--tw-gradient-stops))] from-[#1E1E1E] via-[#5844D7] to-[#6580E1] bg-clip-text text-transparent">Certificates</h3>
                                    <hr className='m-0 border-0 bg-gradient-to-r from-[#1E1E1E] via-[#5844D7] to-[#6580E1] p-[1.2px] w-[28%]' />
                                </div>

                                {/* ส่วนแสดงผลของ Certificate ของแต่ละคน*/}
                                {member.certificates.map((cert, idx) => (
                                    <CertificateCard key={idx} cert_data={cert} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            ))
            }
        </div >
    )
}

// Type ของ Certificate
type CertData = {
    cert_img: string,
    cert_title: string,
    cert_category: string[],
    cert_reward: string,
}
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
                <h5 className="text-[#16151D] font-bold break-words w-full">{cert_data.cert_title}</h5>
                <h5 className="text-[#16151D] break-words w-full">
                    {/* join array แล้วคั่นแต่ละ element ด้วย (,) */}
                    {cert_data.cert_category.join(", ")}
                </h5>
                <h5 className="text-[#16151D] break-words w-full">{cert_data.cert_reward}</h5>
            </div>
        </div>
    )
}