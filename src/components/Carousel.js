import React, {useRef, useEffect, useState, useLayoutEffect, forwardRef, useImperativeHandle} from 'react';
import { Container, Button } from 'react-bootstrap';
import { styles } from './styles/style';
import 'bootstrap-icons/font/bootstrap-icons.css';
import projectImages from "./styles/projectImagesImport";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import leftArrow from "./styles/images/arrowIcons/caret-left-fill.svg"
import rightArrow from "./styles/images/arrowIcons/caret-right-fill.svg"
import './../App.css';
import {useActiveProject} from "./MyContext";



export const projectsData = [
    {image: [projectImages.loginPoker,
            projectImages.pokerTable,
            projectImages.pokerTable2],
        title: "Poker - Texas Holdem.",
        tech: "Java, JavaFX, MySql.",
        description: "<b>Server-Client Communication:</b> Ensures real-time interaction and synchronization between multiple players and the game server.<br>" +
            "<b>Game Logic Implementation:</b> Manages the rules of poker, including hand evaluation, betting mechanics, and game progression.<br>" +
            "<b>Graphical User Interface:</b> Offers an engaging and intuitive interface for players to interact with the game, making the poker game accessible to users with varying levels of expertise.<br>" +
            "<b>Data Persistence:</b> Allows for the storage and retrieval of game data, supporting features like game history, player statistics, and leaderboards.<br><br>"
    },
    {
        image: [projectImages.whaleNotesLoginRegister,
            projectImages.whaleNotesWelcomeScreen,
            projectImages.whaleNotesMainScreen,
            projectImages.whaleNotesMap],
        title:'WhaleNotes - team management app',
        tech:"React Native, Firebase, Google",
        description:"Project of team management app<br>I developed this application as part of a university project, in this case, together with my colleague. We implemented Google login, Firebase database, Google Maps, and notifications.",
    },
    {
        image:[projectImages.exerciseDiaryLogin,
            projectImages.exerciseDiaryRegister,
            projectImages.exerciseDiaryMainWindow,
            projectImages.exerciseDiaryDifferentOptions,
            projectImages.exerciseDiaryRank,
            projectImages.exerciseDiaryChart],
        title:'Exercise diary',
        tech:"C++, Qt",
        description:"Project of exercise diary create with C++ and Qt<br>The application created as part of a university project allows tracking sports results. Since it is a desktop application, it's not particularly useful in reality. However, during its development, I became more familiar with the C++ language and the Qt framework.",
    },
    {
        image: [projectImages.azure,
            projectImages.python,
            projectImages.wphp1,
            projectImages.wphp2,
            projectImages.dbphp,
            projectImages.dbphp2],
        title:'Other',
        tech:"Python, php, Azure Cloud",
        description:"Other technologies. Currently, I am in the process of taking the Azure Fundamentals 900 course.",
    }
];

