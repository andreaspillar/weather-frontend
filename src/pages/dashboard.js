import React, { useEffect } from "react";
import { Button, Col, Panel, Row, Form, Stack, Grid, Table, Pagination } from "rsuite";
import 'rsuite/dist/rsuite.min.css';
import * as images from '../images/';
import axios from 'axios';
import ADDRESS from "../uri";
import CONSTS from "../consts";

export default function Dashboard() {
    const { Column, HeaderCell, Cell } = Table;

    const [location, setLocation] = React.useState('')
    const [dataDetails, setLocationDetails] = React.useState()
    const [existingDetails, setExistingDetails] = React.useState()
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        axios.get(ADDRESS.api+"/api/v1/weather/retrieve", {headers: CONSTS.auth})
        .then(responseDetails => {
            setExistingDetails(responseDetails.data)
        })
    }, [])

    const handleChangeLimit = dataKey => {
        setPage(1)
        setLimit(dataKey)
    }

    const weatherDetails = dataDetails === undefined ? [{}] : dataDetails.weather
    const existingData = existingDetails === undefined ? [{}] : existingDetails.data
    
    
    const data = weatherDetails.filter((v, i) => {
        const start = limit * (page - 1)
        const end = start + limit
        return i >= start && i < end
    })

    const tableExisting = existingData.filter((v, i) => {
        const start = limit * (page - 1)
        const end = start + limit
        return i >= start && i < end
    })

    const submitForm = event => {
        event.preventDefault();
        const form = {location: location}
        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+location+'&APPID=24d5232eb11183e626f42c5d4b193e88')
        .then((response) => {
            if (response.data.cod === '404') {
                setLocationDetails({})
            }
            else {
                const detailForm = {
                    city : location,
                    details : response.data
                }
                axios.post(ADDRESS.api+"/api/v1/weather/add", detailForm, {headers: CONSTS.auth})
                .then(response => {
                    axios.get(ADDRESS.api+"/api/v1/weather/retrieve", {headers: CONSTS.auth})
                    .then(responseDetails => {
                        setExistingDetails(responseDetails.data)
                    })
                })
                setLocationDetails(response.data)
            }
        })
    }

    const viewHistory = (event, details) => {
        event.preventDefault();
        setLocationDetails(details)
    }

    const logout = event => {
        event.preventDefault();
        axios.get(ADDRESS.api+"/api/v1/auth/logout", {headers: CONSTS.auth})
        .then(response => {
            if (response.data.status === 'logout') {
                localStorage.clear()
                window.location = '/'
            }
        })
    }

    return (
    <Stack  justifyContent="center"
            alignItems="stretch"
            >
        <Grid style={{marginTop:'20px'}}>
            <Row>
                <Col xl={24}>
                    <Panel bordered >
                        <Form layout="inline">
                            <Form.Group>
                                <Form.ControlLabel>Location</Form.ControlLabel>
                                <Form.Control type="text" onChange={(e) => setLocation(e)} />
                            </Form.Group>
                            <Button appearance="primary" onClick={(e) => submitForm(e)}>Collect Data</Button>
                            <Button color="red" appearance="primary" onClick={(e) => logout(e)} style={{marginLeft:'20px'}}>Log Out</Button>
                        </Form>
                    </Panel>
                </Col>
            </Row>

            <Row style={{marginTop:'10px'}}>
                <Col xl={24}>
                    <Panel bordered>
                        <Grid style={{maxWidth:'100%'}}>
                            <Col xl={6} style={{marginTop:"10px"}}>
                                <Row>
                                    <div>
                                        <div style={{display:"inline-block",marginTop:"-15px"}}>
                                            <img src={images.Location} width="32" style={{marginTop:"-20px", marginRight:"10px"}}></img>         
                                        </div>
                                        <div style={{display:"inline-block"}}>
                                            <h3>{dataDetails === undefined ? "-" : dataDetails.name}</h3>
                                        </div>
                                    </div>
                                </Row>
                            </Col>
                            <Col xl={6}>
                                <Row>
                                    <div>
                                        <div style={{display:"inline-block"}}>
                                            <img src={
                                                weatherDetails[0].main === 'Clear' ? images.Sunny 
                                                : weatherDetails[0].main === 'Clouds' ? images.Cloudy
                                                : weatherDetails[0].main === 'Rain' ? images.Rain
                                                : weatherDetails[0].main === 'Thunder' ? images.Thunder
                                                : weatherDetails[0].main === 'Snow' ? images.Snow
                                                : weatherDetails[0].main === 'Haze' ? images.Haze
                                                : ""
                                            } width="64" style={{marginTop:"-15px", marginRight:"20px"}}></img>
                                        </div>
                                        <div style={{display:"inline-block",marginRight:"25px"}}><h1>{dataDetails === undefined ? "-" : (+(dataDetails.main.temp)-272.15).toFixed(1)}</h1></div>
                                    </div>
                                </Row>
                            </Col>
                            <Col xl={4}>
                                <Row style={{marginBottom:"10px"}}>
                                    <img src={images.Latitude} width="24" style={{display:"inline-block",marginRight:"10px"}}></img>
                                    <h5 style={{display:"inline-block"}}>{dataDetails === undefined ? "-" : dataDetails.coord.lat}</h5>
                                </Row>
                                <Row>
                                    <img src={images.Longitude} width="24" style={{display:"inline-block",marginRight:"10px"}}></img>
                                    <h5 style={{display:"inline-block"}}>{dataDetails === undefined ? "-" : dataDetails.coord.lon}</h5>
                                </Row>
                            </Col>
                            <Col xl={4}>
                                <Row style={{marginBottom:"10px"}}>
                                    <img src={images.Timezone} width="24" style={{display:"inline-block",marginRight:"10px"}}></img>
                                    <h5 style={{display:"inline-block"}}>{dataDetails === undefined ? "-" : dataDetails.timezone}</h5>
                                </Row>
                                <Row>
                                    <img src={images.Pressure} width="24" style={{display:"inline-block",marginRight:"10px"}}></img>
                                    <h5 style={{display:"inline-block"}}>{dataDetails === undefined ? "-" : dataDetails.main.pressure+' hPa'}</h5>
                                </Row>
                            </Col>
                            <Col xl={4}>
                                <Row style={{marginBottom:"10px"}}>
                                    <img src={images.Humidity} width="24" style={{display:"inline-block",marginRight:"10px"}}></img>
                                    <h5 style={{display:"inline-block"}}>{dataDetails === undefined ? "-" : dataDetails.main.humidity+' %'}</h5>
                                </Row>
                                <Row>
                                    <img src={images.Wind} width="24" style={{display:"inline-block",marginRight:"10px"}}></img>
                                    <h5 style={{display:"inline-block"}}>{dataDetails === undefined ? "-" : dataDetails.wind.speed+' m/s'}</h5>
                                </Row>
                            </Col>
                        </Grid>
                    </Panel>
                </Col>
            </Row>

            <Row style={{marginTop:'10px'}}>
                <Col xl={24}>
                    <Panel bordered>
                        <Table data={data}>
                            <Column width={50} fixed>
                                <HeaderCell>Id</HeaderCell>
                                <Cell dataKey="id" />
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>Weather</HeaderCell>
                                <Cell>
                                    {rowData => 
                                        rowData.main === 'Clear' ? <img src={images.Sunny} width="32" style={{marginTop:"-5px"}}></img> 
                                        : rowData.main === 'Clouds' ? <img src={images.Cloudy} width="32" style={{marginTop:"-5px"}}></img>
                                        : rowData.main === 'Rain' ? <img src={images.Rain} width="32" style={{marginTop:"-5px"}}></img>
                                        : rowData.main === 'Thunder' ? <img src={images.Thunder} width="32" style={{marginTop:"-5px"}}></img>
                                        : rowData.main === 'Snow' ? <img src={images.Snow} width="32" style={{marginTop:"-5px"}}></img>
                                        : rowData.main === 'Haze' ? <img src={images.Haze} width="32" style={{marginTop:"-5px"}}></img>
                                        : rowData.main === 'Mist' ? <img src={images.Mist} width="32" style={{marginTop:"-5px"}}></img>
                                        : <h4>?</h4>
                                    }
                                </Cell>
                            </Column>
                            <Column width={250} fixed>
                                <HeaderCell>Weather</HeaderCell>
                                <Cell dataKey="main" />
                            </Column>
                            <Column width={400} fixed>
                                <HeaderCell>Description</HeaderCell>
                                <Cell dataKey="description" />
                            </Column>
                        </Table>
                        <div style={{ padding: 20 }}>
                            <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={5}
                            size="xs"
                            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                            total={data.length}
                            limitOptions={[10, 25, 50, 100]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={handleChangeLimit}
                            />
                        </div>
                    </Panel>
                </Col>
            </Row>

            <Row style={{marginTop:'10px'}}>
                <Col xl={24}>
                    <Panel bordered>
                        <Table data={tableExisting}>
                            <Column width={50} fixed>
                                <HeaderCell>Id</HeaderCell>
                                <Cell dataKey="id" />
                            </Column>
                            <Column width={200} fixed>
                                <HeaderCell>Id</HeaderCell>
                                <Cell dataKey="city" />
                            </Column>
                            <Column width={250} fixed>
                                <HeaderCell>Time</HeaderCell>
                                <Cell dataKey="created_at" />
                            </Column>
                            <Column width={250} fixed>
                                <HeaderCell>Action</HeaderCell>
                                <Cell>
                                    {rowData => <Button color="green" appearance="primary" size='xs' onClick={(e) => viewHistory(e, rowData.details)}>View</Button>}
                                </Cell>
                            </Column>
                        </Table>
                        <div style={{ padding: 20 }}>
                            <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={5}
                            size="xs"
                            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                            total={tableExisting.length}
                            limitOptions={[10, 25, 50, 100]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={handleChangeLimit}
                            />
                        </div>
                    </Panel>
                </Col>
            </Row>
        </Grid>
    </Stack>
    )
}