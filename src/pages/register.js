import React from "react";
import axios from 'axios';
import 'rsuite/dist/rsuite.min.css';
import { Form, Button, Panel, InputGroup, Stack, Input, Divider } from 'rsuite';
import { Link } from "react-router-dom";
import ADDRESS from "../uri";

export default function Register() {
    
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passconfirm, setPasswordConfirm] = React.useState('')

    const submitForm = event => {
        event.preventDefault();
        const credential = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passconfirm,
        }
        axios.post(ADDRESS.api+'/api/v1/register', credential)
        .then(response => {
            if (response.data.message === 'Account Created!') {
                window.location = '/'
            }
        })
    }

    return(
        <Stack
            justifyContent="center"
            alignItems="center"
            direction="column"
            style={{
                height: '100vh'
            }}
        >
            <Panel
                header={<h3>Create an Account</h3>}
                bordered
                style={{ background: '#fff', width: 400 }}
            >
                <p>
                <span>Already have an account?</span> <Link to="/">Sign in here</Link>
                </p>

                <Divider>OR</Divider>

                <Form fluid>
                    <Form.Group>
                        <Form.ControlLabel>Name</Form.ControlLabel>
                        <Input type="name" onChange={(e) => setName(e)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Input type="email" onChange={(e) => setEmail(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>Password</Form.ControlLabel>
                        <InputGroup inside style={{ width: '100%' }}>
                        <Input type="password" onChange={(e) => setPassword(e)} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                        <Input type="password" onChange={(e) => setPasswordConfirm(e)} />
                    </Form.Group>

                    <Form.Group>
                        <Stack spacing={6}>
                        <Button appearance="primary" onClick={(e) => submitForm(e)}>Submit</Button>
                        </Stack>
                    </Form.Group>
                </Form>
            </Panel>
        </Stack>
    )
}