import React, {  useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import axios from 'axios';

function EditProduct() {
  const { id } = useParams(); // Use the useParams hook to get the 'id' parameter
  const [product, setProduct] = useState({
    nomProduit: '',
    prixProduit: '',
    categorie: '',
    imageProduit: '',
    stockProduit: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8090/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      nomProduit: product.nomProduit,
      prixProduit: parseFloat(product.prixProduit),
      categorie: product.categorie,
      imageProduit: product.imageProduit,
      stockProduit: parseInt(product.stockProduit, 10),
    };

    axios
      .put(`http://localhost:8090/products/${id}`, updatedProduct)
      .then(response => {
        console.log('Product updated:', response.data);
        // You can redirect to the product list page or perform other actions
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  }

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
              <CardTitle tag="h4">Edit Product</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                {/* Pre-fill form fields with existing product data */}
                <FormGroup>
                  <Label for="nomProduit">Product Name</Label>
                  <Input
                    type="text"
                    name="nomProduit"
                    id="nomProduit"
                    value={product.nomProduit}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="prixProduit">Price</Label>
                  <Input
                    type="number"
                    name="prixProduit"
                    id="prixProduit"
                    value={product.prixProduit}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="categorie">Category</Label>
                  <Input
                    type="text"
                    name="categorie"
                    id="categorie"
                    value={product.categorie}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="imageProduit">Image URL</Label>
                  <Input
                    type="text"
                    name="imageProduit"
                    id="imageProduit"
                    value={product.imageProduit}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="stockProduit">Stock</Label>
                  <Input
                    type="number"
                    name="stockProduit"
                    id="stockProduit"
                    value={product.stockProduit}
                    onChange={handleChange}
                  />
                </FormGroup>
                <Button color="primary" type="submit">Update Product</Button>
              </Form>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EditProduct;
