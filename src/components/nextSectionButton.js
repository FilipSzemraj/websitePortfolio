import React from 'react';
import { Button } from 'react-bootstrap';
import { styles } from './styles/style';
import 'bootstrap-icons/font/bootstrap-icons.css';



const scrollToNextSection = () => {
    const nextSection = document.getElementById('nextSection');
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

export const NextSectionButton = () => {

    return (
        <Button className="btn btn-default" type="button" aria-haspopup="true" aria-expanded="true" variant="primary" style={styles.NextSectionButton} onClick={scrollToNextSection}>
            <i className="bi bi-arrow-down"></i>
        </Button>
    );
};

