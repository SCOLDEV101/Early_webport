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