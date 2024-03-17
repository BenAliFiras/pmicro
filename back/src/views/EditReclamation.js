import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, CardTitle, CardBody, Card, Col, CardHeader, CardFooter } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function EditReclamation() {
    const { id } = useParams();
    const [reclamationData, setReclamationData] = useState({
        contenu: '',
        objet: '',
        status: '',
        idUser: '',
        
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8093/reclamations/${id}`) // Replace with the correct API endpoint for fetching Reclamation data
            .then(response => {
                setReclamationData(response.data);
            })
            .catch(error => {
                console.error('Error fetching Reclamation data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        setReclamationData({
            ...reclamationData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedReclamationData = { ...reclamationData };
        axios
            .put(`http://localhost:8093/reclamations/${id}`, updatedReclamationData) // Replace with the correct API endpoint for updating Reclamation
            .then(response => {
                console.log('Reclamation updated:', response.data);
                toast.success('Reclamation updated successfully');
                navigate('/admin/list_reclamations');
            })
            .catch(error => {
                console.error('Error updating Reclamation:', error);
                toast.error('An error occurred while updating the Reclamation');
            });
    }

    return (
        <div className="content d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Col md="8">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Edit Reclamation</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="idUser">User ID</Label>
                                <Input
                                    type="text"
                                    name="idUser"
                                    id="idUser"
                                    value={reclamationData.idUser}
                                    onChange={handleChange}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="objet">Object</Label>
                                <Input
                                    type="text"
                                    name="objet"
                                    id="objet"
                                    value={reclamationData.objet}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="contenu">Contenu</Label>
                                <Input
                                    type="text"
                                    name="contenu"
                                    id="contenu"
                                    value={reclamationData.contenu}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input
                                    type="select"
                                    name="status"
                                    id="status"
                                    value={reclamationData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </Input>
                            </FormGroup>


                            <Button color="primary" type="submit">
                                Update Reclamation
                            </Button>
                        </Form>
                    </CardBody>
                    <CardFooter></CardFooter>
                </Card>
            </Col>
            <ToastContainer />
        </div>
    );
}

export default EditReclamation;