export const Carousel = forwardRef(({}, ref) => {

    const DescriptionSection = forwardRef(({}, ref) => {

        useGSAP(() => {
            gsap.fromTo(ref.current, {
                x:'-100%',
            },{
                duration:1.5,
                ease: 'back.out(1)',
                x:'0%',
            })

        }, )
      return (
          <div id="description" className="description" ref={ref}>
          <dl>
              <p>
                  <dt>
                      - {projectsData[activeProject].tech}
                  </dt>
              </p>
              <dd>
                  <p dangerouslySetInnerHTML={{__html: projectsData[activeProject].description}}></p>
              </dd>
          </dl>
      </div>
      )
    });

    const { activeProject, setActiveProject, matchesRef } = useActiveProject();




    const carouselContainer = useRef();
    const imageContainer = useRef();
    const descriptionRef = useRef();
    const tl = useRef();
    const {contextSafe} = useGSAP({scope: carouselContainer});
    const [activeSlide, setActiveSlide] = useState(0);
    const maxSlides = projectsData[activeProject].image?.length || 0;



    const goToSlide = contextSafe((index) => {
        setActiveSlide(index);
        gsap.to(imageContainer.current, {
            duration: 0.5,
            x: `${index * -(100 / maxSlides)}%`,
        });
    });


    const onClickLeft = () => {
        const newIndex = activeSlide - 1 < 0 ? maxSlides - 1 : activeSlide - 1;
        goToSlide(newIndex);
    };

    const onClickRight = () => {
        const newIndex = activeSlide + 1 >= maxSlides ? 0 : activeSlide + 1;
        goToSlide(newIndex);
    };

    const renderImages = projectsData[activeProject].image?.map((image, index) => {

        return(
        <div key={index} style={matchesRef.current ? {height: '50vh', width: '37.5vw', margin:'5px', flex:'1'}
        : {height:'100%', width:'75vw', }}>
            <img src={image} style={{
                position:"relative",
                display:'flex',
                height:'100%',
                objectFit: 'contain',
                width: '100%',
                }} />
        </div>
    )});

    const renderDots = Array.from({ length: maxSlides }).map((_, index) => {
        const iconName = `bi bi-${index + 1}-square`;
        return (
            <span key={index} className={`dot ${index === activeSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)} style={{
                margin: '0 2px',
                cursor:'pointer',
            }}>
            <i className={iconName}></i>
        </span>
        )
    });



    const onClick = contextSafe(() => {
        gsap.to(carouselContainer.current, {
            opacity: 0,
            duration:0.5,
        });
    });

    useImperativeHandle(ref, () => ({
        onClick: () => onClick(),
    }));

    useGSAP(() => {
        gsap.fromTo(carouselContainer.current, {
            opacity: 0,
        }, {
            opacity: 1,
            duration:1.5,
        });

    }, [activeProject]);



    return (
        <div ref={carouselContainer} style={matchesRef.current ?
            {height:'50vh',width:'37.5vw', display:'flex', flexDirection:'row', position:'relative',}
        : {backgroundColor:'', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'1rem',}}>
            {/*<div id="description" className="description" ref={descriptionRef}>
                <dl>
                    <p>
                        <dt>
                            - {projectsData[activeProject].tech}
                        </dt>
                    </p>
                    <dd>
                        <p dangerouslySetInnerHTML={{__html: projectsData[activeProject].description}}></p>
                    </dd>
                </dl>
            </div>*/}
            {matchesRef.current ? (<DescriptionSection ref={descriptionRef}/>) : null}
            <div style={
                matchesRef.current ? {
                display:'flex',
                flexDirection:'row',
                height: '50vh',
                width:'37.5vw',
                position:'relative',
            } : {
                    display:'flex',
                    flexDirection:'row',
                    height: '30vh',
                    width:'75vw',
                    position:'relative',
                }}>

                <span onClick={onClickLeft} className="custom-cursorLeft" style={{
                    backgroundColor:'transparent',
                    zIndex:'2',
                    border: '0px',
                    width:'55%',
                    height:'100%',
                    position:'absolute',
                    left:'-5%',
                    display:'flex',
                    justifyContent:'flex-start',
                    alignItems:'center',
                }}>
                    <i className="bi bi-caret-left-fill"></i>
                </span>


                <div style={{
                    position: 'relative',
                    display: 'flex',
                    overflow:'hidden',
                    flex: 1,

                }}>
                        <div ref={imageContainer} style={{
                            position: 'relative',
                            height: '100%',
                            display:'flex',
                            flexDirection:'row',


                    }}>
                            {renderImages}
                        </div>
                    </div>


                <span onClick={onClickRight} className="custom-cursorRight" style={{
                    backgroundColor:'transparent',
                    zIndex:'2',
                    border: '0px',
                    width:'55%',
                    height:'100%',
                    position:'absolute',
                    left:'50%',
                    display:'flex',
                    justifyContent:'flex-end',
                    alignItems:'center',
                }}>
                    <i className="bi bi-caret-right-fill"></i>
                </span>
            </div>
            <div style={{
                zIndex:'3',
                position:'absolute',
                display: 'flex',
                justifyContent: 'center',
                top:'100%',
                left:'50%',
                transform:'translate(-50%)'
            }}>
                {renderDots}
            </div>
        </div>
    );
});

