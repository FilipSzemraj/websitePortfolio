import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const textMap = {
    firstParagraph: "",
    secondParagraph: "",
    thirdParagraph: "",
    fourthParagraph: "",

};

function OffcanvasFirst({placement, onOffcanvasClose, body}) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        if (onOffcanvasClose) {
            onOffcanvasClose();
        }
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" className="d-lg-none" onClick={handleShow}>
                Launch
            </Button>



            <Offcanvas show={show} onHide={handleClose} responsive="lg" scroll={true} backdrop={true} placement={placement } >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{justifyContent:'center', marginTop:'2vh',}}>
                    {body}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export { OffcanvasFirst };