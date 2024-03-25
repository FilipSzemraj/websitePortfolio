import '../App.css';
import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useLayoutEffect,
    forwardRef,
} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Card from 'react-bootstrap/Card';
import {ReactComponent as Education} from "./styles/images/svgForCarousel/education.svg";
import {ReactComponent as Career} from "./styles/images/svgForCarousel/career.svg";
import {ReactComponent as Hobby} from "./styles/images/svgForCarousel/hobby.svg";
import {ReactComponent as Activities} from "./styles/images/svgForCarousel/activities.svg";



gsap.registerPlugin(MotionPathPlugin);


export const Path = forwardRef((props, ref) => {

    const [positionOfDivsGlobal, setPositionOfDivs] = useState([0.75, 0.5, 0.25, 0]);
    const positionOfDivsRef = useRef(positionOfDivsGlobal);

    const [moveObjectRunning, setMoveObjectRunning] = useState(false);
    const moveObjectRunningRef = useRef(moveObjectRunning);

    moveObjectRunningRef.current=moveObjectRunning;

    positionOfDivsRef.current = positionOfDivsGlobal;

    const activityRef = useRef();
    const educationRef = useRef();
    const careerRef = useRef();
    const hobbyRef = useRef();
    const svgRef = useRef();


    const containersRef = useRef([]);
    const mainDiv = useRef();
    const parentDiv = useRef();
    const insideMainDiv = useRef();
    const { contextSafe } = useGSAP();
    const tl = useRef(); //First animation
    const tlInnerDiv = useRef([]);
    const tlMove = useRef();
    const tlForChangingInnerDiv = useRef();

    /*NEW SECTION*/

    const [animationCompleted, setAnimationCompleted] = useState(false);
    const animationCompletedRef = useRef(false);

    animationCompletedRef.current=animationCompleted;

    const [position, setPosition] = useState({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        x3: 0,
        y3: 0,
        x4: 0,
        y4: 0,
    });

    useLayoutEffect(() => {
        function handleResize() {
            const vw = window.innerWidth / 100;
            const vh = window.innerHeight / 100;
            //console.log("vw", vw*100);
            const widthVariable = 25 * vw;
            const heightVariable = 25 * vh;
            //console.log("width", widthVariable)
            //console.log("height", heightVariable)

            const mainRect = mainDiv.current.getBoundingClientRect();


            const parentRect = parentDiv.current.getBoundingClientRect();
            const topDistance=mainRect.top-(parentRect.top-(parentRect.height/2));
            const bottomDistance = mainRect.bottom-(parentRect.top-(parentRect.height/2));


            //console.log("mainRect.top", mainRect.top);
            const x1 = topDistance + mainRect.width / 2;
            const y1 = topDistance - heightVariable;

            const x2 = mainRect.left - widthVariable;
            const y2 = topDistance + mainRect.height / 2;

            const x3 = mainRect.left + mainRect.width / 2;
            const y3 = bottomDistance + heightVariable;

            const x4 = mainRect.right + widthVariable;
            const y4 = topDistance + mainRect.height / 2;

            if (mainRect) {
                setPosition({ x1, y1, x2, y2, x3, y3, x4, y4 });
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [containersRef, mainDiv]);

    const createPathWithLine = () => {
        const { x1, y1, x2, y2, x3, y3, x4, y4 } = position;

        // Center of the rhombus
        const cx = (x2 + x4) / 2;
        const cy = (y1 + y3) / 2;

        // Half lengths of the diagonals
        const rx = Math.sqrt((x2 - x4) ** 2 + (y2 - y4) ** 2) / 2.5; // Major axis radius
        const ry = Math.sqrt((x1 - x3) ** 2 + (y1 - y3) ** 2) / 2.5; // Minor axis radius

        // SVG Path for an ellipse: M cx-rx cy a rx,ry 0 1,0 (rx*2),0 a rx,ry 0 1,0 -(rx*2),0
        const ellipsePath = `M ${cx - rx} ${cy} a ${rx},${ry} 0 1,0 ${
            rx * 2
        },0 a ${rx},${ry} 0 1,0 ${-rx * 2},0`;

        const endPointX = cx - rx;
        const endPointY = cy;

        const linePath = `M ${cx} ${cy} L ${endPointX} ${endPointY}`;


        return { ellipsePath, linePath };
    };

    useGSAP(() => {
        function createTL() {
            const positionValues = Object.values(position);
            if (positionValues.some((value) => value != 0)) {
                const bezierPath = document.getElementById('bezierPath');

                if (animationCompletedRef.current == false) {

                    //console.log("pierwszy usegsap: ", animationCompletedRef.current)
                    let progress = 0;
                    if (tl.current) {
                        progress = tl.current.progress();
                        tl.current.kill();
                    }

                    tl.current = gsap.timeline({
                        defaults: { ease: 'none' },
                        scrollTrigger: {
                          trigger: ref.current,
                        },
                        onComplete: () => {
                            setAnimationCompleted(true);
                        },
                    });

                    const positionOfDivs = [0.75, 0.5, 0.25, 0]; //0.75 is the top div

                    const viewportHeight = window.innerHeight;
                    const viewportWidth = window.innerWidth;

                    const pathLength = bezierPath.getTotalLength();


                    containersRef.current.forEach((element, index) => { //change onComplete to after whole animation
                        const endPoint = bezierPath.getPointAtLength(
                            positionOfDivs[index] * pathLength
                        );
                        const pointXInVW = (endPoint.x / viewportWidth) * 100 + 'vw';
                        const pointYInVH = (endPoint.y / viewportHeight) * 100 + 'vh';

                        let duration = 1.5+(index*-0.5);

                        tl.current.fromTo(
                                element,
                                { opacity: 0 },
                                {
                                    opacity: 1,
                                    visibility: 'visible',
                                    motionPath: {
                                        start: '0',
                                        path: '#straightLine',
                                        align: '#straightLine',
                                        alignOrigin: [0.5, 0.5],
                                    },
                                }
                            )
                            .to(element, {
                                visibility: 'visible',
                                duration: duration,
                                ease: 'power1.inOut',
                                motionPath: {
                                    start: '0',
                                    end: `${positionOfDivs[index]}`,
                                    path: '#bezierPath',
                                    align: '#bezierPath',
                                    alignOrigin: [0.5, 0.5],
                                },
                            });
                        tl.current.progress(progress);
                    });
                }
            }
        }
        if(animationCompletedRef.current == false){
            createTL();
            window.addEventListener('resize', createTL);
        }

        return () => {
            window.removeEventListener('resize', createTL);
        };
    }, [mainDiv, position]);

    /*END OF NEW SECTION*/

    useGSAP(() => {

        function createNewTL (items, tracker){
            items.forEach((item, id) => {

                if(id!=tracker.item) {
                    gsap.set(item, {
                        motionPath: {
                            path: '#bezierPath',
                            align: '#bezierPath',
                            alignOrigin: [0.5, 0.5],
                            end: positionOfDivsRef.current[id],
                        },
                    });
                }else{
                    gsap.set(item, {
                        motionPath: {
                            path: '#bezierPath',
                            align: '#bezierPath',
                            alignOrigin: [0.5, 0.5],
                            end: positionOfDivsRef.current[id],
                            x:"-=37.5vw",
                        },
                    });
                }
            })
        }

        if(animationCompletedRef.current == true){
            //console.log('JESTEM W USEGSAP',animationCompleted);
            let items = gsap.utils.toArray('.item'),
                numItems = items.length,
                itemStep = 1 / numItems,
                wrapProgress = gsap.utils.wrap(0, 1),
                snap = gsap.utils.snap(itemStep),
                wrapTracker = gsap.utils.wrap(0, numItems),
                tracker = { item: 0 };
            //const positionOfDivs = [0.75, 0.5, 0.25, 0];


            tlMove.current = gsap.timeline({paused:true, reversed: false});

            items.forEach((item, id) => {

                /*gsap.set(item, {
                  motionPath: {
                    path: '#bezierPath',
                    align: '#bezierPath',
                    alignOrigin: [0.5, 0.5],
                    end: positionOfDivs[id],
                  },
                });*/

                tlInnerDiv.current[id] = gsap.timeline({  paused: id === tracker.item ? false : true });

                const innerDiv = item.querySelector('.innerDiv');

                tlInnerDiv.current[id].to(item, {
                    x:"+=37.5vw",
                    borderRadius:'50%',
                    duration:1,
                    border:'1px solid #052c5c'
                }).set(innerDiv, {
                    x:"-=37.5vw",
                    //opacity:1,
                })
                .fromTo( //tlInnerDiv.current[id]
                    innerDiv,
                    {
                        borderRadius: '50%',
                        scale: 0,
                        opacity: 1,
                    },
                    {
                        borderRadius:'0.375rem',
                        //borderRadius: '5% ',
                        scale: 1,
                        opacity: 1,
                        duration: 2,
                        border:'1px solid #052c5c',
                    }
                );

                item.addEventListener('click', function () {
                    var current = tracker.item;

                        if (id === current) {
                        return;
                    }
                    //console.log(`You have clicked id ${id}, a tracker.item: ${current}`);


                    var diff = positionOfDivsRef.current[current] - positionOfDivsRef.current[id];

                    if (diff >= 0.5) {
                        if (diff == 0.5) {
                            moveObjects(current > id ? diff - 1 : 1 - diff, id);
                        } else {
                            moveObjects(diff - 1, id);
                        }
                    } else {
                        moveObjects(diff, id);
                    }
                });
            })



            function moveObjects(howMuch, id){
                //console.log("moveObjectRunningRef", moveObjectRunningRef.current)
                if(moveObjectRunningRef.current){
                    return;
                }
                setMoveObjectRunning(true);
                const mapForSvg = {
                    0: educationRef,
                    1: careerRef,
                    2: activityRef,
                    3: hobbyRef,
                };
                const svgTl = svgRef.current = gsap.timeline();

                svgTl.to(mapForSvg[tracker.item].current, {
                    opacity:0,
                    scale:0,
                    duration:1,
                }).to(mapForSvg[id].current, {
                    scale:1,
                    opacity:1,
                    duration:2,
                });

                tlForChangingInnerDiv.current = gsap.timeline({
                    onComplete: () => {
                        tracker.item=id
                    },
                });

                function innerAnimation(){
                    items.forEach((item, index) => {


                        gsap.to(item, {
                            motionPath: {
                                path: '#bezierPath',
                                align: '#bezierPath',
                                alignOrigin: [0.5, 0.5],
                                start: positionOfDivsRef.current[index], // Start at a percentage of the path length
                                end: positionOfDivsRef.current[index]+howMuch,
                            },
                            ease: "none",
                            duration: 1,
                        });
                    });

                    let tempPositionOfDivs = [0,0,0,0];
                    positionOfDivsRef.current.forEach((position, index)=> {
                        tempPositionOfDivs[index]=wrapProgress(position+howMuch)
                    })

                    setPositionOfDivs(tempPositionOfDivs);

                    document.querySelector('.item.active').classList.remove('active');
                    items[id].classList.add('active');
                }

                tlForChangingInnerDiv.current.add( function(){
                    tlInnerDiv.current[tracker.item].reverse() })
                    .add(function(){ innerAnimation() }, ">3.25")
                    .add(function(){ tlInnerDiv.current[id].play() }, ">1")
                    .add(function(){setMoveObjectRunning(false)}, ">2")
            }

            function showInnerDiv(id) {
                if(tlInnerDiv.current[id].paused()){
                    tlInnerDiv.current[id].paused(!tlInnerDiv.current[id].paused());
                }else{
                    tlInnerDiv.current[id].reversed(!tlInnerDiv.current[id].reversed())
                }
            }

            createNewTL(items, tracker);
            window.addEventListener('resize', () => {
                createNewTL(items, tracker);
            });
        }

        return () => {
            window.removeEventListener('resize', createNewTL);
        };

    }, [animationCompleted]);


    const setRef = useCallback((el, index) => {
        if (el) {
            containersRef.current[index] = el;
        }
    }, []);

    function adjustFontSize(whichOne){
        if(window.innerHeight+250>window.innerWidth){
            //console.log("innerHeight wieksze")
            return whichOne ? "1.75vw" : "1.25vw";
        }
        else{
            //console.log("innerWidth wieksze")

            return whichOne ? "1.75vh" : "1.75vh";
        }
    }


    function educationalPathInner(){

        return(
            <div style={{color:"#f0f0f0", textAlign:'left', fontSize: adjustFontSize(false)}}>
                <dl style={{padding:'0px 20px 0px 20px',}}>
                    <p>
                        <dt>
                            - 09.2021 - until now
                        </dt>
                    </p>
                    <dd>
                        <p>I am studying at Politechnika Świętokrzyska in the field of computer science, with a specialization in teleinformatics.</p>
                    </dd>
                </dl>
                <dl style={{padding:'0px 20px 20px 20px',}}>
                    <p>
                        <dt>- 09.2017 - 06.2021</dt>
                    </p>
                    <dd>
                        I finished middle school in Ostrowiec Świętokrzyski, specializing in computer science.
                    </dd>
                </dl>
            </div>
        );
    }

    function careerPathInner(){

        return(
            <div style={{color:"#f0f0f0", textAlign:'left', fontSize: adjustFontSize(false)}}>
                <dl style={{padding:'0px 20px 0px 20px',}}>
                    <p>
                        <dt>
                            - 01.02.2021 - 28.02.2021
                        </dt>
                    </p>
                    <dd>
                        <p>Critical Systems and Infrastructure Department at Teva Operations Poland.</p>
                    </dd>
                </dl>
            </div>
        );
    }

    function activityPathInner(){

        return(
            <div style={{color:"#f0f0f0", textAlign:'left', fontSize: adjustFontSize(false)}}>
                <dl style={{padding:'0px 20px 0px 20px',}}>
                    <p>
                        <dt>
                            Erasmus Buddy
                        </dt>
                    </p>
                    <dd>
                        <p>I'm involved in helping incoming students as an Erasmus Buddy, so I have frequent opportunities to sharpen my language skills.</p>
                    </dd>
                </dl>
                <dl style={{padding:'0px 20px 20px 20px',}}>
                    <p>
                        <dt>Powerlifting section</dt>
                    </p>
                    <dd>
                        With my friend, we have revived the powerlifting section at our university, and we are competing in the Academic Championship of Poland.
                    </dd>
                </dl>
            </div>
        );
    }

    function hobbyPathInner(){

        return(
            <div style={{color:"#f0f0f0", textAlign:'left', fontSize: adjustFontSize(false)}}>
                <dl style={{padding:'0px 20px 0px 20px',}}>
                    <p>
                        <dt>
                            Music
                        </dt>
                    </p>
                    <dd>
                        <p>When I was younger, I played the piano and created my own beats with FL Studio.<br/>    <a href="https://soundcloud.com/filip-szemraj">Filip Szemraj on Soundcloud</a>
                        </p>
                    </dd>
                </dl>
                <dl style={{padding:'0px 20px 20px 20px',}}>
                    <p>
                        <dt>Web and mobile development</dt>
                    </p>
                    <dd>
                        Now I am focused on improving my skills in making websites and mobile apps. Additionally, I have just chosen my topic for my bachelor's thesis, and I will delve into Blockchain technology.
                    </dd>
                </dl>
            </div>
        );
    }


    return (
        <div
            style={{
                width: '50%',
                height: '50%',
                position: 'relative',
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            ref={parentDiv}
        >

            <div
                ref={mainDiv}
                style={{
                    backgroundColor: 'transparent',
                    width: '50%',
                    height: '50%',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '0.375rem',
                }}
            >
                <div ref={insideMainDiv} style={{color:"#f0f0f0", width:'100%', height:'100%', position: 'relative'}}>
                    <Activities ref={activityRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity:'0', scale:'0' }}/>
                    <Education ref={educationRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity:'1', scale:'1' }}/>
                    <Career ref={careerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity:'0', scale:'0' }}/>
                    <Hobby ref={hobbyRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity:'0', scale:'0' }}/>

                </div>
            </div>

            <div>
                <div ref={(el) => setRef(el, 0)} className={'item 1 active'}>
                    <div style={{fontSize: adjustFontSize(true) }}>
                        Educational Path
                    </div>
                    <div className="innerDiv" >
                        <Card style={{
                            width:'100%',
                            height:'100%',
                            backgroundColor:'transparent',
                            border: '1px solid transparent',
                            color:"#f0f0f0",}}
                            className='m-2'>
                            <Card.Body style={{width:'100%', height:'100%'}}>
                                <div>
                                    <Card.Title style={{fontSize: adjustFontSize(true) }}>Education</Card.Title>
                                </div>
                                {educationalPathInner()}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div ref={(el) => setRef(el, 1)} className={'item 2'}>
                    <div style={{fontSize: adjustFontSize(true) }}>
                        Carrer Path
                    </div>
                    <div className="innerDiv">
                        <Card style={{
                            width:'100%',
                            height:'100%',
                            backgroundColor:'transparent',
                            border: '1px solid transparent',
                            color:"#f0f0f0",}}
                              className='m-2'>
                            <Card.Body style={{width:'100%', height:'100%'}}>
                                <div>
                                    <Card.Title style={{fontSize: adjustFontSize(true) }}>Carrer</Card.Title>
                                </div>
                                {careerPathInner()}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div ref={(el) => setRef(el, 2)} className={'item 3'}>
                    <div style={{fontSize: adjustFontSize(true) }}>
                        University activities
                    </div>
                    <div className="innerDiv">
                        <Card style={{
                            width:'100%',
                            height:'100%',
                            backgroundColor:'transparent',
                            border: '1px solid transparent',
                            color:"#f0f0f0",}}
                              className='m-2'>
                            <Card.Body style={{width:'100%', height:'100%'}}>
                                <div>
                                    <Card.Title style={{fontSize: adjustFontSize(true) }}>University activities</Card.Title>
                                </div>
                                {activityPathInner()}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div ref={(el) => setRef(el, 3)} className={'item 4'}>
                    <div style={{fontSize: adjustFontSize(true) }}>
                        Hobbies
                    </div>
                    <div className="innerDiv">
                        <Card style={{
                            width:'100%',
                            height:'100%',
                            backgroundColor:'transparent',
                            border: '1px solid transparent',
                            color:"#f0f0f0",}}
                              className='m-2'>
                            <Card.Body style={{width:'100%', height:'100%'}}>
                                <div>
                                    <Card.Title style={{fontSize: adjustFontSize(true) }}>Hobbies</Card.Title>
                                </div>
                                {hobbyPathInner()}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <svg
                width="100vw"
                height="100vh"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                }}
            >
                <path
                    id="bezierPath"
                    d={createPathWithLine().ellipsePath}
                    fill="none"
                    //stroke="blue"
                    //strokeWidth="2"
                />
                <path
                    id="straightLine"
                    d={createPathWithLine().linePath}
                    fill="none"
                    //stroke="blue"
                    //strokeWidth="2"
                />
            </svg>
        </div>
    );
});
