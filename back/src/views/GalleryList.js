import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class GalleryList extends Component {
  state = {
    galleries: [],
    searchTheme: "",
    filteredGalleries: [],
    sortBy: "", // Added sortBy state
    selectedLocation: "", // Added selectedLocation state
    startDate: "", // New state properties for date range search
    endDate: "",
  };

  componentDidMount() {
    axios
      .get("http://localhost:8095/galleries")
      .then((response) => {
        const galleries = response.data;
        this.setState({ galleries });
        toast.success("Welcome to list gallery");
      })
      .catch((error) => {
        console.error("Error fetching galleries:", error);
      });
  }

  handleDelete = (galleryId) => {
    axios
      .delete(`http://localhost:8095/galleries/${galleryId}`)
      .then((response) => {
        this.setState((prevState) => ({
          galleries: prevState.galleries.filter(
            (gallery) => gallery.id !== galleryId
          ),
          filteredGalleries: prevState.filteredGalleries.filter(
            (gallery) => gallery.id !== galleryId
          ),
        }));
        toast.success("Gallery deleted successfully");
        console.log("Gallery deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting gallery:", error);
      });
  };

  // Function to export the table to PDF
  exportToPDF = () => {
    const { galleries } = this.state;
    const pdf = new jsPDF();
    const columns = [
      "ID",
      "GALLERY THEME",
      "GALLERY DESCRIPTION",
      "GALLERY START DATE",
      "GALLERY END DATE",
      "LOCATION",
    ];
    const data = galleries.map((gallery) => [
      gallery.id,
      gallery.theme,
      gallery.description,
      gallery.start_date,
      gallery.end_date,
      gallery.location,
    ]);

    pdf.autoTable({
      head: [columns],
      body: data,
    });

    pdf.save("GalleryList.pdf");
  };

  handleSearchThemeChange = (e) => {
    const searchTheme = e.target.value;
    const { galleries } = this.state;

    // Filter the galleries based on the gallery theme
    const filteredGalleries = galleries.filter((gallery) =>
      gallery.theme.toLowerCase().includes(searchTheme.toLowerCase())
    );

    this.setState({ filteredGalleries, searchTheme, sortBy: "" });
  };

  // Function to handle sorting by start date and end date
  handleSort = (sortBy) => {
    const { galleries, filteredGalleries } = this.state;
    const sortedGalleries = [
      ...(filteredGalleries.length > 0 ? filteredGalleries : galleries),
    ];

    sortedGalleries.sort((a, b) => {
      const dateA = new Date(a[sortBy]);
      const dateB = new Date(b[sortBy]);

      return dateA - dateB;
    });

    this.setState({ filteredGalleries: sortedGalleries, sortBy });
  };

  handleFilterByLocation = (e) => {
    const selectedLocation = e.target.value;
    this.setState({ selectedLocation });
  };

  getUniqueLocations = () => {
    const { galleries } = this.state;
    const locations = galleries.map((gallery) => gallery.location);
    return [...new Set(locations)];
  };

  handleDateRangeChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  filterByDateRange = (galleries) => {
    const { startDate, endDate } = this.state;

    if (startDate && endDate) {
      return galleries.filter((gallery) => {
        const galleryStartDate = new Date(gallery.start_date);
        const galleryEndDate = new Date(gallery.end_date);
        const selectedStartDate = new Date(startDate);
        const selectedEndDate = new Date(endDate);

        return (
          galleryStartDate >= selectedStartDate && galleryEndDate <= selectedEndDate
        );
      });
    }

    return galleries;
  };
  
  

  render() {
    const { galleries, searchTheme, selectedLocation, sortBy, startDate, endDate } = this.state;
    let displayedGalleries = [...galleries];

    if (selectedLocation) {
      displayedGalleries = galleries.filter(
        (gallery) => gallery.location === selectedLocation
      );
    }

    if (searchTheme) {
      displayedGalleries = displayedGalleries.filter((gallery) =>
        gallery.theme.toLowerCase().includes(searchTheme.toLowerCase())
      );
    }

    displayedGalleries = this.filterByDateRange(displayedGalleries);

    return (
      <div className="content">
        <ToastContainer />
        <h1 className="mb-4">Gallery List</h1>
        <Button color="primary" onClick={this.exportToPDF} className="mb-4">
          Export to PDF
        </Button>

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

        <Form>
          <FormGroup>
            <Label for="searchTheme">Search by Gallery Theme</Label>
            <Input
              type="text"
              name="searchTheme"
              id="searchTheme"
              placeholder="Enter Gallery Theme"
              value={searchTheme}
              onChange={this.handleSearchThemeChange}
            />
          </FormGroup>
        </Form>

        <Form>
          <FormGroup>
            <Label for="filterLocation">Filter by Location</Label>
            <Input
              type="select"
              name="filterLocation"
              id="filterLocation"
              onChange={this.handleFilterByLocation}
            >
              <option value="">All Locations</option>
              {this.getUniqueLocations().map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Form>

        {/* Date Range Search */}
        <Form>
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={this.handleDateRangeChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">End Date</Label>
            <Input
              type="date"
              name="endDate"
              id="endDate"
              value={endDate}
              onChange={this.handleDateRangeChange}
            />
          </FormGroup>
        </Form>

        {/* Gallery Table */}
        <Table striped bordered hover responsive>
          {/* Table Headers */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Gallery Theme</th>
              <th>Gallery Description</th>
              <th onClick={() => this.handleSort("start_date")}>
                Start Date {sortBy === "start_date" ? "▲" : ""}
              </th>
              <th onClick={() => this.handleSort("end_date")}>
                End Date {sortBy === "end_date" ? "▲" : ""}
              </th>
              <th>Location</th>
              <th>DELETE</th>
              <th>EDIT</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {displayedGalleries.map((gallery) => (
              <tr key={gallery.id}>
                <td>{gallery.id}</td>
                <td>{gallery.theme}</td>
                <td>{gallery.description}</td>
                <td>{gallery.start_date}</td>
                <td>{gallery.end_date}</td>
                <td>{gallery.location}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.handleDelete(gallery.id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Link
                    to={`/admin/gallery/edit/${gallery.id}`}
                    className="btn btn-primary btn-sm ml-2"
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

export default GalleryList;
