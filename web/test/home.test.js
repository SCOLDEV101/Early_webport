import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page.tsx"

describe("Home test ", () => {

    // สำหรับแต่ละ test ให้ render Home ก่อนทำ test
    beforeEach(() => {
        render(<Home />);
    });

    test("Big text is <h1>",()=>{
        // query หา element ด้วย text
        const element1 = screen.getAllByText(/"เปลี่ยนไอเดียของคุณให้กลายเป็นเว็บไซต์ระดับมืออาชีพ!"/i);
        // find element ที่ tagName เป็น <h1>
        const bigText = element1.find((el) => el.tagName.toLowerCase() === "h1");
        // คาดหวังให้เจอ ใน html
        expect(bigText).toBeInTheDocument();
    })

    test("Small text check",()=>{
        // query หา element ด้วย text
        const smallText1 = screen.getByText(/เราพร้อมพัฒนาเว็บไซต์ เพื่อตอบโจทย์ความต้องการของคุณโดยเฉพาะ/i);
        const smallText2 = screen.getByText(/อย่าปล่อยให้ไอเดียของคุณเป็นแค่ความฝัน!/i)
        // expect ให้ render แล้วเจอ smalltext1
        expect(smallText1).toBeInTheDocument()
        // expect ให้ render แล้วเจอ smalltext2
        expect(smallText2).toBeInTheDocument()
    })

    test("Web button check",() => {
        const toWeb = screen.getByText(/Web/i);
        expect(toWeb).toBeInTheDocument();
    })

    test("Mobile button check",() => {
        const toMobile = screen.getByText(/Mobile/i);
        expect(toMobile).toBeInTheDocument();
    })

    test("All button check",() => {
        const toAll = screen.getByText(/All/i);
        expect(toAll).toBeInTheDocument();
    })
})