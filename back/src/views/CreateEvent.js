import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateEvent extends Component {
  state = {
    nom_event: '',
    lieu_event: '',
    date_debut: '',
    date_fin: '',
    image_event: '',
    isActive: 'Active',
    nom_eventError: '',
    lieu_eventError: '',
    date_debutError: '',
    date_finError: '',
    image_eventError: '',
    showNotification: false, // Ajout d'un état pour afficher la notification
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    // Réinitialisez les messages d'erreur lors de la modification du champ
    this.setState({
      [`${e.target.name}Error`]: '',
    });
  }

  validateNomEvent = () => {
    if (this.state.nom_event.trim() === '') {
      this.setState({ nom_eventError: 'Veuillez entrer un nom d\'événement valide.' });
      return false;
    }
    this.setState({ nom_eventError: '' });
    return true;
  }

  validateLieuEvent = () => {
    if (this.state.lieu_event.trim() === '') {
      this.setState({ lieu_eventError: 'Veuillez entrer un lieu valide.' });
      return false;
    }
    this.setState({ lieu_eventError: '' });
    return true;
  }

  validateDateDebut = () => {
    if (this.state.date_debut.trim() === '') {
      this.setState({ date_debutError: 'Veuillez choisir une date de début.' });
      return false;
    }
    this.setState({ date_debutError: '' });
    return true;
  }

  validateDateFin = () => {
    if (this.state.date_fin.trim() === '') {
      this.setState({ date_finError: 'Veuillez choisir une date de fin.' });
      return false;
    }
    if (new Date(this.state.date_fin) < new Date(this.state.date_debut)) {
      this.setState({ date_finError: 'La date de fin ne peut pas être antérieure à la date de début.' });
      return false;
    }
    this.setState({ date_finError: '' });
    return true;
  }

  validateImageEvent = () => {
    if (this.state.image_event.trim() === '') {
      this.setState({ image_eventError: 'Veuillez entrer une URL d\'image valide.' });
      return false;
    }
    this.setState({ image_eventError: '' });
    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // Validez chaque champ
    const isNomEventValid = this.validateNomEvent();
    const isLieuEventValid = this.validateLieuEvent();
    const isDateDebutValid = this.validateDateDebut();
    const isDateFinValid = this.validateDateFin();
    const isImageEventValid = this.validateImageEvent();

    // Si tous les champs sont valides, soumettez les données
    if (isNomEventValid && isLieuEventValid && isDateDebutValid && isDateFinValid && isImageEventValid) {
      // Vérifiez si la date de fin est passée
      const currentDate = new Date();
      const endDate = new Date(this.state.date_fin);

      if (endDate < currentDate) {
        this.setState({ isActive: 'Inactive' });
      }

      const newEvent = {
        nom_event: this.state.nom_event,
        lieu_event: this.state.lieu_event,
        date_debut: this.state.date_debut,
        date_fin: this.state.date_fin,
        image_event: this.state.image_event,
        isActive: this.state.isActive,
      };

      axios.post('http://localhost:8096/events', newEvent)
        .then(response => {
          console.log('Event created:', response.data);

          // Affichez une notification de succès
          toast.success('Event created successfully');

          // Vous pouvez rediriger vers la page de la liste des événements ou effectuer d'autres actions ici
        })
        .catch(error => {
          console.error('Error creating event:', error);
        });
    }
  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
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
              <CardHeader>
                <CardTitle tag="h4">Create Event</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="nom_event">Event Name</Label>
                    <Input
                      type="text"
                      name="nom_event"
                      id="nom_event"
                      value={this.state.nom_event}
                      onChange={this.handleChange}
                    />
                    {this.state.nom_eventError && (
                      <span className="text-danger">{this.state.nom_eventError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="lieu_event">Location</Label>
                    <Input
                      type="text"
                      name="lieu_event"
                      id="lieu_event"
                      value={this.state.lieu_event}
                      onChange={this.handleChange}
                    />
                    {this.state.lieu_eventError && (
                      <span className="text-danger">{this.state.lieu_eventError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="date_debut">Start Date</Label>
                    <Input
                      type="date"
                      name="date_debut"
                      id="date_debut"
                      value={this.state.date_debut}
                      onChange={this.handleChange}
                    />
                    {this.state.date_debutError && (
                      <span className="text-danger">{this.state.date_debutError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="date_fin">End Date</Label>
                    <Input
                      type="date"
                      name="date_fin"
                      id="date_fin"
                      value={this.state.date_fin}
                      onChange={this.handleChange}
                    />
                    {this.state.date_finError && (
                      <span className="text-danger">{this.state.date_finError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="image_event">Image URL</Label>
                    <Input
                      type="text"
                      name="image_event"
                      id="image_event"
                      value={this.state.image_event}
                      onChange={this.handleChange}
                    />
                    {this.state.image_eventError && (
                      <span className="text-danger">{this.state.image_eventError}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="isActive">Status</Label>
                    <Input
                      type="select"
                      name="isActive"
                      id="isActive"
                      value={this.state.isActive}
                      onChange={this.handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Input>
                  </FormGroup>
                  <Button color="primary" type="submit">Create Event</Button>
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

export default CreateEvent;
