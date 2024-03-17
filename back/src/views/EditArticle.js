import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';


function EditArticle() {
    const { id } = useParams();
    const [articleData, setArticleData] = useState({
        titre: '',
        auteur: '',
        contenu: '',
        date_publication: '',
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8094/article/${id}`)
            .then(response => {
                setArticleData(response.data);
            })
            .catch(error => {
                console.error('Error fetching article data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        setArticleData({
            ...articleData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedArticleData = { ...articleData };
        axios
            .put(`http://localhost:8094/article/${id}`, updatedArticleData)
            .then(response => {
                console.log('Article updated:', response.data);
                toast.success('Article updated successfully');
            })
            .catch(error => {
                console.error('Error updating article:', error);
                toast.error('An error occurred while updating the article');
            });
    }

    return (
        <div className="content">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Edit Article</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="titre">Article Title</Label>
                                <Input
                                    type="text"
                                    name="titre"
                                    id="titre"
                                    value={articleData.titre}
                                    onChange={handleChange}
                                    style={{
                                        padding: "10px",
                                        border: "2px solid #ccc",
                                        borderRadius: "20px",
                                        fontSize: "16px",
                                        outline: "none",
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="auteur">Author Name</Label>
                                <Input
                                    type="text"
                                    name="auteur"
                                    id="auteur"
                                    value={articleData.auteur}
                                    onChange={handleChange}
                                    style={{
                                        padding: "10px",
                                        border: "2px solid #ccc",
                                        borderRadius: "20px",
                                        fontSize: "16px",
                                        outline: "none",
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="contenu">Article Content</Label>
                                <Input
                                    type="textarea"
                                    name="contenu"
                                    id="contenu"
                                    value={articleData.contenu}
                                    onChange={handleChange}
                                    style={{
                                        padding: "10px",
                                        border: "2px solid #ccc",
                                        borderRadius: "20px",
                                        fontSize: "16px",
                                        outline: "none",
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="date_publication">Publication Date</Label>
                                <Input
                                    type="date"
                                    name="date_publication"
                                    id="date_publication"
                                    value={articleData.date_publication}
                                    onChange={handleChange}
                                    style={{
                                        padding: "10px",
                                        border: "2px solid #ccc",
                                        borderRadius: "20px",
                                        fontSize: "16px",
                                        outline: "none",
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="text-center">
                                <Button color="primary" type="submit"
                                style={{borderRadius: "20px",}}>
                                    Update 
                                </Button>
                                <Link to={`/admin/article`} className="btn btn-secondary ml-2" style={{borderRadius: "20px",}}>Cancel</Link>

                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter />
                </Card>
            </Col>
            <ToastContainer />
        </div>
    );
}

export default EditArticle;
