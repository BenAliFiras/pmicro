import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationIcon from './NotificationIcon';

class CreateReclamation extends Component {
  state = {
    contenu: '',
    objet: '',
    status: '',
    idUser: '',
    date: new Date().toISOString().split('T')[0],
    errors: {},
    showNotification: false, 
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm = () => {
    const errors = {};
    const { contenu, objet, idUser, date, status } = this.state;

    if (!contenu) {
      errors.contenu = 'Content is required';
    }

    if (!objet) {
      errors.objet = 'Object is required';
    }
    if (!idUser) {
      errors.idUser = 'User ID is required';
    }
    if (!date) {
      errors.date = 'Date is required';
    }
    if (!status) {
      errors.status = 'Status is required';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      const newReclamation = {
        contenu: this.state.contenu,
        objet: this.state.objet,
        status: this.state.status,
        idUser: this.state.idUser,
        date: this.state.date,
      };

      axios.post('http://localhost:8093/reclamations', newReclamation)
        .then(response => {
          console.log('Reclamation created:', response.data);
          //toast.success('Reclamation created successfully');
          this.setState({ showNotification: true }, () => {
            setTimeout(() => {
              this.setState({ showNotification: false });
            }, 60000);
          });
      })
        .catch(error => {
          console.error('Error creating Reclamation:', error);
          toast.error('An error occurred while creating the Reclamation');
        });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.showNotification !== prevState.showNotification) {
      console.log('showNotification has changed to:', this.state.showNotification);
    }
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="content d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <Col md="8">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Create Reclamation</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                  <Label for="idUser">Notes&Observation</Label>
                  <Input
                    type="text"
                    name="idUser"
                    id="idUser"
                    value={this.state.idUser}
                    onChange={this.handleChange}
                    className={errors.idUser ? 'is-invalid' : ''}
                  />
                  {errors.idUser && <div className="invalid-feedback">{errors.idUser}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for="objet">Object</Label>
                  <Input
                    type="text"
                    name="objet"
                    id="objet"
                    value={this.state.objet}
                    onChange={this.handleChange}
                    className={errors.objet ? 'is-invalid' : ''}
                  />
                  {errors.objet && <div className="invalid-feedback">{errors.objet}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for="contenu">Contenu</Label>
                  <Input
                    type="text"
                    name="contenu"
                    id="contenu"
                    value={this.state.contenu}
                    onChange={this.handleChange}
                    className={errors.contenu ? 'is-invalid' : ''}
                  />
                  {errors.contenu && <div className="invalid-feedback">{errors.contenu}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input
                    type="text"
                    name="date"
                    id="date"
                    value={this.state.date}
                    onChange={this.handleChange}
                    className={errors.date ? 'is-invalid' : ''}
                    disabled
                  />
                  {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input
                    type="select"
                    name="status"
                    id="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                    className={errors.status ? 'is-invalid' : ''}
                  >
                    {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                    <option value="">Select a status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </Input>
                </FormGroup>
                <Button color="primary" type="submit">Create Reclamation</Button>
              </Form>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        </Col>

        <ToastContainer />
      </div>
    );
  }
}

export default CreateReclamation;
