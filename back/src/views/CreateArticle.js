import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css'; 
import { Link } from 'react-router-dom';



class CreateArticle extends Component {
  state = {
    titre: '',
    auteur: '',
    contenu: '',
    date_publication: '',
    errors: {},
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm = () => {
    const errors = {};
    const { titre, auteur, contenu, date_publication } = this.state;

    if (!titre) {
      errors.titre = 'Article title is required';
    } else if (!/^[a-zA-Z\s]+$/.test(titre)) {
      errors.titre = 'Article title should only contain letters and spaces';
    }
    
    if (!auteur) {
      errors.auteur = 'Author name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(auteur)) {
      errors.auteur = 'Author name should only contain letters and spaces';
    }
    

    if (!contenu) {
      errors.contenu = 'Article content is required';
    }

    if (!date_publication) {
      errors.date_publication = 'Publication date is required';
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(date_publication);
    
      if (selectedDate < currentDate) {
        errors.date_publication = 'Publication date should be today or in the future';
      }
    }
    
    
    
    

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();
  
    if (this.validateForm()) {
      const newArticle = {
        titre: this.state.titre,
        auteur: this.state.auteur,
        contenu: this.state.contenu,
        date_publication: this.state.date_publication,
      };
  
      axios.post('http://localhost:8094/article', newArticle)
        .then(response => {
          console.log('Article created:', response.data);
  
          // Display a success notification
          toast.success('Article created successfully');
  
          // You can redirect to the article list page or perform other actions here
        })
        .catch(error => {
          console.error('Error creating article:', error);
  
          // Display an error notification
          toast.error('An error occurred while creating the article');
        });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="content">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Create Article</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="titre">Article Title</Label>
                  <Input
                    type="text"
                    name="titre"
                    id="titre"
                    value={this.state.titre}
                    onChange={this.handleChange}
                    className={errors.titre ? 'is-invalid' : ''}
                    style={{
                      padding: "10px",
                      border: "2px solid #ccc",
                      borderRadius: "20px",
                      fontSize: "16px",
                      outline: "none",
                  }}
                  />
                  {errors.titre && <div className="invalid-feedback">{errors.titre}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for="auteur">Author Name</Label>
                  <Input
                    type="text"
                    name="auteur"
                    id="auteur"
                    value={this.state.auteur}
                    onChange={this.handleChange}
                    className={errors.auteur ? 'is-invalid' : ''}
                    style={{
                      padding: "10px",
                      border: "2px solid #ccc",
                      borderRadius: "20px",
                      fontSize: "16px",
                      outline: "none",
                  }}
                  />
                  {errors.auteur && <div className="invalid-feedback">{errors.auteur}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for="contenu">Article Content</Label>
                  <Input
                    type="textarea"
                    name="contenu"
                    id="contenu"
                    value={this.state.contenu}
                    onChange={this.handleChange}
                    className={errors.contenu ? 'is-invalid' : ''}
                    style={{
                      padding: "10px",
                      border: "2px solid #ccc",
                      borderRadius: "20px",
                      fontSize: "16px",
                      outline: "none",
                  }}
                  />
                  {errors.contenu && <div className="invalid-feedback">{errors.contenu}</div>}
                </FormGroup>
                <FormGroup>
                  <Label for="date_publication">Publication Date</Label>
                  <Input
                    type="date"
                    name="date_publication"
                    id="date_publication"
                    value={this.state.date_publication}
                    onChange={this.handleChange}
                    className={errors.date_publication ? 'is-invalid' : ''}
                    style={{
                      padding: "10px",
                      border: "2px solid #ccc",
                      borderRadius: "20px",
                      fontSize: "16px",
                      outline: "none",
                  }}
                  />
                  {errors.date_publication && <div className="invalid-feedback">{errors.date_publication}</div>}
                </FormGroup >
                <FormGroup className="text-center">
                  <Button color="primary" type="submit" style={{borderRadius: "20px",}}>Create</Button>
                  <Link to={`/admin/article`} className="btn btn-secondary ml-2" style={{borderRadius: "20px",}}>Cancel</Link>

                </FormGroup>
                
              </Form>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
        <ToastContainer />
      </div>
    );
  }
}

export default CreateArticle;
