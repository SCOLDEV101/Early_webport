'use client'
import React from 'react'
import Portfolio from '../components/portfolio';
import Enquiry from '../components/enquiry';
import Member from '../components/member';


function TestPage() {
    

    return (
        <>
            <div className="relative w-full flex items-center justify-center">
                {/* <Navbar /> */}
            </div>
            <Portfolio />
            <Enquiry />
            <Member />
        </>
    )
}

export default TestPage

