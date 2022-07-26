import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, FormControl, NavLink } from 'react-bootstrap';
import MoviesList from './movies-list/MoviesList';

const NavigationMenu = () => {

    const [isDetailsPage, setIsDetailsPage] = useState(false)
    const [searchString, setSearchString] = useState('')
    const [category, setCategory] = useState('movies-in-theaters')

    useEffect(
        () => {
            sessionStorage.getItem('movieTitle') ? setIsDetailsPage(true) : setIsDetailsPage(false)
        },
        []
    );

    function handleBack() {
        sessionStorage.removeItem('movieTitle')
    }

    function handleSearch(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSearchString(e.target.value.toLowerCase())
    }

    return (
        <>
            <Navbar bg="white" variant='light' expand="lg" style={{ position: "fixed", width: '100%', top: "10px", zIndex: 9999 }}>
                {!isDetailsPage &&
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav variant='tabs'>
                                <Nav.Link href="/movies-in-theaters" >Movies in theaters</Nav.Link>
                                <Nav.Link href="/movies-coming" >Coming Soon</Nav.Link>
                                <Nav.Link href="/top-rated-india" >Top rated Indian</Nav.Link>
                                <Nav.Link href="/top-rated-movies" >Top rated movies</Nav.Link>
                                <Nav.Link href="/favourit" >Favourites</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                    </Container>
                }
                {isDetailsPage &&
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" variant='tabs'>
                                <Nav.Link href="/movies-in-theaters" onClick={() => handleBack()} style={{ color: "blue" }}>
                                    <FontAwesomeIcon style={{ color: "blue", marginLeft: "3px" }} icon={faArrowLeft} className="me-2" />
                                    Back to Home</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                }
            </Navbar>

        </>
    );
};

export default NavigationMenu;