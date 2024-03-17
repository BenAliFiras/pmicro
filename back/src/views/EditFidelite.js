import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function EditFidelite() {
  const { id } = useParams();
  const [fideliteData, setFideliteData] = useState({
    nom: '',
    description: '',
    duration: '',
    price: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8092/fidelites/${id}`)
      .then(response => {
        setFideliteData(response.data);
      })
      .catch(error => {
        console.error('Error fetching fidelite data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFideliteData({
      ...fideliteData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFideliteData = { ...fideliteData };
    axios
      .put(`http://localhost:8092/fidelites/${id}`, updatedFideliteData)
      .then(response => {
        toast.success("Fidelite updated successfully");
        console.log('Fidelite updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating fidelite:', error);
      });
  }

  return (
    <div className="content">
      <h1>Edit Fidelite</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Fidelite Name</Label>
          <Input
            type="text"
            name="nom"
            id="name"
            value={fideliteData.nom}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Fidelite Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            value={fideliteData.description}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="duration">Fidelite Duration</Label>
          <Input
            type="text"
            name="duration"
            id="duration"
            value={fideliteData.duration}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Fidelite Price</Label>
          <Input
            type="text"
            name="price"
            id="price"
            value={fideliteData.price}
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Update Fidelite
        </Button>
      </Form>
    </div>
  );
}

export default EditFidelite;
