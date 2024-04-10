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
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);





function App() {
    const containerRef = useRef(null);
    const divWithAnimatedBackgroundRef = useRef(null);
    const cardContainer = useRef();
    const firstContainer = useRef();
    const secondContainer = useRef();
    const thirdContainer = useRef();
    const nextSectionButtonRef = useRef();
    const tlForMovingDiv = useRef();

    const { activeProject, setActiveProject, matches, matchesRef } = useActiveProject();


    const [showPopout, setShowPopout] = useState(false);


    useEffect(() => {
        //const handler = e => setMatches(e.matches);
        //const mediaQuery = window.matchMedia("(min-width: 1025px)");

        const handleResize = () => {
            const actualPosition = window.scrollY;
            let snap = gsap.utils.snap(window.innerHeight);
            window.scrollTo(0, snap(actualPosition));
        };

        //mediaQuery.addEventListener('change', handler);
        window.addEventListener('resize', handleResize);

        return () => {
            //mediaQuery.removeEventListener('change', handler);
            window.removeEventListener('scroll', handleResize);
        }
    }, []);




    const { contextSafe } = useGSAP({scope: nextSectionButtonRef.current});



    useGSAP(() => {
        if(matchesRef.current) {
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

                if(e.type==="wheel") {
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
                } else if(e.type==="keydown"){
                    if(e.key === "ArrowUp"){
                        nextScroll= Math.max(currentScroll - windowHeight, 0);
                    }else if(e.key === "ArrowDown"){
                        nextScroll= Math.min(currentScroll + windowHeight, totalScrollHeight - windowHeight);
                    }
                }

                gsap.to(window, {duration: 0, scrollTo: {y: nextScroll, autoKill: false}});
            };

            window.addEventListener('wheel', handleWheel, {passive: false});

            window.addEventListener('keydown', handleWheel, {passive:false})
            return () => {
                window.removeEventListener('wheel', handleWheel);
                window.removeEventListener('keydown', handleWheel);

            };
        }
    }, []);

    useGSAP((context, contextSafe) => {
        if(matchesRef.current) {

            gsap.utils.toArray('.cardRight, .cardLeft').forEach((element) => {
                const directionMultiplier = element.classList.contains('cardLeft') ? -1 : 1;
                const moveX = `${directionMultiplier * (parseFloat(widthOfCard) / 2 + (45 - parseFloat(widthOfCard)))}vw`;

                const parentCardPair = element.closest('.cardPair');


                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top bottom",
                        markers: false,
                        endTrigger: parentCardPair,
                        end: "bottom bottom",
                        scrub: true,
                    },
                    x: moveX,
                });
            });
        }

    }, {scope: cardContainer});


    const scrollToNextSection = contextSafe(() => {
        {/*if(matchesRef.current) {*/}
            const nextSection = document.getElementById('nextSection');
            if (nextSection) {
                gsap.to(window, {
                    scrollTo: {y: nextSection.offsetTop, autoKill: false},
                    ease: "expo.out",
                    duration: 0,
                });
            }
        {/* }else{
            setShowPopout(true);
        }*/}

    });

    const handleClick = contextSafe((event) => {
        const clickX = event.clientX;
        const clickY = event.clientY;
        const dimensionsOfDiv = thirdContainer.current.getBoundingClientRect();
        const point = {x: dimensionsOfDiv.width/2, y: dimensionsOfDiv.height/2}
        const rawPath = MotionPathPlugin.convertCoordinates(thirdContainer.current, {x:clickX, y:clickY}, point)

        tlForMovingDiv.current = gsap.timeline();

        tlForMovingDiv.current.to(thirdContainer.current, {
            x:(clickX-(dimensionsOfDiv.width/2)),
            y:(clickY-(dimensionsOfDiv.height/2)),
            duration:2,
        }).to(thirdContainer.current, {
            scale:0.5,
            duration:0.5,
        }, "<").to(thirdContainer.current, {
            scale:1,
            duration:1,
        }, ">");

    })

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
                {showPopout && (
                    <div style={{color:'red'}}>
                        Page is currently being prepared for full responsiveness. Currently, it can only be utilized under the condition checked: (min-width: 1025px).
                    </div>
                    )}

            </div>

            {/*{matchesRef.current ? (*/}
            <div id="nextSection" className="BodyOfSecondSection" style={styles.ContainerBottom}>

                    <Container ref={cardContainer} style={styles.CardsContainer}>
                        <div className="cardPair" id="firstPair" style={styles.CardPair}>
                            <CardPairTechnologiesAndProject matches={matches} firstContainer={firstContainer}/>
                        </div>
                        <div className="PathContainer" id="secondPair" style={styles.CardPair}>
                            <div ref={secondContainer} className="PathCenter" style={styles.PathContainer} >
                                <Path ref={secondContainer}/>
                            </div>
                            {/*<div className="newCardLeft" style={{position:'absolute', top:0, right:0, backgroundColor:'gray'}}>
                            </div>*/}
                        </div>
                        <div className="cardPair" id="thirdPair" style={{...styles.CardPair}} onClick={handleClick}>
                            <div ref={thirdContainer} className="divToMove">
                                <h5>Click somewhere outside this div!</h5>
                                {matchesRef.current && (
                                    <div>
                                        <p>I created this website to enhance my understanding of GSAP animations and to learn React better</p>
                                        <p style={{textAlign:'left'}}>I know it's just the start of my journey, but I'm very excited about it!</p>
                                    </div>
                                )}

                            </div>
                        </div>
                    </Container>




            </div>
            {/*): null}*/}

            <div id="footer" className="text-center" style={{ backgroundColor: '#10110b', width: '100%' }}>
                <Footer />
            </div>
        </div>
    );
}

export default App;
