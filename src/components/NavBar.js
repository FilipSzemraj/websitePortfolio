import React, {useRef, useState, useEffect} from 'react';
import {Navbar, Nav, Container, Row, Button, Image, NavbarCollapse} from 'react-bootstrap';
import AnimatedBackground from './AnimatedBackground';
import 'bootstrap-icons/font/bootstrap-icons.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';






export const NavBar = () => {
    const { contextSafe } = useGSAP();
    const tl = useRef();

    const [showText, setShowText] = useState(true);
    const divWithAnimatedBackgroundRef = useRef(null);
    const [showBlogInfo, setShowBlogInfo] = useState(false);

    const [expanded, setExpanded] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

    useEffect(() => {
        function handleResize() {
            setIsLargeScreen(window.innerWidth >= 992);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onClickName = contextSafe(()=>{
        if(showBlogInfo){
            tl.current = gsap.timeline();
            tl.current.to(".text", {
                opacity:0,
                duration:1,
            }).add(()=>{setShowBlogInfo(false); setShowText(true)}, ">")
                .to(".text", {
                    duration:1,
                    opacity:1,
                }, ">")
        }else if(!showText){
            tl.current = gsap.timeline();
            tl.current.to("#second", {
                opacity:0,
                duration:1,
            }).add(()=>{setExpanded(false); setShowText(true)}, ">")
                .to("#second", {
                    duration:1,
                    opacity:1,
                }, ">")
        }
    })

    const onClickBlog = contextSafe(()=>{
        if(!showBlogInfo){
            tl.current = gsap.timeline();
            tl.current.to("#second", {
                opacity:0,
                duration:1,
            }).add(()=>{setShowBlogInfo(true); setShowText(true); setExpanded(false)}, ">")
                .to("#second", {
                    duration:1,
                    opacity:1,
                }, ">")
        }
    })

    const onClickHamburger = contextSafe(()=>{
        if(!expanded){
            tl.current = gsap.timeline();
            tl.current.to("#second", {
                opacity:0,
                duration:1,
            }).add(()=>{console.log("function add"); setExpanded(true); if(showBlogInfo){setShowBlogInfo(false)} setShowText(false);}, ">")
                .to("#second", {
                    duration:1,
                    opacity:1,
                }, ">")
        }
    })


    return (
        <div ref={divWithAnimatedBackgroundRef} style={{ position: 'relative', width: '100%', height: '25vh', overflow:"visible", zIndex:'5' }}>
            <AnimatedBackground checkCondition={false} parentRef={divWithAnimatedBackgroundRef} />

            <Navbar id="first" expand="lg" expanded={expanded} style={{flexWrap:'wrap', position: 'absolute', width: '100%', height:'100%',top: 0, left: 0, backgroundColor:'transparent', alignContent:'start', }}>
                <Container fluid id="toSet" style={{display: 'flex', justifyContent: 'space-around' }}>
                    <Navbar.Brand href="#" onClick={onClickName} style={{color: '#F0F0F0'}}><h1>Filip Szemraj</h1></Navbar.Brand>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <Button className='m-1' style={{color:'#052c5c', backgroundColor:'#3a8bbf', borderColor:'#052c5c'}} onClick={onClickBlog}>Blog</Button>
                        <Navbar.Toggle className='m-1' aria-controls="responsive-navbar-nav" style={{color:'#052c5c', backgroundColor:'#3a8bbf', borderColor:"#052c5c"}} onClick={onClickHamburger}>
                            <i className="bi bi-list"></i>
                        </Navbar.Toggle>
                        {isLargeScreen && !expanded && (
                            <Navbar.Collapse id="responsive-navbar-nav" >
                                <Nav style={{color: "#052c5c"}}>
                                    <Nav.Link href="#features" style={{color: "#f0f0f0"}}>Features</Nav.Link>
                                    <Nav.Link href="#pricing" style={{color: "#f0f0f0"}}>Pricing</Nav.Link>
                                    <Nav.Link href="#aboutMe" style={{color: "#f0f0f0"}}>About me</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        )}
                    </div>
                </Container>

                <Container id="second" fluid style={{position: 'absolute', bottom: 0, left: 0, transform:"translateY(50%)", backgroundColor: 'transparent', width:'100%', justifyContent:'center' }}>
                    <Navbar.Text className="text" style={showText ? {color:'#052c5c', justifyContent:'center'} : { visibility: 'hidden', display: 'none' }}>
                        {!showBlogInfo ?
                            "I am student of third year at Politechnica Świetokrzyska in Kielce, major IT. Curious about new technologies and passionate about self-development"
                        : "Blog is in work"
                        }
                    </Navbar.Text>
                    {!isLargeScreen && expanded && (
                        <Navbar.Collapse id="responsive-navbar-nav" >
                            <Nav style={{display: "flex", flexDirection: "column", color: "#052c5c"}}>
                                <Nav.Link href="#features">Features</Nav.Link>
                                <Nav.Link href="#pricing">Pricing</Nav.Link>
                                <Nav.Link href="#aboutMe">About me</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    )}
                </Container>
            </Navbar>
        </div>
    );
}