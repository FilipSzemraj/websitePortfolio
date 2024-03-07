import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { styles } from './styles/style';
import { GoogleButton } from './googleButton';
import 'bootstrap-icons/font/bootstrap-icons.css';



export const Footer = () => {


    return (
    <div>
            <Container className="p-4 pb-0">
                <section className="mb-4">
                    <a className="btn text-white btn-floating m-1" style={{ backgroundColor: '#3b5998' }} href="https://www.facebook.com/filip.szemraj.33" role="button">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a className="btn disabled text-white btn-floating m-1" style={{ backgroundColor: '#55acee' }} href="#!" role="button">
                        <i className="bi bi-twitter"></i>
                    </a>

                    <GoogleButton />

                    <a className="btn disabled text-white btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} href="#!" role="button">
                        <i className="bi bi-instagram"></i>
                    </a>

                    <a className="btn disabled text-white btn-floating m-1" style={{ backgroundColor: '#0082ca' }} href="#!" role="button">
                        <i className="bi bi-linkedin"></i>
                    </a>

                    <a className="btn text-white btn-floating m-1 btn-rounded" style={{ backgroundColor: '#333333' }} href="https://github.com/FilipSzemraj" role="button">
                        <i className="bi bi-github"></i>
                    </a>
                </section>
            </Container>
            <div className="text-center p-3">
                &#169; 2024 Copyright: Filip Szemraj
            </div>
    </div>
    );
};

