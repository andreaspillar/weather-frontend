import React from "react";
import { Link } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';
import axios from 'axios';
import { Form, Button, Panel, Stack, Divider, Input } from 'rsuite';
import ADDRESS from "../uri";
import CONSTS from "../consts";


export default function Login() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const submitForm = event => {
        event.preventDefault();
        const credential = {
            email: email,
            password: password,
        }
        axios.post(ADDRESS.api+'/api/v1/login', credential)
        .then(response => {
            localStorage.clear();
            localStorage.setItem('X-Access-Token', response.data.token);
            localStorage.setItem('X-Access-Type', 'bearer');
            localStorage.setItem('X-Access-Expire', Date.now()+(response.data.expires_in*1000));
            window.location = '/dashboard';
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

            <Panel bordered style={{ background: '#fff', width: 400 }} header={<h3>Sign In</h3>}>
                <p style={{ marginBottom: 10 }}>
                <span className="text-muted">New Here? </span>{' '}
                <Link to="/register"> Create an Account</Link>
                </p>

                <Form fluid>
                    <Form.Group>
                        <Form.ControlLabel>Username or email address</Form.ControlLabel>
                        <Input type="email" onChange={(e) => setEmail(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>
                        <span>Password</span>
                        </Form.ControlLabel>
                        <Input type="password" onChange={(e) => setPassword(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Stack spacing={6} divider={<Divider vertical />}>
                        <Button appearance="primary" onClick={(e) => submitForm(e)}>Sign in</Button>
                        </Stack>
                    </Form.Group>
                </Form>
            </Panel>
        </Stack>
    )
}