import React, {useState, forwardRef, useRef} from 'react';
import {CardComponent} from './placeholder';
import { useActiveProject } from './MyContext.js';


const CardPairTechnologiesAndProject = forwardRef((props, firstContainer) =>{
    const iconWrapperRef = useRef(null);



    return (
        <div ref={firstContainer}
             className="cardRight"
             style={{
                 display:'flex',
                 flexDirection:'column',
                }}>
            <CardComponent
                placement="start"
                title="Technologies"
                textToCard={"esa"}
                textToOffcanvas={"ase"}
                isWide={props.matches}
                background={'#052c5c'}
                iconWrapperRef={iconWrapperRef}
            />
            <CardComponent
                placement="start"
                title="Projects"
                textToCard={"esa"}
                textToOffcanvas={"ase"}
                isWide={props.matches}
                background={"transparent"}
                iconWrapperRef={iconWrapperRef}
            />
        </div>
    );

});

export default CardPairTechnologiesAndProject;