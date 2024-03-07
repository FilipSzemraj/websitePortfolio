import React, {useState, useRef, useEffect, useImperativeHandle, forwardRef} from 'react';
import Card from 'react-bootstrap/Card';
import { OffcanvasFirst } from './offcanvas';
import { styles } from './styles/style';
import { ReactComponent as FirebaseIcon } from './styles/images/technologyIcons/firebase1.svg';
import { ReactComponent as AzureIcon } from './styles/images/technologyIcons/azure.svg';
import { ReactComponent as CplusIcon } from './styles/images/technologyIcons/c++.svg';
import { ReactComponent as GoogleIcon } from './styles/images/technologyIcons/gcloud.svg';
import { ReactComponent as GithubIcon } from './styles/images/technologyIcons/github.svg';
import { ReactComponent as JavaIcon } from './styles/images/technologyIcons/java.svg';
import { ReactComponent as PhpIcon } from './styles/images/technologyIcons/php.svg';
import { ReactComponent as PythonIcon } from './styles/images/technologyIcons/python.svg';
import { ReactComponent as ReactIcon } from './styles/images/technologyIcons/reactjs.svg';
import { ReactComponent as SqlIcon } from './styles/images/technologyIcons/sql.svg';
import { Carousel } from './Carousel';
import {Button} from 'react-bootstrap';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./../App.css";
import { useActiveProject } from './MyContext.js';






export const widthOfCard = '50vw';
function CardComponent({ placement, title, textToCard, textToOffcanvas, isWide, background, iconWrapperRef}) {


    const { activeProject, setActiveProject } = useActiveProject();

    const imageRef = useRef(null);
    const buttonRefs = useRef([]);




    const cardStyle = {



        border: '1px solid transparent',
        backgroundColor: background,
        color:"#f0f0f0",
        ...(isWide ? {
            width: widthOfCard,
        } : {
            width: '42.5vw',
        }),
    };

    function handleFadeIn(projectId) {
        setActiveProject(projectId);
    }




    const IconWrapper = forwardRef(({ children, activeProject }, ref) => {
        const { contextSafe } = useGSAP();

        const iconsRef = useRef([]);

        const wholeHeight = isWide
            ? parseFloat(styles.TechnologySectionWide.height)
            : parseFloat(styles.TechnologySectionNarrow.height);
        const gap = isWide
            ? parseFloat(styles.TechnologySectionWide.gap)
            : parseFloat(styles.TechnologySectionNarrow.gap);

        const childrenCount = React.Children.count(children);

        const tempHeight =
            (wholeHeight - gap * (childrenCount - 1)) / Math.ceil(childrenCount / 3);

        const projectTechnologies = {
            0: [4, 5, 6],
            1: [0, 3, 4, 9],
            2: [2, 4, 6],
            3: [1, 7, 8],
        };


        const onClick = contextSafe((projectId) => {
            gsap.to(iconsRef.current, {
                opacity: 0,
                duration:0.5,
                onComplete: () => handleFadeIn(projectId),
            });
        });

        useImperativeHandle(ref, () => ({
            onClick: (projectId) => onClick(projectId),
        }));

        useGSAP(() => {
            gsap.fromTo(iconsRef.current, {
                opacity: 0,
                scale: 0.8,
            }, {
                opacity: 1,
                scale: i => projectTechnologies[activeProject]?.includes(i) ? 1.05 : 0.8,
                filter: y => projectTechnologies[activeProject]?.includes(y) ? 'none' : 'grayscale(100%)',
                stagger: 0.1
            });
        }, [activeProject]);

        return React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
                ref: (el) => (iconsRef.current[index] = el),
                style: {
                    ...child.props.style,
                    ...(isWide
                        ? {
                            height: '80%',
                        }
                        : {
                            height: `${tempHeight}vh`,
                        }),
                },
            })
        );
    });

    const TechnologyBody = forwardRef(({ activeProject }, ref) => {
        return (
            <IconWrapper activeProject={activeProject} ref={ref}>
                <FirebaseIcon />
                <AzureIcon />
                <CplusIcon />
                <GoogleIcon />
                <GithubIcon />
                <JavaIcon />
                <SqlIcon />
                <PhpIcon />
                <PythonIcon />
                <ReactIcon />
            </IconWrapper>
        );
    });

    function buttonHandler(projectId) {
        if (iconWrapperRef.current) {
            iconWrapperRef.current.onClick(projectId);
            imageRef.current.onClick();
        }
    }


    const TechnologyCanvas = () => (
        ""
    );

    const PathBody = () => (
        "Path body"
    );

    const PathCanvas = () => (
        "Path canvas"
    );

    const HireMeBody = () => (
      "Hire Me!"
    );

    const HireMeCanvas = () => (
        "Hire me canvas"
    );


    function ProjectsBody() {
        const { contextSafe } = useGSAP();


        const fadeOutButton = contextSafe(() => {
            gsap.to(buttonRefs.current[activeProject], {
                backgroundColor: 'transparent',
                duration: 0.3 // Animation duration in seconds
            });
        });

        const handleProjectClick = (projectId) => {
            buttonHandler(projectId);
            fadeOutButton();

        };

        const projectsMap = {
            "Texas Holdem Poker - Java": () => handleProjectClick(0),
            "Management App - React Native": () => handleProjectClick(1),
            "Exercise Diary - C++": () => handleProjectClick(2),
            "Other skills": () => handleProjectClick(3),
        };

        return (
            <div>
                {Object.entries(projectsMap).map(([projectName, projectFunction], index) => (
                    <button
                        variant="outline-light"
                        key={projectName}
                        onClick={projectFunction}
                        ref={el => buttonRefs.current[index] = el} // Assigning ref
                        className={`custom-button ${index == activeProject ? 'active-button' : ''}`}>
                        {projectName}
                    </button>
                ))}
            </div>
        );
    }

    const ProjectsCanvas = () => {
        return(
            <OffcanvasFirst placement={placement} body={<Carousel ref={imageRef} />} />
        )
    };


    const componentMap = {
        "Technologies": {
            body: TechnologyBody,
            canvas: TechnologyCanvas,
        },
        "Path": {
            body: PathBody,
            canvas: PathCanvas,
        },
        "Hire Me!": {
            body: HireMeBody,
            canvas: HireMeCanvas,
        },
        "Projects": {
            body: ProjectsBody,
            canvas: ProjectsCanvas,
        },
    };

    const renderComponentBody = (title) => {
        switch (title) {
            case "Projects":
                return <ProjectsBody setActiveProject={setActiveProject} />;
            case "Technologies":
                return <TechnologyBody activeProject={activeProject} ref={iconWrapperRef} />;
            default:
                return React.createElement(componentMap[title].body);
        }
    };

    return (
        <div className="d-flex justify-content-around" style={{}} >
            <Card
                className='m-2'
                style={cardStyle}
            >
                <Card.Body style={{backgroundColor:'transparent'}}>
                    <div>
                        <Card.Title style={{color:"#f0f0f0"}}>{title}</Card.Title>
                    </div>

                    {componentMap[title] && componentMap[title].body ? (

                        <div style= {isWide ? styles.IconContainer : styles.IconContainerSmallScreen}>

                            {renderComponentBody(title)}

                        </div>
                    ) : null}
                    {componentMap[title] && componentMap[title].canvas ? React.createElement(componentMap[title].canvas) : null}

                </Card.Body>
            </Card>

        </div>
    );
}



export { CardComponent};