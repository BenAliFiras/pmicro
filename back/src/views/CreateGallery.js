import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateGallery extends Component {
  state = {
    theme: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    errors: {},
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm = () => {
    const errors = {};
    const { theme, description, start_date, end_date, location } = this.state;

    if (!theme) {
      errors.theme = 'Gallery theme is required';
    }

    if (!description) {
      errors.description = 'Gallery description is required';
    }

    if (!start_date) {
      errors.start_date = 'Gallery start date is required';
    }

    if (!end_date) {
      errors.end_date = 'Gallery end date is required';
    }

    if (!location) {
      errors.location = 'Gallery location is required';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();
  
    if (this.validateForm()) {
      const newGallery = {
        theme: this.state.theme,
        description: this.state.description,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        location: this.state.location,
      };
  
      axios.post('http://localhost:8095/galleries', newGallery)
        .then(response => {
          console.log('Gallery created:', response.data);
  
          // Display a success notification
          toast.success('Gallery created successfully');
  
          // You can redirect to the gallery list page or perform other actions here
        })
        .catch(error => {
          console.error('Error creating gallery:', error);
  
          // Display an error notification
          toast.error('An error occurred while creating the gallery');
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
                <CardTitle tag="h4">Create Gallery</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="theme">Gallery Theme</Label>
                    <Input
                      type="text"
                      name="theme"
                      id="theme"
                      value={this.state.theme}
                      onChange={this.handleChange}
                      className={errors.theme ? 'is-invalid' : ''}
                    />
                    {errors.theme && <div className="invalid-feedback">{errors.theme}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Gallery Description</Label>
                    <Input
                      type="text"
                      name="description"
                      id="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      className={errors.description ? 'is-invalid' : ''}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="start_date">Gallery Start Date</Label>
                    <Input
                      type="date"
                      name="start_date"
                      id="start_date"
                      value={this.state.start_date}
                      onChange={this.handleChange}
                      className={errors.start_date ? 'is-invalid' : ''}
                    />
                    {errors.start_date && <div className="invalid-feedback">{errors.start_date}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="end_date">Gallery End Date</Label>
                    <Input
                      type="date"
                      name="end_date"
                      id="end_date"
                      value={this.state.end_date}
                      onChange={this.handleChange}
                      className={errors.end_date ? 'is-invalid' : ''}
                    />
                    {errors.end_date && <div className="invalid-feedback">{errors.end_date}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="location">Gallery Location</Label>
                    <Input
                      type="text"
                      name="location"
                      id="location"
                      value={this.state.location}
                      onChange={this.handleChange}
                      className={errors.location ? 'is-invalid' : ''}
                    />
                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                  </FormGroup>
                  <Button color="primary" type="submit">Create Gallery</Button>
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

export default CreateGallery;
