import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'


type Form_Data_Type = {
    name: string;
    organize: string;
    email: string;
    phone: string;
    files: File[];
    project_name: string;
    project_type: string;
    project_content: string;
    color: string;
    etc: string;
    [key: string]: any;
}

type Form_Data_Type_Keys = keyof Form_Data_Type;

const Form_Data: Form_Data_Type = {
    name: "",
    organize: "",
    email: "",
    phone: "",
    files: [],
    project_name: "โปรเจกต์ของฉัน",
    project_type: "",
    project_content: "",
    color: "",
    etc: "",
}

type Enquiry_Props = {}

export default function Enquiry({ }: Enquiry_Props) {

    const [data, setData] = useState(Form_Data)
    const [submitLoading, setSubmitLoading] = useState(false);
    const [processBar, setProcessBar] = useState(0)

    const handlerInputChanged = (key: any, value: any) => {
        setData((prev) => {
            return { ...prev, [key]: value };
        });
    }

    const sendEmail = ({ data }: { data: Form_Data_Type }) => {
        setSubmitLoading(true);

        // กำหนดเนื้อหาของเมลในตัวแปร
        const emailData = {
            sender: {
                name: "My App",
                address: "pacharapolpacharapol2547@gmail.com",
            },
            receipients: [
                {
                    name: "TEST1888",
                    address: "65010673@kmitl.ac.th",
                },
            ],
            subject: "Welcome to our website",
            message: `User Information: ${JSON.stringify(data)}`, // ส่งข้อมูลฟอร์มในข้อความ
        };

        fetch("/api/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData), // ส่งข้อมูลเป็น JSON
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
            .finally(() => setSubmitLoading(false));
    };

    const submitForm = () => {
        // submit your form data here
        sendEmail({data});
        console.log(data);
    }

    const Enquiry_Form_component = [
        <UserInformation data={data} handlerInputChanged={handlerInputChanged} />,
        <ProjectInformation data={data} handlerInputChanged={handlerInputChanged} />,
        <Thanks data={data} />,
    ];

    const {
        currentStep,
        currentComponent,
        changedSteps,
        isLastStep,
    } = useForm(Enquiry_Form_component);


    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div>
                <h1 className="text-[rgba(88,68,215,1)] font-extrabold text-center">
                    Enquiry Form
                </h1>
                <h5 className="text-[#ECF0FF] font-light text-center">
                    กรอกข้อมูล และเป้าหมายของคุณ <br /> เพื่อให้เราสามารถออกแบบเว็บไซต์ที่ตรงตามความต้องการของคุณได้อย่างสมบูรณ์
                </h5>
            </div>
            <div className="grid grid-cols-2 w-full mb-5 space-x-5">
                <div>
                    <h5 className='bg-gradient-to-r from-[rgba(101,128,225,1)] to-[rgba(88,68,215,1)] bg-clip-text text-transparent font-bold'>1. User Information</h5>
                    <div>
                        <div className='bg-gradient-to-t from-[rgba(101,128,225,1)]/50 to-[rgba(88,68,215,1)]/50 h-[0.3rem] rounded-full overflow-hidden'>
                            <div className='bg-gradient-to-t from-[rgba(101,128,225,1)] to-[rgba(88,68,215,1)] flex justify-center items-center h-full text-xs text-white font-bold'
                                style={{
                                    width: `${processBar}%`,
                                    transition: 'width 0.5s ease-in-out'
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h5 className='bg-gradient-to-r from-[rgba(101,128,225,1)] to-[rgba(88,68,215,1)] bg-clip-text text-transparent font-bold'>2. Project Information</h5>
                    <div>
                        <div className='bg-gradient-to-t from-[rgba(101,128,225,1)]/50 to-[rgba(88,68,215,1)]/50 h-[0.3rem] rounded-full overflow-hidden'>
                            <div className='bg-gradient-to-t from-[rgba(101,128,225,1)] to-[rgba(88,68,215,1)] flex justify-center items-center w-[0%] h-full text-xs text-white font-bold' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-fit px-10 py-11 rounded-[14px] bg-[rgba(236,240,255,0.05)] shadow-[inset_0_3px_3.9px_-2px_rgba(255,255,255,0.25),_inset_0_-14px_33.2px_-2px_rgba(200,189,228,.33)]">
                <form className="w-full space-y-6">
                    {currentComponent}
                    <div className={`flex flex-row ${currentStep === 2 ? "justify-center" : "justify-between"}  items-center`}>
                        {currentStep === 2 ? (
                            <button
                                type="button"
                                onClick={(e) => {
                                    setData(Form_Data);
                                    changedSteps(0, e);
                                }}
                                className="h5 mt-12 px-8 py-3 font-bold rounded-[14px] bg-gradient-to-bl from-[rgba(88,68,215,1)] to-[rgba(101,128,225,1)] text-[#ECF0FF] shadow-[0_3px_4px_2px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_8px_2px_rgba(236,240,255,1)]"
                            >
                                กรอกฟอร์มอีกครั้ง
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        changedSteps(currentStep - 1, e);
                                        setProcessBar(0);
                                    }}
                                    className={`h5 ${currentStep === 0 && "opacity-0"} px-12 py-3 font-bold rounded-[14px] text-[rgba(88,68,215,1)] bg-[rgba(255,255,255,1)] hover:shadow-[0_4px_8px_rgba(101,128,225,1)]`}
                                >
                                    Back
                                </button>
                                <button
                                    type={"button"}
                                    onClick={(e) => {
                                        if (isLastStep) submitForm();
                                        changedSteps(currentStep + 1, e)
                                        setProcessBar(100)
                                    }}
                                    className="h5 px-12 py-3 font-bold rounded-[14px] bg-gradient-to-r from-[rgba(101,128,225,1)] via-[rgba(88,68,215,1)] to-[rgba(30,30,30,1)] text-[#ECF0FF] shadow-[0_3px_4px_2px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_8px_2px_rgba(101,128,225,1)]"
                                >
                                    {isLastStep ? "Submit" : "Next"}
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div >
    );
}

type User_Information_Props = {
    data: Form_Data_Type;
    handlerInputChanged: (key: Form_Data_Type_Keys, value: string) => void;
}
function UserInformation({ data, handlerInputChanged }: User_Information_Props) {
    return (
        <div className="space-y-4 mx-48">
            <LabelInputContainer>
                <label
                    className="bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                    htmlFor="name"
                >
                    Name*
                </label>
                <input
                    className="rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF]"
                    id="name"
                    name="name"
                    placeholder="กรุณากรอกชื่อ เช่น 'เจเจ'"
                    type="text"
                    value={data.name || ""}
                    onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                />
            </LabelInputContainer>
            <LabelInputContainer>
                <label
                    className="bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                    htmlFor="organize"
                >
                    Organize
                </label>
                <input
                    className="rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF]"
                    id="organize"
                    name="organize"
                    placeholder="กรุณากรอกชื่อบริษัท"
                    type="text"
                    value={data.organize || ""}
                    onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                />
            </LabelInputContainer>
            <div className="w-full grid grid-cols-2 gap-4">
                <LabelInputContainer>
                    <label
                        className="bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                        htmlFor="email"
                    >
                        Email*
                    </label>
                    <input
                        className="rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF]"
                        id="email"
                        name="email"
                        placeholder="กรุณากรอกอีเมล"
                        type="email"
                        value={data.email || ""}
                        onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <label
                        className="bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                        htmlFor="phone"
                    >
                        Phone*
                    </label>
                    <input
                        className="rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF]"
                        id="phone"
                        name="phone"
                        placeholder="กรุณากรอกเบอร์โทรศัพท์"
                        type="text"
                        value={data.phone || ""}
                        onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                    />
                </LabelInputContainer>
            </div>
        </div>
    )
}

type Project_Information_Props = {
    data: Form_Data_Type;
    handlerInputChanged: (key: Form_Data_Type_Keys, value: File[] | string) => void;
}
function ProjectInformation({ data, handlerInputChanged }: Project_Information_Props) {
    const purpose_options = [
        { name: "ใช้งานส่วนตัว" },
        { name: "ใช้ในองค์กร" },
        { name: "เผยแพร่สาธารณะ" },
        { name: "อื่นๆ" },
    ]
    const target_options = [
        { name: "เด็กและเยาวชน" },
        { name: "นักเรียน/นักศึกษา" },
        { name: "บุคคลทั่วไป" },
        { name: "ผู้สูงอายุ" },
    ]

    return (
        <div className="flex flex-row gap-12 mb-16">
            <div className="space-y-2 min-w-[250px] w-[400px]">
                <p className="bg-gradient-to-r from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent">
                    Upload your logo or reference
                </p>
                <DropFileInput handlerInputChanged={handlerInputChanged} data={data} />
            </div>
            <div className="w-full space-y-4">
                <LabelInputContainer>
                    <label
                        className="bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                        htmlFor="project_name"
                    >
                        Project name
                    </label>
                    <input
                        className="rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF]"
                        id="project_name"
                        name="project_name"
                        placeholder="กรุณากรอกชื่อ เช่น 'เจเจ'"
                        type="text"
                        value={data.project_name || ""}
                        onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <h5
                        className="bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                    >
                        Project type*
                    </h5>
                    <div className="flex flex-row justify-start flex-wrap gap-3">
                        <div className="relative w-[200px]">
                            <input
                                id="website"
                                name="project_type"
                                type="radio"
                                value="Website"
                                checked={data.project_type === "Website"}
                                onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                                className="peer/website hidden"
                            />
                            <label
                                htmlFor="website"
                                className="block text-center bg-[#ECF0FF] h-[56px] text-[#453E72] rounded-[10px]  hover:bg-gradient-to-tl hover:from-[rgba(229,213,255,1)] hover:to-[rgba(189,203,253,1)] cursor-pointer peer-checked/website:bg-gradient-to-tl peer-checked/website:from-[#5844D7] peer-checked/website:to-[#6580E1] peer-checked/website:p-[6px] transition-all"
                            >
                                <div className={`flex justify-center items-center h-full rounded-[6px] ${data.project_type === "Website" ? "bg-gradient-to-tl from-[rgba(229,213,255,1)] to-[rgba(189,203,253,1)]" : "bg-transparent"}`}>
                                    <p className="">
                                        Website
                                    </p>
                                </div>
                            </label>
                        </div>

                        {/* ตัวเลือก Webapp */}
                        <div className="relative w-[200px]">
                            <input
                                id="webapp"
                                name="project_type"
                                type="radio"
                                value="Webapp"
                                checked={data.project_type === "Webapp"}
                                onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                                className="peer/webapp hidden"
                            />
                            <label
                                htmlFor="webapp"
                                className="block text-center bg-[#ECF0FF] h-[56px] text-[#453E72] rounded-[10px]  hover:bg-gradient-to-tl hover:from-[rgba(229,213,255,1)] hover:to-[rgba(189,203,253,1)] cursor-pointer peer-checked/webapp:bg-gradient-to-tl peer-checked/webapp:from-[#5844D7] peer-checked/webapp:to-[#6580E1] peer-checked/webapp:p-[6px] transition-all"
                            >
                                <div className={`flex justify-center items-center h-full rounded-[6px] ${data.project_type === "Webapp" ? "bg-gradient-to-tl from-[rgba(229,213,255,1)] to-[rgba(189,203,253,1)]" : "bg-transparent"}`}>
                                    <p className="">
                                        Webapp
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </LabelInputContainer>
                <LabelInputContainer>
                    <label
                        className="bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                        htmlFor="project_content"
                    >
                        content*
                    </label>
                    <textarea
                        className="rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF]"
                        id="project_content"
                        name="project_content"
                        rows={6}
                        placeholder="กรุณากรอกรายละเอียดสิ่งที่ต้องการให้เราออกแบบ เช่น 'หน้าเว็บขายสินค้าแนวมินิมอล'"
                        value={data.project_content || ""}
                        onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <div className="grid grid-cols-2 gap-5 flex-wrap z-20">
                        <div className="">
                            <label
                                className="bg-gradient-to-r from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                                htmlFor="purpose"
                            >
                                Purpose*
                            </label>
                            <Dropdown data={data} optionTitle={"Purpose"} options={purpose_options} optionSelected={handlerInputChanged} />
                        </div>
                        <div className="">
                            <label
                                className="bg-gradient-to-r from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                                htmlFor="target"
                            >
                                Target*
                            </label>
                            <Dropdown data={data} optionTitle={"Target"} options={target_options} optionSelected={handlerInputChanged} />
                        </div>
                    </div>
                </LabelInputContainer>
                <LabelInputContainer>
                    <label
                        className="bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                        htmlFor="color"
                    >
                        Color
                    </label>
                    <input
                        className="rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF]"
                        id="color"
                        name="color"
                        placeholder="กรุณากรอกสีหรือรหัสสี เช่น 'ฟ้าพาสเทล' หรือ '#AABBCC'"
                        type="text"
                        value={data.color || ""}
                        onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <label
                        className="bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"
                        htmlFor="etc"
                    >
                        Etc.
                    </label>
                    <input
                        className="rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF]"
                        id="etc"
                        name="etc"
                        placeholder="กรุณากรอกรายละเอียดเพิ่มเติม"
                        type="text"
                        value={data.etc || ""}
                        onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                    />
                </LabelInputContainer>
            </div>
        </div>
    )
}


type Thanks_Props = {
    data: Form_Data_Type;
}
function Thanks({ data }: Thanks_Props) {
    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="font-extrabold bg-gradient-to-r from-[rgba(200,189,228,1)] to-[rgba(200,189,228,0.2)] bg-clip-text text-transparent">
                ขอบคุณที่เลือกใช้บริการของเรา
            </h2>
            <h5 className="text-center text-[#ECF0FF] font-light">
                ทีมงานของเราจะติดต่อกลับไปภายใน 1 - 3 วัน หากต้องการแก้ไขข้อมูล <br />
                ท่านสามารถกรอกฟอร์มใหม่อีกครั้ง หรือ สามาถแจ้งเราได้ในภายหลัง
            </h5>
        </div>
    )
}


const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={"flex flex-col space-y-2 w-full" + className}>
            {children}
        </div>
    );
};


