import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateFidelite extends Component {
  state = {
    nom: '',
    description: '',
    duration: '',
    price: '',
    errors: {},
  };
  
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm = () => {
    const errors = {};
    const { nom, description, duration, price } = this.state;

    if (!nom) {
      errors.nom = 'nom is required';
    }

    if (!description) {
      errors.description = 'Description is required';
    }

    if (!duration) {
      errors.duration = 'Duration is required';
    }

    if (!price) {
      errors.price = 'Price is required';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();
  
    if (this.validateForm()) {
      const newFidelite = {
        nom: this.state.nom,
        description: this.state.description,
        duration: this.state.duration,
        price: this.state.price,
      };
  
      axios.post('http://localhost:8092/fidelites', newFidelite)
        .then(response => {
          console.log('Fidelite created:', response.data);
  
          // Display a success notification
          toast.success('Fidelite created successfully');
  
          // You can redirect to the fidelite list page or perform other actions here
          
          //
        })
        .catch(error => {
          console.error('Error creating fidelite:', error);
  
          // Display an error notification
          toast.error('An error occurred while creating the fidelite');
        });
    }
  }
  
  render() {
    const { errors } = this.state;

    return (
      <div className="content">
        <Row>
          <Col md="8">
          <center>
        {" "}
        <div className="stand-with-palestine-banner">
          <p>Stand with Palestine</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/2560px-Flag_of_Palestine.svg.png"
            alt="Palestinian Flag"
            style={{ width: "100px", height: "auto" }}
          />
        </div>
      </center>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Create Fidelite</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="nom">Fidelite Name</Label>
                    <Input
                      type="text"
                      name="nom"
                      id="nom"
                      value={this.state.nom}
                      onChange={this.handleChange}
                      className={errors.nom ? 'is-invalid' : ''}
                    />
                    {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Fidelite Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      className={errors.description ? 'is-invalid' : ''}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="duration">Fidelite Duration</Label>
                    <Input
                      type="text"
                      name="duration"
                      id="duration"
                      value={this.state.duration}
                      onChange={this.handleChange}
                      className={errors.duration ? 'is-invalid' : ''}
                    />
                    {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="price">Fidelite Price</Label>
                    <Input
                      type="text"
                      name="price"
                      id="price"
                      value={this.state.price}
                      onChange={this.handleChange}
                      className={errors.price ? 'is-invalid' : ''}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                  </FormGroup>
                  <Button color="primary" type="submit">Create Fidelite</Button>
                </Form>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    );
  }
}
export default (CreateFidelite);

