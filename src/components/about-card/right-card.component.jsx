import React, {useEffect, useRef} from 'react';
import {withRouter} from "react-router-dom";
import {gsap,Power1, Power0} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"

import "./right-card.styles.scss";

import { animationfunc } from '../../utils/button-animations/otherfuncs';

gsap.registerPlugin(ScrollTrigger);

const RightCard = ({headerText, routeName, image, desc, history}) => {
    let cardref = useRef(null);
    let headerref = useRef(null);
    let headerTextref = useRef(null);

    useEffect(()=>{
        gsap.to(cardref,{
            duration: 0.2,
            opacity: 1,
            ease: Power1.easeIn,
        })
        gsap.to(headerref,{
            duration: 0.5,
            opacity: 1,
            left: 0,
            ease: Power0.easeIn,
            delay: 1,
            scrollTrigger:{
                trigger: cardref,
            }
        })

        gsap.to(headerTextref,{
            duration: 0.5,
            transform: "translateY(0%)",
            ease: Power0.easeIn,
            delay: 3,
            scrollTrigger:{
                trigger: cardref,
            }
        })

    })


    return (
        <div ref={e=>cardref=e} className="right-card">
            <div ref={e=>headerref=e} className="right-card__header">
                <span onClick={()=>history.push(`${routeName}`)} className="right-card__header__text" ref={(e)=>headerTextref=e} >{headerText}</span>
            </div>
            <div className="right-card__img">
                <img className="right-card__img__raw" src={image} alt="nothing"/>
            </div>
            <div className="right-card__desc">
                <span className="right-card__desc__main">{desc}</span>
                <span 
                onClick={()=>history.push(`${routeName}`)} 
                className="right-card__desc__link button__styles drive"
                onMouseEnter={(e)=>animationfunc(e)}
                >{'Proceed'}</span>
            </div>
        </div>
    )
}

export default withRouter(RightCard);