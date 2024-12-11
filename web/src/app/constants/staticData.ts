// Types
type PORTFOLIO_DATA = {
    id: number,
    title: string,
    img_src: string,
    img_alt: string,
    desc: string,
    category: string[],
    poster: string,
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
        id: 1,
        title: "Web-PortFolio Blue",
        img_src: "/portfolio/Scoldev_Webport_blue.png",
        img_alt: "Web-PortFolio-Blue",
        desc: "เว็บไซต์สำหรับแสดงศักยภาพของทีมพัฒนาโปรเจ็ค ที่เน้นความสร้างสรรค์และความล้ำสมัย ",
        category: ["web"],
        poster:"/portfolio/PosterWebport_blue.png"
    },
    {
        id: 2,
        title: "OfficeSCOLDEV",
        img_src: "/portfolio/Scoldev_Office.png",
        img_alt: "Office-SCOLDEV",
        desc: "เว็บไซต์สำหรับให้ผู้ใช้สามารถมอบหมายงานให้กับสมาชิกทีมได้เพิ่มความสะดวกสบายในการทำงานเป็นทีม และบริหารจัดการได้ง่ายขึ้น",
        category: ["web"],
        poster:"/portfolio/PosterSCOLDEV_Attendance_System.png"

    },
    {
        id: 3,
        title: "Mushroom Classification",
        img_src: "/portfolio/Muchroom_Property.png",
        img_alt: "CNN-mushrooms-classify",
        desc: "แอปพลิเคชันสำหรับการวิเคราะห์เห็ด พร้อมทั้งบอกข้อมูลต่างๆ โดยจะใช้ AI ในการแยกชนิดเห็ดจากรูปภาพและส่งข้อมูลของเห็นนั้นออกมา",
        category: ["mobile"],
        poster:"/portfolio/PosterMushroom.png"

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
        id: "PM001",
        position: "Founder , Project manager",
        name: "ธนพล สมฤทธิ์",
        img_src: "/member/team/pk.jpg",
        img_alt: "Thanapol Somrit",
        img_style: "",
        email: "somritthanapol@gmail.com",
        skills: [
            {
                skill_icon: "/logo/js-1.svg", 
                skill_title: "JavaScript",
            },
            {
                skill_icon: "/logo/ts-1.svg",
                skill_title: "TypeScript",
            },
            {
                skill_icon: "/logo/node-2.svg",
                skill_title: "node.js",
            },
            {
                skill_icon: "/logo/python-1.svg",
                skill_title: "Python",
            },
            {
                skill_icon: "/logo/php-1.svg",
                skill_title: "PHP",
            },
            {
                skill_icon: "/logo/c-sharp.svg", 
                skill_title: "C#",
            },
            {
                skill_icon: "/logo/c++.svg",
                skill_title: "C++",
            },
            {
                skill_icon: "/logo/java.svg",
                skill_title: "Java",
            },
            {
                skill_icon: "/logo/next-1.svg",
                skill_title: "Next.js",
            },
            {
                skill_icon: "/logo/react-1.svg",
                skill_title: " React.js",
            },
            {
                skill_icon: "/logo/express.svg",
                skill_title: "Express.js",
            },
            {
                skill_icon: "/logo/laravel-1.svg", 
                skill_title: "Laravel",
            },
            {
                skill_icon: "/logo/bootstrap.svg",
                skill_title: "Bootstrap",
            },
            {
                skill_icon: "/logo/django-1.svg",
                skill_title: "Django",
            },
            {
                skill_icon: "/logo/sql.svg",
                skill_title: "SQL",
            },
            {
                skill_icon: "/logo/mysql-1.svg",
                skill_title: "MySQL",
            },
            {
                skill_icon: "/logo/postqres-1.svg",
                skill_title: "PostgreSQL",
            },
            {
                skill_icon: "/logo/mongo-2.svg",
                skill_title: "MongoDB",
            },
        ],
        certificates: []
    },
    {
        id: "PM000",
        position: "Front-End Developer",
        name: "ปวิชญา อ่อนอำไพ",
        img_src: "/member/team/maikaew.jpg",
        img_alt: "Pawichaya Onampai",
        img_style: "",
        email: "pawichayaonampai@gmail.com",
        skills: [
            {
                skill_icon: "/logo/html-1.svg", 
                skill_title: "HTML",
            },
            {
                skill_icon: "/logo/css-1.svg",
                skill_title: "CSS",
            },
            {
                skill_icon: "/logo/c.svg",
                skill_title: "C",
            },
            {
                skill_icon: "/logo/php-1.svg",
                skill_title: "PHP",
            },
            {
                skill_icon: "/logo/bootstrap.svg",
                skill_title: "Bootstrap",
            },
        ],
        certificates: []
    },
    {
        id: "F002",
        position: "Front-End Developer",
        name: "กษิดิศ ทองอ่อน",
        img_src: "/member/team/Jhong.jpg",
        img_alt: "Kasidit Thong-on",
        img_style: "object-[60%]",
        email: "kasidit.thong@gmail.com",
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
                skill_icon: "/logo/tailwind.svg",
                skill_title: "TailwindCSS",
            },
            {
                skill_icon: "/logo/bootstrap.svg",
                skill_title: "Bootstrap",
            },
            {
                skill_icon: "/logo/express.svg",
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
        id: "F003",
        position: "Front-End Developer, AI Developer",
        name: "พชรพล เจนพานิช",
        img_src: "/member/team/Chon.jpg",
        img_alt: "Pacharapol Jenpanich",
        img_style: "",
        email: "pacharapolpacharapol2547@gmail.com",
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
                skill_icon: "/logo/tailwind.svg",
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
                skill_icon: "/logo/express.svg",
                skill_title: "Express",
            },
        ],
        certificates: []
    },
    {
        id: "B001",
        position: "Back-End Developer , Tester",
        name: "ชินธรณ ชินคำ",
        img_src: "/member/team/north.jpg",
        img_alt: "Chinnathorn Chinkham",
        img_style: "",
        email: "chinnathornchinkham@gmail.com",
        skills: [
            {
                skill_icon: "/logo/js-1.svg",
                skill_title: "JavaScript",
            },
            {
                skill_icon: "/logo/python-1.svg",
                skill_title: "Python",
            },
            {
                skill_icon: "/logo/express.svg",
                skill_title: "Express",
            },
            {
                skill_icon: "/logo/postqres-1.svg",
                skill_title: "Postgres",
            },
            {
                skill_icon: "/logo/sql.svg",
                skill_title: "SQL",
            },
            {
                skill_icon: "/logo/mysql-1.svg",
                skill_title: "MySQL",
            },
            {
                skill_icon: "/logo/mongo-2.svg",
                skill_title: "MongoDb",
            },
            {
                skill_icon: "/logo/html-1.svg",
                skill_title: "HTML",
            },
            {
                skill_icon: "/logo/css-1.svg",
                skill_title: "CSS",
            },
        ],
        certificates: []
    },
    {
        id: "B002",
        position: "Back-End Developer",
        name: "จักรี วรรณทองสุข",
        img_src: "/member/team/ukij.jpg",
        img_alt: "Jakgree Wannathongsuk",
        img_style: "",
        email: "jakgree.wnts@gmail.com",
        skills: [
            {
                skill_icon: "/logo/express.svg",
                skill_title: "Express",
            },
            {
                skill_icon: "/logo/js-1.svg",
                skill_title: "Javascript",
            },
            {
                skill_icon: "/logo/postqres-1.svg",
                skill_title: "Postgres",
            },
            {
                skill_icon: "/logo/mysql-1.svg",
                skill_title: "MySQL",
            },
            {
                skill_icon: "/logo/mongo-2.svg",
                skill_title: "MongoDb",
            },
        ],
        certificates: []
    },
    {
        id: "UXI001",
        position: "UX/UI designer",
        name: "วนัสชาพร พลพัฒน์",
        img_src: "/member/team/noey.jpg",
        img_alt: "Wanatchaphon Phonphat",
        img_style: "",
        email: "noey.wanas@gmail.com",
        skills: [
            {
                skill_icon: "/logo/figma-1.svg", 
                skill_title: "Figma",
            },
            {
                skill_icon: "/logo/html-1.svg",
                skill_title: "HTML",
            },
            {
                skill_icon: "/logo/css-1.svg",
                skill_title: "CSS",
            },
            {
                skill_icon: "/logo/c.svg",
                skill_title: "C",
            },
            {
                skill_icon: "/logo/c++.svg",
                skill_title: "C++",
            },
            {
                skill_icon: "/logo/python-1.svg",
                skill_title: "Python",
            },
        ],
        certificates: []
    },
    {
        id: "UXI002",
        position: "UX/UI designer",
        name: "ดลนพร พันธัง",
        img_src: "/member/team/poii.jpg",
        img_alt: "Donnaporn Punthang",
        img_style: "",
        email: "donnaporn.study@gmail.com ",
        skills: [
            {
                skill_icon: "/logo/figma-1.svg", 
                skill_title: "Figma",
            },
            {
                skill_icon: "/logo/blender.svg",
                skill_title: "Blender",
            },
            {
                skill_icon: "/logo/adobe-xd.svg",
                skill_title: "AdobeXD",
            },
            {
                skill_icon: "/logo/adobe-ps.svg",
                skill_title: "AdobePS",
            },
            {
                skill_icon: "/logo/adobe-ai.svg",
                skill_title: "AdobeAI",
            },
            {
                skill_icon: "/logo/adobe-ae.svg",
                skill_title: "AdobeAE",
            },
            {
                skill_icon: "/logo/html-1.svg",
                skill_title: "HTML",
            },
            {
                skill_icon: "/logo/css-1.svg",
                skill_title: "CSS",
            },
            {
                skill_icon: "/logo/next-1.svg",
                skill_title: "NEXT.JS",
            },
            {
                skill_icon: "/logo/github.svg",
                skill_title: "Git",
            },
            {
                skill_icon: "/logo/c.svg",
                skill_title: "C",
            },
            {
                skill_icon: "/logo/c++.svg",
                skill_title: "C++",
            },
            {
                skill_icon: "/logo/python-1.svg",
                skill_title: "Python",
            },
        ],
        certificates: []
    },
]