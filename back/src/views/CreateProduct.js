import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateProduct extends Component {
  state = {
    nomProduit: '',
    prixProduit: '',
    categorie: '',
    imageProduit: '',
    stockProduit: '',
    errors: {},
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm = () => {
    const errors = {};
    const { nomProduit, prixProduit, stockProduit, categorie, imageProduit } = this.state;

    // Validation for nomProduit: Should contain only letters and numbers
    if (!/^[A-Za-z0-9\s]+$/.test(nomProduit)) {
      errors.nomProduit = 'Invalid product name';
    }

    // Validation for prixProduit: Should be a positive number
    if (!/^\d+(\.\d{1,2})?$/.test(prixProduit) || parseFloat(prixProduit) <= 0) {
      errors.prixProduit = 'Invalid price';
    }

    // Validation for stockProduit: Should be a positive integer
    if (!/^(0|[1-9]\d*)$/.test(stockProduit)) {
      errors.stockProduit = 'Invalid stock';
    }
    // Validation for categorie: Should not be empty
    if (!categorie.trim()) {
      errors.categorie = 'Category is required';
    }

    // Validation for imageProduit: Should be a valid URL (You can add more specific checks if needed)
    if (!imageProduit.trim() || !/^https?:\/\/.+\..+$/.test(imageProduit)) {
      errors.imageProduit = 'Invalid image URL';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      const newProduct = {
        nomProduit: this.state.nomProduit,
        prixProduit: parseFloat(this.state.prixProduit),
        categorie: this.state.categorie,
        imageProduit: this.state.imageProduit,
        stockProduit: parseInt(this.state.stockProduit, 10),
      };

      axios.post('http://localhost:8090/products', newProduct)
        .then(response => {
          console.log('Product created:', response.data);

          // Affichez une notification de succès
          toast.success('Product created successfully');

          // Vous pouvez rediriger vers la page de la liste des produits ou effectuer d'autres actions ici
        })
        .catch(error => {
          console.error('Error creating product:', error);
        });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Create Product</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="nomProduit">Product Name</Label>
                    <Input
                      type="text"
                      name="nomProduit"
                      id="nomProduit"
                      value={this.state.nomProduit}
                      onChange={this.handleChange}
                      className={errors.nomProduit ? 'is-invalid' : ''}
                    />
                    {errors.nomProduit && <div className="invalid-feedback">{errors.nomProduit}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="prixProduit">Price (TND)</Label>
                    <Input
                      type="number"
                      name="prixProduit"
                      id="prixProduit"
                      value={this.state.prixProduit}
                      onChange={this.handleChange}
                      className={errors.prixProduit ? 'is-invalid' : ''}
                    />
                    {errors.prixProduit && <div className="invalid-feedback">{errors.prixProduit}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="categorie">Category</Label>
                    <Input
                      type="select" // Use select type for the dropdown
                      name="categorie"
                      id="categorie"
                      value={this.state.categorie}
                      onChange={this.handleChange}
                      className={errors.categorie ? 'is-invalid' : ''}
                    >
                        <option value="">Select a category</option>
                        <option value="Painting">Painting</option>
                        <option value="Sculpture">Sculpture</option>
                        <option value="Drawing">Drawing</option>
                        <option value="Photography">Photography</option>
                        <option value="Pottery">Pottery</option>
                        <option value="Printmaking">Printmaking</option>
                        <option value="Textile_Arts">Textile Arts</option>
                        <option value="Mixed_Media">Mixed Media</option>
                    </Input>
                    {errors.categorie && <div className="invalid-feedback">{errors.categorie}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="imageProduit">Image URL</Label>
                    <Input
                      type="text"
                      name="imageProduit"
                      id="imageProduit"
                      value={this.state.imageProduit}
                      onChange={this.handleChange}
                      className={errors.imageProduit ? 'is-invalid' : ''}
                    />
                    {errors.imageProduit && <div className="invalid-feedback">{errors.imageProduit}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="stockProduit">Stock</Label>
                    <Input
                      type="number"
                      name="stockProduit"
                      id="stockProduit"
                      value={this.state.stockProduit}
                      onChange={this.handleChange}
                      className={errors.stockProduit ? 'is-invalid' : ''}
                    />
                    {errors.stockProduit && <div className="invalid-feedback">{errors.stockProduit}</div>}
                  </FormGroup>
                  <Button color="primary" type="submit">Create Product</Button>
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

export default CreateProduct;