type DropFileInput_Props = {
    data: Form_Data_Type;
    handlerInputChanged: (key: string, value: File[]) => void;
}
const DropFileInput = ({ data, handlerInputChanged }: DropFileInput_Props) => {
    const [files, setFiles] = useState<File[]>(data.files || []);
    const [fileEnter, setFileEnter] = useState(false);

    const handleFiles = (newFiles: FileList | File[]) => {
        const fileArray = Array.from(newFiles);
        const updatedFiles = [...files, ...fileArray];
        setFiles(updatedFiles);
        handlerInputChanged("files", updatedFiles);
    };

    const removeFile = (e: React.MouseEvent<HTMLButtonElement>, indexToRemove: number) => {
        e.preventDefault();
        const updatedFiles = files.filter((_, index) => index !== indexToRemove);
        setFiles(updatedFiles);
        handlerInputChanged("files", updatedFiles);
    };

    return (
        <div className="container mx-auto">
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setFileEnter(true);
                }}
                onDragLeave={(e) => {
                    setFileEnter(false);
                }}
                onDragEnd={(e) => {
                    e.preventDefault();
                    setFileEnter(false);
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    setFileEnter(false);
                    if (e.dataTransfer.items) {
                        const droppedFiles = Array.from(e.dataTransfer.items)
                            .filter((item) => item.kind === "file")
                            .map((item) => item.getAsFile())
                            .filter((file): file is File => !!file); // Ensure no null values
                        handleFiles(droppedFiles);
                    } else {
                        handleFiles(e.dataTransfer.files);
                    }
                }}
                className={`${fileEnter ? "" : ""} dash_container rounded-[10px] flex flex-col w-full h-[370px] items-center justify-center`} //bg-[rgba(22,21,29,0.41)]
                // style={{
                //     backgroundColor: "rgba(22,21,29,0.41)",
                //     background: `radial-gradient(circle at 100% 100%, #000000 0, #000000 3px, transparent 3px) 0% 0%/8px 8px no-repeat,
                //                 radial-gradient(circle at 0 100%, #000000 0, #000000 3px, transparent 3px) 100% 0%/8px 8px no-repeat,
                //                 radial-gradient(circle at 100% 0, #000000 0, #000000 3px, transparent 3px) 0% 100%/8px 8px no-repeat,
                //                 radial-gradient(circle at 0 0, #000000 0, #000000 3px, transparent 3px) 100% 100%/8px 8px no-repeat,
                //                 linear-gradient(#000000, #000000) 50% 50%/calc(100% - 10px) calc(100% - 16px) no-repeat,
                //                 linear-gradient(#000000, #000000) 50% 50%/calc(100% - 16px) calc(100% - 10px) no-repeat,
                //                 linear-gradient(319deg, #e06721 0%, #ed21aa 17.676%, #cd411d 58.476%, #ee5002 65.047%, #ee2aac 100%)`,
                //     borderRadius: "8px",
                //     padding: "9px",
                //     boxSizing: "border-box",
                // }}
                style={{
                    background: "rgba(22, 21, 29, .41)",
                    border: "5px dashed #5844D7"
                }}
            >
                <label
                    htmlFor="files"
                    className="h-full w-full p-6 flex flex-col gap-2 justify-center text-center "
                >
                    <h5 className="text-[#6580E1] font-light">Drop to upload</h5>
                    <div className="text-[#ECF0FF] font-normal cursor-pointer p-3 rounded-[5px] bg-gradient-to-tr from-[rgba(88,68,215,1)] to-[rgba(101,128,225,1)]">
                        <h5>Select files</h5>
                    </div>
                </label>
                <input
                    id="files"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e) => {
                        if (e.target.files) {
                            handleFiles(e.target.files);
                        }
                    }}
                />
            </div>

            {/* แสดงรายชื่อไฟล์ที่อัพโหลด พร้อมปุ่มลบ */}
            <div className="mt-3">
                {files.length > 0 ? (
                    <ul className="list-disc list-inside space-y-3">
                        {files.map((file, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between p-1 px-3 rounded-[8px] bg-gradient-to-r from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] hover:bg-gradient-to-tl hover:from-[rgba(229,213,255,1)] hover:to-[rgba(189,203,253,1)]"
                            >
                                <h5 className="text-[#16151D]">
                                    {file.name} {/* ({(file.size / 1024).toFixed(2)} KB) */}
                                </h5>
                                <button
                                    onClick={(e) => removeFile(e, index)}
                                    className="text-[#000000] hover:text-[#5844D7]"
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-[#ECF0FF]">No files uploaded yet.</p>
                )}
            </div>
        </div>
    );
}


type DropdownProps = {
    data: Form_Data_Type;
    optionTitle: Form_Data_Type_Keys;
    options: { name: string }[];
    optionSelected: (key: Form_Data_Type_Keys, value: string) => void;
};

const Dropdown = ({ data, optionTitle, options, optionSelected }: DropdownProps) => {
    const map_key = optionTitle as Form_Data_Type_Keys; // Explicit type assignment
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState(data[map_key] || "");
    const [open, setOpen] = useState(false);


    return (
        <div className="w-auto font-medium h-[56px]">
            <div
                onClick={() => setOpen(!open)}
                className={`relative h-[56px] flex items-center justify-center w-full p-4 ${open ? "rounded-t-[5px] bg-[linear-gradient(-96deg,_var(--tw-gradient-stops))] from-[rgba(88,68,215,1)] to-[rgba(101,128,225,1)]" : "rounded-[5px] bg-[#ECF0FF]"} ${!selected && "text-gray-700"
                    }`}
            >
                <h5 className={`${open ? "text-[#ECF0FF]" : "text-[#453E72]"} font-normal`}>
                    {selected
                        ? selected?.length > 25
                            ? selected?.substring(0, 25) + "..."
                            : selected
                        : optionTitle || "..."}
                </h5>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${open && "rotate-180"} absolute right-5 h-5 w-5`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
            <ul
                className={`bg-white overflow-y-auto rounded-b-[5px] ${open ? "max-h-60" : "max-h-0"
                    } `}
            >
                {options?.map((option) => (
                    <li
                        key={option?.name}
                        className={`p-4 text-center text-[#453E72] text-sm hover:bg-gradient-to-r hover:from-[rgba(200,189,228,1)] hover:to-[rgba(189,203,253,1)]
            ${option?.name?.toLowerCase() === selected?.toLowerCase() &&
                            "bg-gradient-to-r from-[rgba(200,189,228,1)] to-[rgba(189,203,253,1)]"
                            }
            ${option?.name?.toLowerCase().startsWith(inputValue)
                                ? "block"
                                : "hidden"
                            }`}
                        onClick={() => {
                            if (option?.name?.toLowerCase() !== selected.toLowerCase()) {
                                setSelected(option?.name);
                                optionSelected(optionTitle, option?.name);
                                setOpen(false);
                                setInputValue("");
                            }
                        }}
                    >
                        <h5>{option?.name}</h5>
                    </li>
                ))}
            </ul>
        </div>
    );
};