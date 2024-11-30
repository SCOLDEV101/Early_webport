import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "../src/app/components/navbar.tsx"

describe("Navbar test ", () => {
    const origin_location = window.location;
    beforeEach(() => {
        render(<Navbar />);
        global.window = { location: { pathname: null, hash: null} };
    });

    afterAll(() => {
        global.window = origin_location;
    });

    test("check logo SCOLDEV", () => {
        // กำหนดตัวแปรแทน element ที่เป็น tag <img/> กำหนดจาก tag html หรือ attribute role="" ภายใน tag
        const logoScoldev = screen.getByRole("img");
        // คาดหวังให้พบ attribute <img alt="logo"/>
        expect(logoScoldev).toHaveAttribute("alt", "logo");
        // คาดหวังให้พบ attribute <img src="./navbar-logo.svg"/>
        expect(logoScoldev).toHaveAttribute("src", "./navbar-logo.svg");
    })

    //test home check
    test("check Home", async () => {
        // check เจอ Home ใน html
        const toHome = screen.getByRole("link", { name: /Home/i });
        expect(toHome).toBeInTheDocument();
        expect(toHome.tagName.toLocaleLowerCase()).toBe("a");
        // check Home เป็น <h5>
        const textHome = screen.getByText(/Home/i);
        expect(textHome.tagName.toLocaleLowerCase()).toBe("h5");
        // check พาไป section #home
        expect(toHome).toHaveAttribute("href", "#home");
        fireEvent.click(toHome);
        await waitFor(() => {
            expect(window.location.hash).toBe("#home");
        });
    })

    //test portfolio check href
    test("check Portfolio", async () => {
        // check ว่าเจอ link portfolio
        const toPorfolio = screen.getByRole("link", { name: /Portfolio/i });
        expect(toPorfolio).toBeInTheDocument();
        // check ว่า Portfolio เป็น <h5>
        const textPortfolio = screen.getByText(/Portfolio/i)
        expect(textPortfolio.tagName.toLocaleLowerCase()).toBe("h5");
        // check พาไป section #portfolio
        expect(toPorfolio).toHaveAttribute("href", "#portfolio");
        fireEvent.click(toPorfolio);
        await waitFor(() => {
            expect(window.location.hash).toBe('#portfolio');
        });
    })

    //test about check href
    test("check About", async () => {
        // check เจอ About ใน html
        const aboutMenu = screen.getByText(/About >/i);
        expect(aboutMenu).toBeInTheDocument();
        // จำลองการคลิกที่ About
        fireEvent.click(aboutMenu);
        // check ว่าขึ้น ประวัติการทำงาน
        const toHistory = screen.getByRole("link", { name: /ประวัติการทำงาน/i });
        expect(toHistory).toBeInTheDocument();
        // check ว่าขึ้น Contact
        const toContact = screen.getByRole("link", { name: /Contact/i });
        expect(toHistory).toBeInTheDocument();
        // check ว่าขึ้น Services
        const toServices = screen.getByRole("link", { name: /Services/i });
        expect(toServices).toBeInTheDocument();
        // check ว่าขึ้น Member
        const toMember = screen.getByRole("link", { name: /Member/i });
        expect(toMember).toBeInTheDocument();
        // check เปลี่ยนหน้า ไป ประวัติการทำงาน
        expect(toHistory).toHaveAttribute("href", "/hobby");
        fireEvent.click(toHistory);
        await waitFor(() => {
            expect(window.location.pathname).toContain("/hobby");
        });
        // check เปลี่ยนหน้า ไป Contact
        expect(toContact).toHaveAttribute("href", "/individual");
        fireEvent.click(toContact);
        await waitFor(() => {
            expect(window.location.pathname).toContain("/individual");
        });
        // check เปลี่ยนหน้า ไป Services
        expect(toServices).toHaveAttribute("href", "/team");
        fireEvent.click(toServices);
        await waitFor(() => {
            expect(window.location.pathname).toContain("/team");
        });
        // check เปลี่ยนหน้า ไป Member
        expect(toMember).toHaveAttribute("href", "/enterprise");
        fireEvent.click(toMember);
        await waitFor(() => {
            expect(window.location.pathname).toContain("/enterprise");
        });
    })

    //test enquiry check href
    test("check Enquiry", async () => {
        // check เจอ Enquiry ใน html
        const toEnquiry = screen.getByRole("button", { name: /Enquiry/i });
        expect(toEnquiry).toBeInTheDocument();
        // พาไป section #enquiry
        expect(toEnquiry).toHaveAttribute("href", "#enquiry");
        fireEvent.click(toEnquiry);
        await waitFor(() => {
            expect(window.location.hash).toBe('#enquiry');
        });
    })
});