import React from 'react'
import Navbar from '../components/navbar'

type Props = {}

function TestPage({ }: Props) {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar/>
        </div>
    )
}

export default TestPage