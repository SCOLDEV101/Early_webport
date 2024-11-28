// Types
type PORTFOLIO_DATA = {
    title: string,
    img_src: string,
    img_alt: string,
    desc: string,
    category: string[],
}

type SERVICE_DATA = {
    title: string,
    img_src: string,
    img_alt: string,
    text_gradient: string,
}

type MEMBER_DATA = {
    id: string,
    position: string,
    name: string,
    img_src: string,
    img_alt: string,
    img_style: string,
    email: string,
    tel: string,
    skills: {
        skill_icon: string,
        skill_title: string,
    }[],
    certificates: {
        cert_img: string,
        cert_title: string,
        cert_category: string[],
        cert_reward: string,
    }[],
}

// Data
export const portfolio_data: PORTFOLIO_DATA[] = [
    {
        title: "Web-PortFolio Blue",
        img_src: "./portfolio/k-link.svg",
        img_alt: "Web-PortFolio-Blue",
        desc: "เว็บไซต์สำหรับแสดงศักยภาพของทีมพัฒนาโปรเจ็ค ที่เน้นความสร้างสรรค์และความล้ำสมัย ",
        category: ["web"],
    },
    {
        title: "OfficeSCOLDEV",
        img_src: "./portfolio/k-link.svg",
        img_alt: "Office-SCOLDEV",
        desc: "เว็บไซต์สำหรับให้ผู้ใช้สามารถมอบหมายงานให้กับสมาชิกทีมได้เพิ่มความสะดวกสบายในการทำงานเป็นทีม และบริหารจัดการได้ง่ายขึ้น",
        category: ["web"],
    },
    {
        title: "Mushroom Classification",
        img_src: "./portfolio/k-link.svg",
        img_alt: "CNN-mushrooms-classify",
        desc: "แอปพลิเคชันสำหรับการวิเคราะห์เห็ด พร้อมทั้งบอกข้อมูลต่างๆ โดยจะใช้ AI ในการแยกชนิดเห็ดจากรูปภาพและส่งข้อมูลของเห็นนั้นออกมา",
        category: ["mobile"],
    },
]

export const service_data: SERVICE_DATA[] = [
    {
        title: "Responsive\nWebsite",
        img_src: "./service/responsive.svg",
        img_alt: "Responsive Website",
        text_gradient: '110deg, rgba(101, 128, 225, 1) 0%, rgba(88, 68, 215, 1) 50%, rgba(30, 30, 30, 1) 100%',
    },
    {
        title: "Portfolio\nWebsite",
        img_src: "./service/portfolio.svg",
        img_alt: "Portfolio Website",
        text_gradient: '-126deg, rgba(101, 128, 225, 1) 0%, rgba(88, 68, 215, 1) 50%, rgba(30, 30, 30, 1) 100%',


    },
    {
        title: "E-Commerce\nWebsite",
        img_src: "./service/e-commerce.svg",
        img_alt: "E-Commerce Website",
        text_gradient: '162deg,rgba(101, 128, 225, 1) 0%, rgba(88, 68, 215, 1) 50%, rgba(30, 30, 30, 1) 100%',


    },
    {
        title: "Coperate\nWebsite",
        img_src: "./service/coperate.svg",
        img_alt: "Coperate Website",
        text_gradient: '24deg, rgba(101, 128, 225, 1) 0%, rgba(88, 68, 215, 1) 50%, rgba(30, 30, 30, 1) 100%',


    },
    {
        title: "Mobile\nApplication",
        img_src: "./service/mobile.svg",
        img_alt: "Mobile Application",
        text_gradient: '-90deg,rgba(101, 128, 225, 1) 0%, rgba(88, 68, 215, 1) 50%, rgba(30, 30, 30, 1) 100%',


    },
    {
        title: "Attendance\nSystem",
        img_src: "./service/attendance.svg",
        img_alt: "Attendance System",
        text_gradient: '-176deg, rgba(101, 128, 225, 1) 0%, rgba(88, 68, 215, 1) 50%, rgba(30, 30, 30, 1) 100%',
    },
]


