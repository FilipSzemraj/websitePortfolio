import React, { useState } from 'react';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import { styles } from './styles/style';

const name = "Filip Szemraj's";
const desc = "I am student of third year at Politechnica Swietokrzyska in Kielce, major IT. Curious about new technologies and passionate about self-development ";

export const NavBar = () => {
    const [showText, setShowText] = useState(true);


	return (
        

            <Navbar style={styles.Header} data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container style={styles.mainHeaderContainer} className="d-flex flex-column justify-content-between">

                <Container className="d-flex justify-content-between align-items-stretch" style={styles.HeaderFirstRow}>
                    <Row>
                        <Navbar.Brand>{name}</Navbar.Brand>
                        <Navbar.Brand>portfolio</Navbar.Brand>
                    </Row>


                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setShowText(!showText)} /> 

                </Container>

                <Container style={styles.DescContainer}>

                    <Navbar.Text style={showText ? {} : { visibility: 'hidden', display: 'none', }}>{desc}</Navbar.Text>


                    <Navbar.Collapse id="collapse navbar-collapse" style={!showText ? {} : { visibility: 'hidden', display: 'none', }}>
                        <Nav className="ml-auto">
                            <Nav.Link href="#home">About the Page</Nav.Link>
                            <Nav.Link href="#features">Skills</Nav.Link>
                            <Nav.Link href="#pricing">Projects</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>


                </Container>
            </Container>
            </Navbar>
  );
}