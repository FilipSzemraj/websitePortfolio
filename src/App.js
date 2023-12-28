import './App.css';
import { NavBar } from './components/NavBar';
import { NextSectionButton } from './components/nextSectionButton';
import React, { useRef, useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { CardComponent } from './components/placeholder';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styles } from './components/styles/style';
import { Container, Row, Col } from 'react-bootstrap';



function App() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);

    const handleScroll = () => {
        if (containerRef.current) {
            const position = window.scrollY;
            console.log(position); // Log to see if this updates on scroll
            setScrollPosition(position);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getParallaxStyle = () => {
        // Change '100' to adjust the speed of the parallax effect
        const offset = scrollPosition / 5.5;
        console.log(`translateX(${offset}px)`); // Log to check the calculated value
        return {
            transform: `translateX(${offset}px)`,
            transition: 'transform 0.5s', // Smooth transition for the movement
            // You can add more styling here if needed
        };
    };


    return (
        <div className="App" style={styles.Body} ref={containerRef}>

            <NavBar />


            <div className="BodyOfFirstSection" style={styles.ContainerTop}>

                <NextSectionButton />

            </div>

            <div id="nextSection" className="BodyOfSecondSection" style={styles.ContainerBottom}>


                <Container style={styles.CardsContainer}>
                    <div style={getParallaxStyle()}>
                        <CardComponent placement="start" />
                    </div>
                </Container>


                

            </div>

            <Footer />

        </div>
  );
}

export default App;
