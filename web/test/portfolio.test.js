import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Portfolio from "../src/app/components/portfolio.tsx"

describe("Portfolio test",() => {
    //ให้ render <Portfolio />
    beforeEach(() => {
        render(<Portfolio />);
    })

    test("Portfolio Header check",() => {
        //query หา คำว่า Portfolio ตอนเทสเจอหลายตัวเลยใช้ getAllByText()
        const element1 = screen.getAllByText(/Portfolio/i);
        //หา element ที่เป็น <h1>
        const headPortfolio = element1.find((el) => el.tagName.toLowerCase() === "h1");
        // คาดหวังให้เจอ Portfolio Header ใน html
        expect(headPortfolio).toBeInTheDocument();
    })

    test("K-link check", () => {
        const element1 = screen.getByText(/K-LINK/i);
        expect(element1).toBeInTheDocument();
    })

    test("OfficeSCOLDEV check", () => {
        const element1 = screen.getByText(/OfficeSCOLDEV/i);
        expect(element1).toBeInTheDocument();
    })

    test("Mushroom Classification check", () => {
        const element1 = screen.getByText(/Mushroom Classification/i);
        expect(element1).toBeInTheDocument();
    })
    
    test("PopcornTime check", () => {
        const element1 = screen.getByText(/PopcornTime/i);
        expect(element1).toBeInTheDocument();
    })

    test("Web-PortFolio Silver check", () => {
        const element1 = screen.getByText(/Web-PortFolio Silver/i);
        expect(element1).toBeInTheDocument();
    })

    test("Web-PortFolio Blue check", () => {
        const element1 = screen.getByText(/Web-PortFolio Blue/i);
        expect(element1).toBeInTheDocument();
    })

    // test("mobile, web check", () => {
    //     const element1 = screen.getByText();
    //     expect(element1).toBeInTheDocument();
    // })
})