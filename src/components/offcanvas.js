import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useActiveProject } from './MyContext.js';
import { projectsData } from './Carousel.js';


const textMap = {
    firstParagraph: "",
    secondParagraph: "",
    thirdParagraph: "",
    fourthParagraph: "",

};

function OffcanvasFirst({placement, onOffcanvasClose, body}) {
    const [show, setShow] = useState(false);
    const { activeProject, setActiveProject, matches, matchesRef } = useActiveProject();


    const handleClose = () => {
        setShow(false);
        if (onOffcanvasClose) {
            onOffcanvasClose();
        }
    };
    const handleShow = () => setShow(true);

    return (
        <div style={{backgroundColor:''}}>
            {matchesRef.current ? (
                <>
                <Button variant="primary" className="d-lg-none" onClick={handleShow}>
                    Launch
                </Button>



                <Offcanvas show={show} onHide={handleClose} responsive="lg" scroll={true} backdrop={true} placement={placement} >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{justifyContent:'center', marginTop:'2vh',}}>
            {body}
                </Offcanvas.Body>
                </Offcanvas>
                </>
            ) : (
                <>
                    <Button variant="primary" className="d-lg-none" onClick={handleShow}>
                        See description
                    </Button>

                    <div style={matchesRef.current ? {} : {backgroundColor:'', width:'100%', height:'100%'}}>
                        {body}
                    </div>

                    <Offcanvas show={show} onHide={handleClose} responsive="lg" scroll={true} backdrop={true} placement={placement} >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Description of project</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{justifyContent:'center', marginTop:'2vh',}}>
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
                        </Offcanvas.Body>
                    </Offcanvas>
                </>
            )
            }
        </div>
    );
}

export { OffcanvasFirst };