export const member_data: MEMBER_DATA[] = [
    {
        id: "F001",
        position: "Front-End Developer, AI Developer",
        name: "พชรพล เจนพานิช",
        img_src: "/member/team/pacharapol_jenpanich.jpg",
        img_alt: "Pacharapol Jenpanich",
        img_style: "",
        email: "pacharapolpacharapol2547@gmail.com",
        tel: "089-359-6215",
        skills: [
            {
                skill_icon: "/logo/react.svg",
                skill_title: "React",
            },
            {
                skill_icon: "/logo/next-1.svg",
                skill_title: "NextJS",
            },
            {
                skill_icon: "/logo/angular-1.svg",
                skill_title: "Angular",
            },
            {
                skill_icon: "/logo/python.svg",
                skill_title: "Python",
            },
            {
                skill_icon: "/logo/js-1.svg",
                skill_title: "JavaScript",
            },
            {
                skill_icon: "/logo/ts-1.svg",
                skill_title: "TypeScript",
            },
            {
                skill_icon: "/logo/css-1.svg",
                skill_title: "CSS",
            },
            {
                skill_icon: "/logo/html-1.svg",
                skill_title: "HTML",
            },
            {
                skill_icon: "/logo/tailwind-2.svg",
                skill_title: "TailwindCSS",
            },
            {
                skill_icon: "/logo/bootstrap.svg",
                skill_title: "Bootstrap",
            },
            {
                skill_icon: "/logo/node-2.svg",
                skill_title: "Node.js",
            },
            {
                skill_icon: "/logo/express-1.svg",
                skill_title: "Express",
            },
        ],
        certificates: [
            {
                cert_img: "./portfolio/k-link.svg",
                cert_title: "stringddddddddddddddddddddddddddddddddddddddddddeeee",
                cert_category: ["1", "2", "3"],
                cert_reward: "firstdddddddddddddddddddddddddddddd",
            }
        ]
    },
    {
        id: "F002",
        position: "Front-End Developer",
        name: "กษิดิศ ทองอ่อน",
        img_src: "/member/team/Jhong-Img.png",
        img_alt: "Kasidit Thong-on",
        img_style: "object-[60%]",
        email: "kasidit.thong@gmail.com",
        tel: "092-990-7244",
        skills: [
            {
                skill_icon: "/logo/react.svg",
                skill_title: "React",
            },
            {
                skill_icon: "/logo/next-1.svg",
                skill_title: "NextJS",
            },
            {
                skill_icon: "/logo/vue-1.svg",
                skill_title: "VueJS",
            },
            {
                skill_icon: "/logo/nuxt.svg",
                skill_title: "NuxtJS",
            },
            {
                skill_icon: "/logo/python.svg",
                skill_title: "Python",
            },
            {
                skill_icon: "/logo/c-sharp.svg",
                skill_title: "C#",
            },
            {
                skill_icon: "/logo/js-1.svg",
                skill_title: "JavaScript",
            },
            {
                skill_icon: "/logo/ts-1.svg",
                skill_title: "TypeScript",
            },
            {
                skill_icon: "/logo/css-1.svg",
                skill_title: "CSS",
            },
            {
                skill_icon: "/logo/html-1.svg",
                skill_title: "HTML",
            },
            {
                skill_icon: "/logo/tailwind-2.svg",
                skill_title: "TailwindCSS",
            },
            {
                skill_icon: "/logo/bootstrap.svg",
                skill_title: "Bootstrap",
            },
            {
                skill_icon: "/logo/express-1.svg",
                skill_title: "Express",
            },
            {
                skill_icon: "/logo/mysql-1.svg",
                skill_title: "MySQL",
            },
            {
                skill_icon: "/logo/mongo-2.svg",
                skill_title: "MongoDB",
            },
            {
                skill_icon: "/logo/github.svg",
                skill_title: "Git",
            },
            {
                skill_icon: "/logo/figma-1.svg",
                skill_title: "Figma",
            },
        ],
        certificates: []
    },
    {
        id: "B001",
        position: "Front-End Developer 2",
        name: "กษิดิศ ทองอ่อน",
        img_src: "/member/team/Jhong-Img.png",
        img_alt: "Kasidit Thong-on",
        img_style: "object-[60%]",
        email: "kasidit.thong@gmail.com",
        tel: "092-990-7244",
        skills: [
            {
                skill_icon: "/logo/js-1.svg",
                skill_title: "JavaScript",
            },
            {
                skill_icon: "/logo/react.svg",
                skill_title: "React",
            },
            {
                skill_icon: "/logo/next-1.svg",
                skill_title: "NextJS",
            },
            {
                skill_icon: "/logo/ts-1.svg",
                skill_title: "TypeScript",
            },
            {
                skill_icon: "/logo/tailwind-2.svg",
                skill_title: "TailwindCSS",
            },
            {
                skill_icon: "/logo/node-2.svg",
                skill_title: "Node.js",
            },
            {
                skill_icon: "/logo/express-1.svg",
                skill_title: "Express",
            },
            {
                skill_icon: "/logo/python.svg",
                skill_title: "Python",
            },
            {
                skill_icon: "/logo/css-1.svg",
                skill_title: "CSS",
            },
            {
                skill_icon: "/logo/html-1.svg",
                skill_title: "HTML",
            },
        ],
        certificates: []
    },
    {
        id: "B002",
        position: "Front-End Developer 3",
        name: "กษิดิศ ทองอ่อน",
        img_src: "/member/team/Jhong-Img.png",
        img_alt: "Kasidit Thong-on",
        img_style: "object-[60%]",
        email: "kasidit.thong@gmail.com",
        tel: "092-990-7244",
        skills: [
            {
                skill_icon: "/logo/js-1.svg",
                skill_title: "JavaScript",
            },
            {
                skill_icon: "/logo/react.svg",
                skill_title: "React",
            },
            {
                skill_icon: "/logo/next-1.svg",
                skill_title: "NextJS",
            },
            {
                skill_icon: "/logo/ts-1.svg",
                skill_title: "TypeScript",
            },
            {
                skill_icon: "/logo/tailwind-2.svg",
                skill_title: "TailwindCSS",
            },
            {
                skill_icon: "/logo/node-2.svg",
                skill_title: "Node.js",
            },
            {
                skill_icon: "/logo/express-1.svg",
                skill_title: "Express",
            },
            {
                skill_icon: "/logo/python.svg",
                skill_title: "Python",
            },
            {
                skill_icon: "/logo/css-1.svg",
                skill_title: "CSS",
            },
            {
                skill_icon: "/logo/html-1.svg",
                skill_title: "HTML",
            },
        ],
        certificates: []
    },
    {
        id: "UI001",
        position: "Front-End Developer 4",
        name: "กษิดิศ ทองอ่อน",
        img_src: "/member/team/Jhong-Img.png",
        img_alt: "Kasidit Thong-on",
        img_style: "object-[60%]",
        email: "kasidit.thong@gmail.com",
        tel: "092-990-7244",
        skills: [
            {
                skill_icon: "/logo/js-1.svg",
                skill_title: "JavaScript",
            },
            {
                skill_icon: "/logo/react.svg",
                skill_title: "React",
            },
            {
                skill_icon: "/logo/next-1.svg",
                skill_title: "NextJS",
            },
            {
                skill_icon: "/logo/ts-1.svg",
                skill_title: "TypeScript",
            },
            {
                skill_icon: "/logo/tailwind-2.svg",
                skill_title: "TailwindCSS",
            },
            {
                skill_icon: "/logo/node-2.svg",
                skill_title: "Node.js",
            },
            {
                skill_icon: "/logo/express-1.svg",
                skill_title: "Express",
            },
            {
                skill_icon: "/logo/python.svg",
                skill_title: "Python",
            },
            {
                skill_icon: "/logo/css-1.svg",
                skill_title: "CSS",
            },
            {
                skill_icon: "/logo/html-1.svg",
                skill_title: "HTML",
            },
        ],
        certificates: []
    },
    {
        id: "UI002",
        position: "Front-End Developer 5",
        name: "กษิดิศ ทองอ่อน",
        img_src: "/member/team/Jhong-Img.png",
        img_alt: "Kasidit Thong-on",
        img_style: "object-[60%]",
        email: "kasidit.thong@gmail.com",
        tel: "092-990-7244",
        skills: [
            {
                skill_icon: "/logo/js-1.svg",
                skill_title: "JavaScript",
            },
            {
                skill_icon: "/logo/react.svg",
                skill_title: "React",
            },
            {
                skill_icon: "/logo/next-1.svg",
                skill_title: "NextJS",
            },
            {
                skill_icon: "/logo/ts-1.svg",
                skill_title: "TypeScript",
            },
            {
                skill_icon: "/logo/tailwind-2.svg",
                skill_title: "TailwindCSS",
            },
            {
                skill_icon: "/logo/node-2.svg",
                skill_title: "Node.js",
            },
            {
                skill_icon: "/logo/express-1.svg",
                skill_title: "Express",
            },
            {
                skill_icon: "/logo/python.svg",
                skill_title: "Python",
            },
            {
                skill_icon: "/logo/css-1.svg",
                skill_title: "CSS",
            },
            {
                skill_icon: "/logo/html-1.svg",
                skill_title: "HTML",
            },
        ],
        certificates: []
    },
];