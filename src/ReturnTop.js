import { Component } from "react";


import './ReturnTop.css';
import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';


function ReturnTop() {

    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }
    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 500) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        console.log(window.scrollY)
        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, [])

    return showButton && (
        <div className="scroll__container">
            <button id="top" onClick={scrollToTop} type="button" > 
            <Icon icon="ph:caret-up-thin" width="32" height="32" /> </button>
        </div>

    )
}


export default ReturnTop;




