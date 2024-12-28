import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


type Form_Data_Type = {
    name: string;
    organize: string;
    email: string;
    phone: string;
    files: File[];
    project_name: string;
    project_purpose: string;
    project_target: string;
    project_type: string;
    project_content: string;
    color: string;
    etc: string;
    [key: string]: string | File[];
}

// type Form_Data_Type_Keys = keyof Form_Data_Type;

const Form_Data: Form_Data_Type = {
    name: "",
    organize: "",
    email: "",
    phone: "",
    files: [],
    project_name: "โปรเจกต์ของฉัน",
    project_purpose: "",
    project_target: "",
    project_type: "",
    project_content: "",
    color: "",
    etc: "",
}


type RequireFieldType = {
    [key: string]: boolean;
};

const EnquiryForm_RequireField: RequireFieldType = {
    name: false,
    email: false,
    phone: false,
    project_name: false,
    project_type: false,
    project_content: false,
    project_purpose: false,
    project_target: false,
}

// type Enquiry_Props = {}

export default function Enquiry() {

    const [data, setData] = useState(Form_Data)
    // const [submitLoading, setSubmitLoading] = useState(false);
    const [processBar, setProcessBar] = useState({ 0: 0, 1: 0 })
    const [requireField, setRequireField] = useState(EnquiryForm_RequireField)

    const alertSwal = withReactContent(Swal)

    const handlerInputChanged = (key: string, value: string | File[]) => {
        setData((prev) => {
            return { ...prev, [key.toLowerCase()]: value };
        });
        setRequireField((prev) => ({
            ...prev,
            [key.toLowerCase()]: false,
        }))
    }

    const form_validation = (data: Form_Data_Type, currentStep: number) => {
        if (currentStep === 0) {
            if (!data.name || !data.email || !data.phone) {
                setRequireField((prev) => ({
                    ...prev,
                    name: !data.name ? true : false,
                    email: !data.email ? true : false,
                    phone: !data.phone ? true : false,
                }))
                return false;
            }
            // if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
            //     setRequireField((prev) => ({
            //         ...prev,
            //         email: data.email && !/\S+@\S+\.\S+/.test(data.email) ? true : false,
            //     }))
            //     return false;
            // }

            // console.log("urrentStep === 0");

        } else if (currentStep === 1) {
            if (!data.project_name || !data.project_type || !data.project_content || !data.project_purpose || !data.project_target) {
                setRequireField((prev) => ({
                    ...prev,
                    project_name: !data.project_name ? true : false,
                    project_type: !data.project_type ? true : false,
                    project_content: !data.project_content ? true : false,
                    project_purpose: !data.project_purpose ? true : false,
                    project_target: !data.project_target ? true : false,
                }))
                return false;
            }
        }
        // console.log("Trying to");

        setRequireField(EnquiryForm_RequireField)
        return true;
    }

    const sendEmail = async ({ data }: { data: Form_Data_Type }): Promise<{ success: boolean; message: string }> => {
        // setSubmitLoading(true);

        try {
            const attachments =
                data.files && data.files.length > 0
                    ? data.files.map((file) => ({
                        filename: file.name,
                        path: `public/uploads/${file.name}`, // URL หรือ path ของไฟล์
                    }))
                    : []; // ถ้าไม่มีไฟล์ ให้ส่งอีเมลโดยไม่มีไฟล์แนบ

            const emailData = {
                sender: {
                    name: data.email,
                    address: data.email,
                },
                receipients: [
                    // {
                    //     name: "SCOLDEV",
                    //     address: "scoldev101@gmail.com",
                    // },
                    {
                        name: "SCOLDEV",
                        address: "pacharapolpacharapol2547@gmail.com",
                    },
                ],
                subject: "Customer sending email from Enquiry form",
                message: `Form Information: ${JSON.stringify(data)}`, // ส่งข้อมูลฟอร์มในข้อความ
                attachments,
            };

            const response = await fetch("/api/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData), // ส่งข้อมูลเป็น JSON
            });

            if (!response.ok) {
                throw new Error(`Failed to send email. Status: ${response.status}`);
            }

            // const emailResponse = await response.json();
            // console.log(emailResponse, "with deleted");

            // ลบไฟล์หลังจากส่งอีเมลสำเร็จ
            deleteFiles(data.files?.map((file) => file.name) || []);
            // console.log({ data });

            return {
                success: true,
                message: "Email sent successfully.",
            };
        } catch (error) {
            console.error("Error in sendEmail:", error);

            return {
                success: false,
                message: error instanceof Error ? error.message : "Failed to send email.",
            };
        }
    };

    const saveFileToLocalPath = async ({ data }: { data: Form_Data_Type }): Promise<boolean> => {
        if (!data.files || data.files.length === 0) {
            console.log("No files to upload.");
            return true;
        }

        try {
            const formData = new FormData();

            data.files.forEach((file, index) => {
                if (file instanceof File) {
                    formData.append(`file[${index}]`, file);
                } else {
                    console.error("Invalid file type:", file);
                }
            });

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                // alert(`Uploaded files: ${result.files.join(", ")}`);
                return true;
            } else {
                // alert("Upload failed");
                return false;
            }
        } catch (error) {
            console.error("Error uploading files:", error);
            // alert("An error occurred during upload.");
            return false;
        }
    };

    const deleteFiles = (fileNames: string[]) => {
        fetch("/api/delete-uploaded-file", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileNames }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    console.log("Files deleted successfully:", result.deletedFiles);
                } else {
                    console.error("File deletion failed:", result.message);
                }
            })
            .catch((error) => {
                console.error("Error deleting files:", error);
            });
    };

    // const submitForm = async () => {
    //     try {
    //         // รอให้ไฟล์อัปโหลดเสร็จก่อน (หรือข้ามหากไม่มีไฟล์)
    //         const uploadSuccess = await saveFileToLocalPath({ data });
    //         if (uploadSuccess) {
    //             // ส่งอีเมลเมื่อไฟล์อัปโหลดสำเร็จหรือไม่มีไฟล์
    //             sendEmail({ data });
    //         } else {
    //             console.error("File upload failed. Email will not be sent.");
    //         }
    //     } catch (error) {
    //         console.error("Error in submitForm:", error);
    //     }
    // };

    const submitForm = async () => {
        // let cancelSending = false; // สถานะการยกเลิกส่ง

        // เปิด Swal สำหรับการ recheck
        const recheck = await alertSwal.fire({
            title: 'ยืนยันการส่งฟอร์มนี้หรือไม่?',
            text: 'กรุณาตรวจสอบและยืนยันการส่งฟอร์มอีกครั้ง',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });

        if (!recheck.isConfirmed) {
            console.log('Form submission canceled by user.');
            return; // ยกเลิกการทำงานหากผู้ใช้เลือก Cancel
        }

        // เปิด Swal ระหว่างส่งข้อมูล
        await alertSwal.fire({
            title: 'Sending Email...',
            text: 'กรุณารอสักครู่จนกว่าการส่งอีเมลจะเสร็จสมบูรณ์ ระยะเวลาในการดำเนินการอาจแตกต่างกันขึ้นอยู่กับขนาดของไฟล์ที่อัปโหลด',
            didOpen: async () => {
                // const cancelButton = document.createElement('button');
                // cancelButton.innerText = 'Cancel Sending';
                // cancelButton.className = 'swal2-styled swal2-cancel';
                // cancelButton.onclick = () => {
                //     cancelSending = true;
                //     alertSwal.close(); // ปิด Swal
                // };
                // document.querySelector('.swal2-actions')?.appendChild(cancelButton);

                // แสดง Loading
                alertSwal.showLoading();

                try {
                    // รอการอัปโหลดไฟล์ (หรือข้ามหากไม่มีไฟล์)
                    const uploadSuccess = await saveFileToLocalPath({ data });

                    // if (cancelSending) {
                    //     throw new Error('Sending canceled by user.');
                    // }

                    if (uploadSuccess) {
                        // ส่งอีเมลเมื่อไฟล์อัปโหลดสำเร็จหรือไม่มีไฟล์
                        const sendEmail_status = await sendEmail({ data });

                        // if (cancelSending) {
                        //     throw new Error('Sending canceled by user.');
                        // }

                        // แสดง Swal สำเร็จ
                        if (sendEmail_status.success) {
                            alertSwal.fire({
                                title: 'สำเร็จ!',
                                text: 'อีเมลถูกส่งเรียบร้อยแล้ว',
                                icon: 'success',
                                confirmButtonText: 'OK',
                            });
                            changedSteps(currentStep + 1)
                            setProcessBar(prevState => ({
                                ...prevState,
                                [currentStep]: 100,
                            }));
                        }
                    } else {
                        throw new Error('File upload failed. Email will not be sent.');
                    }
                } catch (error) {
                    console.error('Error in submitForm:', error);

                    // แสดง Swal เมื่อเกิดข้อผิดพลาด
                    alertSwal.fire({
                        title: 'Error!',
                        text: 'เกิดข้อผิดพลาดบางอย่าง โปรดลองใหม่อีกครั้ง',
                        icon: 'error',
                        confirmButtonText: 'Retry',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
                    }).then((retry) => {
                        if (retry.isConfirmed) {
                            submitForm(); // เรียกการทำงานใหม่
                        }
                    });
                }
            },
            allowOutsideClick: false, // ไม่ให้คลิกข้างนอกเพื่อปิด
            allowEscapeKey: false, // ไม่ให้ปิดด้วย Escape
            showConfirmButton: false, // ซ่อนปุ่ม OK ระหว่างกำลังโหลด
        });
    };

    const Enquiry_Form_component = [
        <UserInformation key="user-info" data={data} handlerInputChanged={handlerInputChanged} requireField={requireField} />,
        <ProjectInformation key="project-info" data={data} handlerInputChanged={handlerInputChanged} requireField={requireField} />,
        <Thanks key="thanks" />,
    ];

    const {
        currentStep,
        currentComponent,
        changedSteps,
        isLastStep,
    } = useForm(Enquiry_Form_component);


    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="space-y-2">
                <h1 className="text-[rgba(88,68,215,1)] max-sm:text-[2rem] font-extrabold text-center">
                    Enquiry Form
                </h1>
                <h5 className="text-[#ECF0FF] max-sm:text-[3.5vw] font-light text-center">
                    กรอกข้อมูล และเป้าหมายของคุณ <br className='max-sm:hidden' /> เพื่อให้เราสามารถออกแบบเว็บไซต์ที่ตรงตามความต้องการของคุณได้อย่างสมบูรณ์
                </h5>
            </div>
            <div className="grid grid-cols-2 w-full mb-5 gap-5">
                <div>
                    <h5 className='bg-gradient-to-r max-sm:text-[3.5vw] from-[rgba(101,128,225,1)] to-[rgba(88,68,215,1)] bg-clip-text text-transparent font-extrabold'>1. User Information</h5>
                    <div>
                        <div className='bg-gradient-to-b from-[rgba(101,128,225,1)]/50 to-[rgba(88,68,215,1)]/50 max-sm:from-[rgba(255,255,255,.5)]/40 max-sm:to-[rgba(200,189,228,1)]/90 h-[0.3rem] max-sm:h-[0.6rem] rounded-full overflow-hidden'>
                            <div className=' flex justify-center items-center h-full text-xs text-white font-bold'
                                style={{
                                    width: `${processBar["0"]}%`,
                                    transition: 'width 0.5s ease-in-out',
                                    background: 'linear-gradient(  #5844D7 0%, #6068DD 59%, #6580E1 100%)',
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h5 className='bg-gradient-to-r max-sm:text-[3.5vw] from-[rgba(101,128,225,1)] to-[rgba(88,68,215,1)] bg-clip-text text-transparent font-extrabold'>2. Project Information</h5>
                    <div>
                        <div className='bg-gradient-to-b from-[rgba(101,128,225,1)]/50 to-[rgba(88,68,215,1)]/50 max-sm:from-[rgba(255,255,255,.5)]/40 max-sm:to-[rgba(200,189,228,1)]/90 h-[0.3rem] max-sm:h-[0.6rem] rounded-full overflow-hidden'>
                            <div className='flex justify-center items-center h-full text-xs text-white font-bold'
                                style={{
                                    width: `${processBar["1"]}%`,
                                    transition: 'width 0.5s ease-in-out',
                                    background: 'linear-gradient(  #5844D7 0%, #6068DD 59%, #6580E1 100%)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-fit px-10 max-sm:px-6 py-11 rounded-[14px] bg-[rgba(236,240,255,0.05)] shadow-[inset_0_3px_3.9px_-2px_rgba(255,255,255,0.25),_inset_0_-14px_33.2px_-2px_rgba(200,189,228,.33)]">
                <form className="w-full space-y-10">
                    {currentComponent}
                    <div className={`flex flex-row ${currentStep === 2 ? "justify-center" : currentStep === 1 ? "justify-between" : "justify-end"} gap-5 items-center`}>
                        {currentStep === 2 ? (
                            <button
                                type="button"
                                onClick={(e) => {
                                    setData(Form_Data);
                                    changedSteps(0, e);
                                    setProcessBar({
                                        0: 0,
                                        1: 0,
                                    });
                                }}
                                className="h5 mt-12 px-8 py-3 font-bold rounded-[14px] bg-gradient-to-bl from-[rgba(88,68,215,1)] to-[rgba(101,128,225,1)] text-[#ECF0FF] shadow-[0_3px_4px_2px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_8px_2px_rgba(236,240,255,1)]"
                            >
                                กรอกฟอร์มอีกครั้ง
                            </button>
                        ) : (
                            <>
                                {currentStep !== 0 && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            changedSteps(currentStep - 1, e);
                                            setProcessBar(prevState => ({
                                                ...prevState,
                                                [currentStep - 1]: 0,
                                            }));
                                        }}
                                        className={`h5 px-12 max-sm:px-8 py-3 max-sm:w-full font-bold rounded-[14px] text-[rgba(88,68,215,1)] bg-[rgba(255,255,255,1)] hover:shadow-[0_4px_8px_rgba(101,128,225,1)]`}
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type={"button"}
                                    onClick={(e) => {
                                        if (isLastStep && form_validation(data, currentStep)) {
                                            submitForm()
                                        };
                                        if (form_validation(data, currentStep)) {
                                            if (!isLastStep) {
                                                changedSteps(currentStep + 1, e)
                                                setProcessBar(prevState => ({
                                                    ...prevState,
                                                    [currentStep]: 100,
                                                }));
                                            }
                                        }
                                    }}
                                    className={`h5 px-12 max-sm:px-8 py-3 max-sm:w-full font-bold rounded-[14px] bg-gradient-to-r from-[rgba(101,128,225,1)] via-[rgba(88,68,215,1)] to-[rgba(30,30,30,1)] text-[#ECF0FF] shadow-[0_3px_4px_2px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_8px_2px_rgba(101,128,225,1)]`}
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
    handlerInputChanged: (key: string, value: string) => void;
    requireField: RequireFieldType;
}
function UserInformation({ data, handlerInputChanged, requireField }: User_Information_Props) {
    return (
        <div className="space-y-4 sm:mx-48">
            <LabelInputContainer>
                <label
                    className={`${requireField.name ? "text-red-600" : "bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"}`}
                    htmlFor="name"
                >
                    Name*
                </label>
                <input
                    className={`rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF] ${requireField.name && "border-[3px] border-red-600"}`}
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
            <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-4">
                <LabelInputContainer>
                    <label
                        className={`${requireField.email ? "text-red-600" : "bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"}`}
                        htmlFor="email"
                    >
                        Email*
                    </label>
                    <input
                        className={`rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF] ${requireField.email && "border-[3px] border-red-600"}`}
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
                        className={`${requireField.phone ? "text-red-600" : "bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"}`}
                        htmlFor="phone"
                    >
                        Phone*
                    </label>
                    <input
                        className={`rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF] ${requireField.phone && "border-[3px] border-red-600"}`}
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
    handlerInputChanged: (key: string, value: File[] | string) => void;
    requireField: RequireFieldType;
}
function ProjectInformation({ data, handlerInputChanged, requireField }: Project_Information_Props) {
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
        <div className="flex flex-row max-sm:flex-wrap-reverse gap-12 mb-16">
            <div className="space-y-2 min-w-[250px] w-[450px]">
                <p className="bg-gradient-to-r from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent">
                    Upload your logo or reference
                </p>
                <DropFileInput handlerInputChanged={handlerInputChanged} data={data} />
            </div>
            <div className="w-full space-y-4">
                <LabelInputContainer>
                    <label
                        className={`text-[16px] ${requireField.project_name ? "text-red-600" :"bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"}`}
                        htmlFor="project_name"
                    >
                        Project name*
                    </label>
                    <input
                        className={`rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF] ${requireField.project_name && "border-[3px] border-red-600"}`}
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
                        className={`text-[16px] ${requireField.project_type ? "text-red-600" : "bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"}`}
                    >
                        Project type*
                    </h5>
                    <div className="flex flex-row justify-start max-sm:justify-center flex-wrap max-sm:flex-nowrap gap-3">
                        <div className="relative w-[200px] max-sm:w-full">
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
                                className={`block text-center bg-[#ECF0FF] h-[56px] rounded-[10px] ${requireField.project_type ? "text-red-600 border-[3px] border-red-600" : "text-[#453E72]"} hover:bg-gradient-to-tl hover:from-[rgba(229,213,255,1)] hover:to-[rgba(189,203,253,1)] cursor-pointer peer-checked/website:bg-gradient-to-tl peer-checked/website:from-[#5844D7] peer-checked/website:to-[#6580E1] peer-checked/website:p-[6px] transition-all`}
                            >
                                <div className={`flex justify-center items-center h-full rounded-[6px] ${data.project_type === "Website" ? "bg-gradient-to-tl from-[rgba(229,213,255,1)] to-[rgba(189,203,253,1)]" : "bg-transparent"}`}>
                                    <p>
                                        Website
                                    </p>
                                </div>
                            </label>
                        </div>

                        {/* ตัวเลือก Webapp */}
                        <div className="relative w-[200px] max-sm:w-full">
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
                                className={`block text-center bg-[#ECF0FF] h-[56px] rounded-[10px] ${requireField.project_type ? "text-red-600 border-[3px] border-red-600" : "text-[#453E72]"} hover:bg-gradient-to-tl hover:from-[rgba(229,213,255,1)] hover:to-[rgba(189,203,253,1)] cursor-pointer peer-checked/webapp:bg-gradient-to-tl peer-checked/webapp:from-[#5844D7] peer-checked/webapp:to-[#6580E1] peer-checked/webapp:p-[6px] transition-all`}
                            >
                                <div className={`flex justify-center items-center h-full rounded-[6px] ${data.project_type === "Webapp" ? "bg-gradient-to-tl from-[rgba(229,213,255,1)] to-[rgba(189,203,253,1)]" : "bg-transparent"}`}>
                                    <p>
                                        Webapp
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </LabelInputContainer>
                <LabelInputContainer>
                    <label
                        className={`${requireField.project_content ? "text-red-600" : "bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"}`}
                        htmlFor="project_content"
                    >
                        content*
                    </label>
                    <textarea
                        className={`rounded-[5px] p-4 text-[#453E72] bg-[#ECF0FF] ${requireField.project_content && "border-[3px] border-red-600"}`}
                        id="project_content"
                        name="project_content"
                        rows={6}
                        placeholder="กรุณากรอกรายละเอียดสิ่งที่ต้องการให้เราออกแบบ เช่น 'หน้าเว็บขายสินค้าแนวมินิมอล'"
                        value={data.project_content || ""}
                        onChange={(e) => handlerInputChanged(e.target.name, e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 flex-wrap z-20">
                        <div className="z-[2]">
                            <h5
                                className={`text-[16px] ${requireField.project_purpose ? "text-red-600" : "bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"}`}
                            >
                                Purpose*
                            </h5>
                            <Dropdown data={data} optionTitle={"Purpose"} options={purpose_options} optionSelected={handlerInputChanged} requireField={requireField} />
                        </div>
                        <div className="z-[1]">
                            <h5
                                className={`text-[16px] ${requireField.project_target ? "text-red-600" : "bg-gradient-to-br from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] bg-clip-text text-transparent [text-shadow:_0_4px_4px_rgba(0_0_0_/_0.25)]"}`}
                            >
                                Target*
                            </h5>
                            <Dropdown data={data} optionTitle={"Target"} options={target_options} optionSelected={handlerInputChanged} requireField={requireField} />
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


// type Thanks_Props = {
//     data: Form_Data_Type;
// }
function Thanks() {
    return (
        <div className="flex flex-col justify-center items-center pt-12">
            <h2 className="font-extrabold max-sm:text-[1.25rem] bg-gradient-to-r from-[rgba(200,189,228,1)] to-[rgba(200,189,228,0.2)] bg-clip-text text-transparent">
                ขอบคุณที่เลือกใช้บริการของเรา
            </h2>
            <h5 className="text-center  text-[#ECF0FF] font-light">
                ทีมงานของเราจะติดต่อกลับไปภายใน 1 - 3 วัน หากต้องการแก้ไขข้อมูล <br className="max-sm:hidden block"/>
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
    const maxFiles = 5;

    const handleFiles = (newFiles: FileList | File[]) => {
        const fileArray = Array.from(newFiles);
        const updatedFiles = [...files, ...fileArray].slice(0, maxFiles);
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
                onDragLeave={() => {
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
                className={`${fileEnter ? "" : ""} dash_container rounded-[10px] flex flex-col w-full sm:h-[370px] h-[170px] items-center justify-center`}
                style={{
                    background: "rgba(22, 21, 29, .41)",
                    border: "5px dashed #5844D7"
                }}
            >
                <label
                    htmlFor="files"
                    className="h-full w-full p-8 flex flex-col gap-2 justify-center text-center "
                >
                    <h5 className="text-[#6580E1] font-light">Drop to upload</h5>
                    <div className="text-[#ECF0FF] font-normal cursor-pointer p-3 rounded-[5px] bg-gradient-to-tr from-[rgba(88,68,215,1)] to-[rgba(101,128,225,1)]">
                        <h5 className="max-sm:text-[1.125rem]">Select files</h5>
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
                                className="flex items-center gap-3 justify-between p-1 px-3 rounded-[8px] bg-gradient-to-r from-[rgba(200,189,228,1)] to-[rgba(255,255,255,0.2)] hover:bg-gradient-to-tl hover:from-[rgba(229,213,255,1)] hover:to-[rgba(189,203,253,1)]"
                            >
                                <h5 className="text-[#16151D] w-[85%]" style={{ wordWrap: 'break-word' }}>
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
    optionTitle: string;
    options: { name: string }[];
    optionSelected: (key: string, value: string) => void;
    requireField: RequireFieldType;
};

const Dropdown = ({ data, optionTitle, options, optionSelected, requireField }: DropdownProps) => {
    const map_key = "project_" + optionTitle.toLowerCase();
    // console.log("Map key: " + map_key);

    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState<string>(typeof data[map_key] === "string" ? data[map_key] : "");
    const [open, setOpen] = useState(false);


    return (
        <div className="w-auto font-medium h-[56px]">
            <div
                onClick={() => setOpen(!open)}
                className={`relative h-[56px] flex items-center justify-center w-full p-4 ${open ? "rounded-t-[5px] bg-[linear-gradient(-96deg,_var(--tw-gradient-stops))] from-[rgba(88,68,215,1)] to-[rgba(101,128,225,1)]" : "rounded-[5px] bg-[#ECF0FF]"} ${!selected && "text-gray-700"} ${requireField[map_key.toLowerCase()] && "border-[3px] border-red-600"} `}
            >
                <h5 className={`${open ? "text-[#ECF0FF]" : "text-[#453E72]"} font-normal max-sm:text-[1.0625rem] max-sm:font-bold`}>
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
                className={`bg-white overflow-y-auto rounded-b-[5px] ${open ? "max-h-60" : "max-h-0"}`}
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
                                optionSelected("project_" + optionTitle, option?.name);
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