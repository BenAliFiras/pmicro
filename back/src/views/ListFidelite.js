import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class ListFidelite extends Component {
  state = {
    fidelites: [],
    searchTerm: "",
  };

  componentDidMount() {
    axios
      .get("http://localhost:8092/fidelites")
      .then((response) => {
        const fidelites = response.data;
        this.setState({ fidelites });
        toast.success("Welcome to Fidelite list");
      })
      .catch((error) => {
        console.error("Error fetching Fidelites:", error);
      });
  }

  handleDelete = (fideliteId) => {
    axios
      .delete(`http://localhost:8092/fidelites/${fideliteId}`)
      .then((response) => {
        this.setState((prevState) => ({
          fidelites: prevState.fidelites.filter(
            (fidelite) => fidelite.id !== fideliteId
          ),
        }));
        toast.success("Fidelite deleted successfully");
        console.log("Fidelite deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting Fidelite:", error);
      });
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { fidelites, searchTerm } = this.state;
    const filteredFidelites = fidelites.filter((fidelite) =>
      fidelite.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="content">
        <ToastContainer />
        <h1 className="mb-4">Fidelite List</h1>
        <center>
          <div className="stand-with-palestine-banner">
            <p>Stand with Palestine</p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/2560px-Flag_of_Palestine.svg.png"
              alt="Palestinian Flag"
              style={{ width: "100px", height: "auto", marginBottom: "10px" }}
            />
          </div>
        </center>
        <Input
          type="text"
          placeholder="Search for a Fidelite"
          value={searchTerm}
          onChange={this.handleSearchChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Price</th>
              <th style={{ width: "250px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFidelites.map((fidelite) => (
              <tr key={fidelite.id}>
                <td>{fidelite.id}</td>
                <td>{fidelite.nom}</td>
                <td>{fidelite.description}</td>
                <td>{fidelite.duration}</td>
                <td>{fidelite.price}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.handleDelete(fidelite.id)}
                  >
                    Delete
                  </Button>
                  <Link
                    to={`/admin/fidelite/edit/${fidelite.id}`}
                    className="btn btn-primary ml-2"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ListFidelite;