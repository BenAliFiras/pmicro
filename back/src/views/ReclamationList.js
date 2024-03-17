import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class ReclamationList extends Component {
  state = {
    reclamations: [],
    searchTerm: "",
  };

  componentDidMount() {
    axios
      .get("http://localhost:8093/reclamations")
      .then((response) => {
        const reclamations = response.data;
        this.setState({ reclamations });
        toast.success("Welcome to Reclamation list");
      })
      .catch((error) => {
        console.error("Error fetching Reclamations:", error);
      });
  }

  handleDelete = (reclamationId) => {
       axios
      .delete(`http://localhost:8093/reclamations/${reclamationId}`)
      .then((response) => {
        this.setState((prevState) => ({
          reclamations: prevState.reclamations.filter(
            (reclamation) => reclamation.id !== reclamationId
          ),
        }));
        toast.success("Reclamation deleted successfully");
        console.log("Reclamation deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting Reclamation:", error);
      });
  };
  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { reclamations , searchTerm} = this.state;
    const filteredReclamations = reclamations.filter((reclamation) =>
    reclamation.contenu.toLowerCase().includes(searchTerm.toLowerCase())
  );
    return (
      <div className="content">
        <ToastContainer />
        <h1 className="mb-4">Reclamation List</h1>
         <center>
          <div className="stand-with-palestine-banner">
            <p>Stand with Palestine</p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/2560px-Flag_of_Palestine.svg.png"
              alt="Palestinian Flag"
              style={{ width: "100px", height: "auto" , marginBottom: "10px"}}
            />
          </div>
        </center>
        <Input
      type="text"
      placeholder="Rechercher une réclamation"
      value={searchTerm}
      onChange={this.handleSearchChange}
      style={{ width: "100%" , marginBottom: "10px" }}
    />
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Notes&Observation</th>
              <th>Objet</th>
              <th>Contenu</th>
              <th>Status</th>
              <th>Date</th>
             
              <th style={{width:"250px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredReclamations.map((reclamation) => (
              <tr key={reclamation.id}>
                <td>{reclamation.id}</td>
                <td>{reclamation.idUser}</td>
                <td>{reclamation.objet}</td>
                <td>{reclamation.contenu}</td>
                <td>{reclamation.status}</td>
                <td>{reclamation.date}</td>
                
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.handleDelete(reclamation.id)}
                  >
                    Delete
                  </Button>
                  <Link
                    to={`/admin/reclamation/edit/${reclamation.id}`}
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

export default ReclamationList;
