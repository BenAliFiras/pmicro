import React, { Component } from "react";
import axios from "axios";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaSearch, FaSort, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const buttonStyle = {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s',
};

// Pour le style au survol
const buttonHoverStyle = {
    background: '#0056b3',
};

// Pour le style des boutons actifs
const activeButtonStyle = {
    background: '#0056b3',
};

class ArticleList extends Component {
    state = {
        articles: [],
        searchQuery: "",
        filteredArticles: null,
        sortOrder: "asc",
        currentPage: 1, // Page actuelle
        articlesPerPage: 5, // Nombre d'articles par page
    };

    componentDidMount() {
        this.loadArticles();
    }

    // Appel API pour charger les articles
    loadArticles = () => {
        const { currentPage, articlesPerPage } = this.state;
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;

        axios
            .get("http://localhost:8094/article")
            .then((response) => {
                const articles = response.data;
                const currentArticles = articles.slice(startIndex, endIndex);
                this.setState({ articles: currentArticles });
                toast.success("Welcome to the article list");
            })
            .catch((error) => {
                console.error("Error fetching articles:", error);
            });
    };

    // Fonction pour changer de page
    paginate = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, () => {
            this.loadArticles();
        });
    };

    handleSearchChange = (e) => {
        const searchQuery = e.target.value;
        this.setState({ searchQuery }, () => {
            this.handleSearch();
        });
    };

    handleSearch = () => {
        const { searchQuery } = this.state;

        if (searchQuery) {
            axios
                .get(`http://localhost:8094/article/search?query=${searchQuery}`)
                .then((response) => {
                    const searchResults = response.data;
                    this.setState({ filteredArticles: searchResults });
                })
                .catch((error) => {
                    console.error("Error fetching search results:", error);
                    this.setState({ filteredArticles: [] });
                });
        } else {
            this.setState({ filteredArticles: null });
        }
    };

    handleSort = () => {
        const { articles, sortOrder } = this.state;
        const sortedArticles = [...articles];

        sortedArticles.sort((a, b) => {
            const dateA = new Date(a.date_publication);
            const dateB = new Date(b.date_publication);

            if (sortOrder === "asc") {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        this.setState({ filteredArticles: sortedArticles });
    };

    toggleSortOrder = () => {
        this.setState(
            (prevState) => ({
                sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
            }),
            () => {
                this.handleSort();
            }
        );
    };

    handleDelete = (articleId) => {
        axios
            .delete(`http://localhost:8094/article/${articleId}`)
            .then((response) => {
                this.setState((prevState) => ({
                    articles: prevState.articles.filter((article) => article.id !== articleId),
                }));
                toast.success("Article deleted successfully");
                console.log("Article deleted:", response.data);
            })
            .catch((error) => {
                console.error("Error deleting article:", error);
            });
    };
    exportToPDF = () => {
        const { articles } = this.state;
        const columns = ["ID", "Article Title", "Author Name", "Article Content", "Publication Date"];
        const data = articles.map((article) => [article.id, article.titre, article.auteur, article.contenu, article.date_publication]);

        const doc = new jsPDF();
        doc.autoTable({ columns, body: data });
        doc.save("ArticleList.pdf");
    };

    render() {
        const { articles, searchQuery, filteredArticles, sortOrder, currentPage, articlesPerPage } = this.state;

        // Calcul des indices de pagination
        const indexOfLastArticle = currentPage * articlesPerPage;
        const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
        const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    
        // Calcul du nombre total de pages
        const totalPages = Math.ceil(articles.length / articlesPerPage);

        return (
            <div className="content">
                <center>
                    <div className="stand-with-palestine-banner">
                        <p>Stand with Palestine</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/2560px-Flag_of_Palestine.svg.png"
                            alt="Palestinian Flag"
                            style={{ width: "100px", height: "auto" }}
                        />
                    </div>
                </center>
                <ToastContainer />
                <h1 className="mb-4">Article List</h1>
                <div className="search-sort-bar">
                    <InputGroup>
                        <FormControl
                            placeholder="Search by author or title"
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            style={{
                                padding: "10px",
                                border: "2px solid #ccc",
                                borderRadius: "20px",
                                fontSize: "16px",
                                outline: "none",
                            }}
                        />
                        <Button variant="primary" onClick={this.handleSearch}>
                            <FaSearch />
                        </Button>
                        <Button
                            variant="primary"
                            onClick={this.toggleSortOrder}
                            className="sort-button"
                        >
                            <span title="Tri desc ou asc">{sortOrder === "asc" ? "▲" : "▼"}</span>
                        
                        </Button>
                    </InputGroup>
                </div>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Article Title</th>
                            <th>Author Name</th>
                            <th>Article Content</th>
                            <th>Publication Date</th>
                            <th>DELETE</th>
                            <th>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(filteredArticles || articles).map((article) => (
                            <tr key={article.id}>
                                <td>{article.id}</td>
                                <td>{article.titre}</td>
                                <td>{article.auteur}</td>
                                <td>{article.contenu}</td>
                                <td>{article.date_publication}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => this.handleDelete(article.id)}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/admin/article/edit/${article.id}`} className="btn btn-primary btn-sm mr-2">
                                        <FaEdit /> Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant="primary" onClick={this.exportToPDF}>
                    <FaFilePdf /> Export to PDF
                </Button>
                <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
    <ul style={{ listStyle: 'none', display: 'flex', padding: 0, gap: '10px' }}>
        <li style={{ margin: 0 }}>
            <button onClick={() => this.paginate(currentPage - 1)} style={buttonStyle}>Précédent</button>
        </li>
        {/* {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} style={{ margin: 0 }}>
                <button onClick={() => this.paginate(index + 1)} style={buttonStyle}>{index + 1}</button>
            </li>
        ))} */}
        <li style={{ margin: 0 }}>
            <button onClick={() => this.paginate(currentPage + 1)} style={buttonStyle}>Suivant</button>
        </li>
    </ul>
</div>

            </div>
        );
    }
}

export default ArticleList;
