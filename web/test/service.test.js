import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Service from "../src/app/components/service.tsx"

describe("Service test",() => {
    // ให้ render <Service />
    beforeEach(() => {
        render(<Service />);
    })

    test("Services Header check",() => {
        //query หา คำว่า Services ทั้งหมด
        const element1 = screen.getAllByText(/Services/i);
        //หา element ที่เป็น <h1>
        const headServices = element1.find((el) => el.tagName.toLowerCase() === "h2");
        // คาดหวังให้เจอ Services Header ใน html
        expect(headServices).toBeInTheDocument();
    })

    describe("Services lists check",() => {
        test("Responsive Website ?", () => {
            const element1 = screen.getByText(/Responsive Website/i);
            expect(element1).toBeInTheDocument();
            expect(element1.tagName.toLocaleLowerCase()).toBe("h3");
        })
        test("Responsive Website ?", () => {
            const element1 = screen.getByText(/Responsive Website/i);
            expect(element1).toBeInTheDocument();
            expect(element1.tagName.toLocaleLowerCase()).toBe("h3");
        })
        test("Portfolio Website ?", () => {
            const element1 = screen.getByText(/Portfolio Website/i);
            expect(element1).toBeInTheDocument();
            expect(element1.tagName.toLocaleLowerCase()).toBe("h3");
        })
        test("E-commerce Website ?", () => {
            const element1 = screen.getByText(/E-commerce Website/i);
            expect(element1).toBeInTheDocument();
            expect(element1.tagName.toLocaleLowerCase()).toBe("h3");
        })
        test("Coperate Website ?", () => {
            const element1 = screen.getByText(/Coperate Website/i);
            expect(element1).toBeInTheDocument();
            expect(element1.tagName.toLocaleLowerCase()).toBe("h3");
        })
        test("Mobile Application ?", () => {
            const element1 = screen.getByText(/Mobile Application/i);
            expect(element1).toBeInTheDocument();
            expect(element1.tagName.toLocaleLowerCase()).toBe("h3");
        })
        test("Attendance System ?", () => {
            const element1 = screen.getByText(/Attendance System/i);
            expect(element1).toBeInTheDocument();
            expect(element1.tagName.toLocaleLowerCase()).toBe("h3");
        })
    })
    
})