'use client'
import React, { useState } from 'react'
import Navbar from '../components/navbar'
import Link from "next/link";
import Image from "next/image";
import { portfolio_data } from '../constants/staticData';
import Portfolio from '../components/portfolio';
import Member from '../components/member';

type Props = {}

function TestPage({ }: Props) {
    

    return (
        <>
            <div className="relative w-full flex items-center justify-center">
                {/* <Navbar /> */}
            </div>
            <Member />
        </>
    )
}

export default TestPage

