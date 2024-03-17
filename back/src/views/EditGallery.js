import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function EditGallery() {
    const { id } = useParams();
    const [galleryData, setGalleryData] = useState({
        theme: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8095/galleries/${id}`)
            .then(response => {
                setGalleryData(response.data);            
            })
            .catch(error => {
                console.error('Error fetching gallery data:', error);               
            });
    }, [id]);

    const handleChange = (e) => {
        setGalleryData({
            ...galleryData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedGalleryData = { ...galleryData };
        axios
            .put(`http://localhost:8095/galleries/${id}`, updatedGalleryData)
            .then(response => {
                console.log('Gallery updated:', response.data);
                toast.success('Gallery updated successfully');
            })
            .catch(error => {
                console.error('Error updating gallery:', error);
                toast.error('An error occurred while updating the gallery');
            });
    }

    return (
        <div className="content">
            <h1>Edit Gallery</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="theme">Gallery Theme</Label>
                    <Input
                        type="text"
                        name="theme"
                        id="theme"
                        value={galleryData.theme}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Gallery Description</Label>
                    <Input
                        type="text"
                        name="description"
                        id="description"
                        value={galleryData.description}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="start_date">Gallery Start Date</Label>
                    <Input
                        type="date"
                        name="start_date"
                        id="start_date"
                        value={galleryData.start_date}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="end_date">Gallery End Date</Label>
                    <Input
                        type="date"
                        name="end_date"
                        id="end_date"
                        value={galleryData.end_date}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="location">Location</Label>
                    <Input
                        type="text"
                        name="location"
                        id="location"
                        value={galleryData.location}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button color="primary" type="submit">
                    Update Gallery
                </Button>
            </Form>
            <ToastContainer />
        </div>
    );
}

export default EditGallery;
