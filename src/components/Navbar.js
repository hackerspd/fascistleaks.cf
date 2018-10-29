import React from 'react'

import {
    Button,
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import Logo from '../img/logo.png'

class MainNav extends React.PureComponent {
    state = {
        isOpen: true
    }

    render () {
        const { isOpen } = this.state
        return (
            <Navbar color="light" light expand="md">
                <Container>
                    <NavbarBrand href="/"><img src={Logo}/></NavbarBrand>
                    <NavbarToggler onClick={() => this.setState(({isOpen}) => ({
                            isOpen: !!!isOpen
                    }))} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/about/"><Button color="link">Sobre</Button></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/formulario"><Button outline color="info">Denuncie</Button></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default MainNav
