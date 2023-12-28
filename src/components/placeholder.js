import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { OffcanvasFirst } from './offcanvas';


function CardComponent({ placement }) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleOffcanvasClose = () => setIsHovered(false);

    const cardStyle = {
        width: '38.2vw',
        border: isHovered ? '1px solid black' : '1px solid white'
    };

    return (
        <div className="d-flex justify-content-around">
            <Card
                bg='dark'
                text='light'
                className='mb-2'
                style={cardStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <OffcanvasFirst placement={placement} onOffcanvasClose={handleOffcanvasClose} />
                </Card.Body>
            </Card>
        </div>
    );
}

export { CardComponent };