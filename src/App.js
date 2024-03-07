import './App.css';
import { NavBar } from './components/NavBar';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Footer } from './components/Footer';
import { Carousel } from './components/Carousel';
import {CardComponent, widthOfCard} from './components/placeholder';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styles } from './components/styles/style';
import {Container, Row, Col, Button} from 'react-bootstrap';
import AnimatedBackground from './components/AnimatedBackground';
import { Controller, Scene } from 'react-scrollmagic';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import CardPairTechnologiesAndProject from "./components/cardPairTechnologiesAndProject";
import { useActiveProject } from './components/MyContext.js';
import {Path} from './components/Path';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);





function App() {
    const containerRef = useRef(null);
    const divWithAnimatedBackgroundRef = useRef(null);
    const cardContainer = useRef();
    const firstContainer = useRef();
    const secondContainer = useRef();
    const thirdContainer = useRef();
    const nextSectionButtonRef = useRef();

    const { activeProject, setActiveProject } = useActiveProject();





    const [matches, setMatches] = useState(window.matchMedia("(min-width: 1025px)").matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        const mediaQuery = window.matchMedia("(min-width: 1025px)");
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);


    const { contextSafe } = useGSAP({scope: nextSectionButtonRef.current});

    useGSAP(() => {
        let lastScrollTime = 0;

        const handleWheel = (e) => {
            e.preventDefault();

            const currentTime = new Date().getTime();
            if (currentTime - lastScrollTime < 800) {
                return;
            }

            lastScrollTime = currentTime;

            const windowHeight = window.innerHeight;
            const totalScrollHeight = document.body.scrollHeight;
            const currentScroll = window.scrollY;
            let nextScroll;

            if (e.deltaY > 0) {
                if (currentScroll >= totalScrollHeight - windowHeight - 150) {
                    nextScroll = totalScrollHeight - windowHeight;
                } else {
                    nextScroll = Math.min(currentScroll + windowHeight, totalScrollHeight - windowHeight - 150);
                }
            } else {
                if (currentScroll >= totalScrollHeight - windowHeight && currentScroll < totalScrollHeight - 150) {
                    nextScroll = totalScrollHeight - windowHeight - 150;
                } else {
                    nextScroll = Math.max(currentScroll - windowHeight, 0);
                }
            }

            gsap.to(window, {duration: 0, scrollTo: {y: nextScroll, autoKill: false}});
        };

        window.addEventListener('wheel', handleWheel, {passive: false});

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    useGSAP((context, contextSafe) => {

        gsap.utils.toArray('.cardRight, .cardLeft').forEach((element) => {
            const directionMultiplier = element.classList.contains('cardLeft') ? -1 : 1;
            const moveX = `${directionMultiplier * (parseFloat(widthOfCard) / 2 + (45 - parseFloat(widthOfCard)))}vw`;

            const parentCardPair = element.closest('.cardPair');


            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    markers: true,
                    endTrigger:parentCardPair,
                    end: "bottom bottom",
                    scrub: true,
                },
                x: moveX,
            });
        });


    }, {scope: cardContainer});


    const scrollToNextSection = contextSafe(() => {
        const nextSection = document.getElementById('nextSection');
        if (nextSection) {
            gsap.to(window, {
                scrollTo: { y: nextSection.offsetTop, autoKill: false },
                ease: "expo.out",
                duration: 0,
            });
        }

    });

    return (
        <div className="App" style={styles.Body} ref={containerRef}>

            <div style={{height:"50vh", width:"100vw"}}>
                <NavBar />

                <div ref={divWithAnimatedBackgroundRef} className="d-flex flex-column align-items-center justify-content-center" style={{width:"100vw", height:'25vh'}}>
                    <AnimatedBackground checkCondition={true} parentRef={divWithAnimatedBackgroundRef}/>

                </div>
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center" style={styles.ContainerTop}>


                <Button ref={nextSectionButtonRef} className="btn btn-default" type="button" aria-haspopup="true" aria-expanded="true" variant="primary" style={styles.NextSectionButton} onClick={scrollToNextSection}>
                    <i className="bi bi-arrow-down"></i>
                </Button>

            </div>

            <div id="nextSection" className="BodyOfSecondSection" style={styles.ContainerBottom}>

                    <Container ref={cardContainer} style={styles.CardsContainer}>
                        <div className="cardPair" id="firstPair" style={styles.CardPair}>
                            <CardPairTechnologiesAndProject matches={matches} firstContainer={firstContainer}/>
                            <div style={{}}>
                                {/*<Carousel />*/}
                            </div>
                        </div>
                        <div className="PathContainer" id="secondPair" style={styles.CardPair}>
                            <div ref={secondContainer} className="PathCenter" style={styles.PathContainer} >
                                <Path />
                            </div>
                            {/*<div className="newCardLeft" style={{position:'absolute', top:0, right:0, backgroundColor:'gray'}}>
                            </div>*/}
                        </div>
                        <div className="cardPair" id="thirdPair" style={styles.CardPair}>
                            <div className="newCardRight" style={{position:'absolute', top:0, left:0,}}>
                                no kawal tekstu
                            </div>
                            <div ref={thirdContainer} className="cardRight">
                                <CardComponent placement="start" title="Hire Me!" textToCard={"esa"} textToOffcanvas={"ase"} isWide={matches}/>
                            </div>
                        </div>
                    </Container>




            </div>

            <div id="footer" className="text-center" style={{ backgroundColor: '#10110b', width: '100%' }}>
                <Footer />
            </div>
        </div>
    );
}

export default App;
