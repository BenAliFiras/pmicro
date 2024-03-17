import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
import jsPDF from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./design.css";
import { Link } from "react-router-dom";

class EventList extends Component {
  state = {
    events: [],
    sortedEvents: [], // State to store sorted events
    isSortedByDate: false, // By default, sorting by date is disabled
    isSortedByStatus: false, // By default, sorting by status is disabled
    searchId: "", // State for the event ID search
    searchName: "", // State for the event name search
  };

  componentDidMount() {
    // Fetch events from the API when the component mounts
    axios
      .get("http://localhost:8096/events")
      .then((response) => {
        const events = response.data;
        this.setState({ events, sortedEvents: events }); // Load events sorted by default
        toast.success("Welcome to the event list");
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }

  // Function to export the table to PDF
  exportToPDF = () => {
    const { events } = this.state;

    // Create a new PDF document
    const pdf = new jsPDF();

    // Define the columns and rows for the table
    const columns = [
      "ID",
      "Event Name",
      "Location",
      "Start Date",
      "End Date",
      "Status",
      "Image",
    ];
    const data = events.map((event) => [
      event.id,
      event.nom_event,
      event.lieu_event,
      event.date_debut,
      event.date_fin,
      event.isActive,
      event.image_event,
    ]);

    // Auto-table plugin to create a table in PDF
    pdf.autoTable({
      head: [columns],
      body: data,
    });

    // Save the PDF or open it in a new tab
    pdf.save("EventList.pdf");
  };

  // Function to handle event deletion
  handleDelete = (eventId) => {
    axios
      .delete(`http://localhost:8096/events/${eventId}`)
      .then((response) => {
        this.setState((prevState) => ({
          events: prevState.events.filter((event) => event.id !== eventId),
        }));
        toast.success("Event deleted successfully");
        console.log("Event deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  // Function to determine if an event is active or inactive based on its end date
  isEventActive = (endDate) => {
    const currentDate = new Date();
    const eventEndDate = new Date(endDate);

    return eventEndDate > currentDate ? "Active" : "Inactive";
  };

  // Function to sort events by date
  sortEventsByDate = () => {
    const { events } = this.state;

    const sortedEvents = [...events].sort((a, b) => {
      const dateA = new Date(a.date_fin);
      const dateB = new Date(b.date_fin);
      return dateA - dateB;
    });

    this.setState({
      sortedEvents,
      isSortedByDate: true,
      isSortedByStatus: false,
    });
  };

  // Function to sort events by status (active/inactive)
  sortEventsByStatus = () => {
    const { events } = this.state;

    const sortedEvents = [...events].sort((a, b) => {
      if (this.isEventActive(a.date_fin) === "Active") return -1;
      if (this.isEventActive(b.date_fin) === "Active") return 1;
      return 0;
    });

    this.setState({
      sortedEvents,
      isSortedByDate: false,
      isSortedByStatus: true,
    });
  };

  // Function to reset sorting
  resetSorting = () => {
    this.setState({
      sortedEvents: [],
      isSortedByDate: false,
      isSortedByStatus: false,
    });
  };

  // Function to handle the search input change for Event ID
  handleSearchIdChange = (e) => {
    this.setState({ searchId: e.target.value });
  };

  // Function to handle the search form submission for Event ID
  handleSearchById = (e) => {
    e.preventDefault();
    const { searchId, events } = this.state;

    // Find the event with the matching ID
    const event = events.find((event) => event.id === parseInt(searchId, 10));

    if (event) {
      this.setState({ sortedEvents: [event] });
    } else {
      toast.error(`Event with ID ${searchId} not found`);
      this.setState({ sortedEvents: [] });
    }
  };

  // Function to handle the search input change for Event Name
  handleSearchNameChange = (e) => {
    this.setState({ searchName: e.target.value });
  };

  // Function to handle the search form submission for Event Name
  handleSearchByName = (e) => {
    e.preventDefault();
    const { searchName, events } = this.state;

    // Filter the events based on the event name
    const filteredEvents = events.filter((event) =>
      event.nom_event.toLowerCase().includes(searchName.toLowerCase())
    );

    if (filteredEvents.length > 0) {
      this.setState({ sortedEvents: filteredEvents });
    } else {
      toast.error(`No events found with the name containing "${searchName}"`);
      this.setState({ sortedEvents: [] });
    }
  };

  render() {
    const {
      isSortedByDate,
      isSortedByStatus,
      sortedEvents,
      searchId,
      searchName,
    } = this.state;
    return (
      <div className="content">
        <ToastContainer />
        <h1 className="mb-4">Event List</h1>
        <Button color="primary" onClick={this.exportToPDF} className="mb-4">
          Export to PDF
        </Button>

        {/* Add a search form for Event ID */}

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
        {/* Add a search form for Event Name */}
        <Form onSubmit={this.handleSearchByName}>
          <FormGroup>
            <Label for="searchName">Search by Event Name</Label>
            <Input
              type="text"
              name="searchName"
              id="searchName"
              placeholder="Enter Event Name"
              value={searchName}
              onChange={this.handleSearchNameChange}
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Search by Name
          </Button>
        </Form>

        {/* Sorting buttons */}
        <div className="mb-4">
          <Button
            color="info"
            onClick={this.sortEventsByDate}
            disabled={isSortedByDate}
            className="mr-2"
          >
            Sort by Date
          </Button>
          <Button
            color="info"
            onClick={this.sortEventsByStatus}
            disabled={isSortedByStatus}
            className="mr-2"
          >
            Sort by Status
          </Button>
          <Button
            color="secondary"
            onClick={this.resetSorting}
            disabled={!isSortedByDate && !isSortedByStatus}
          >
            Reset Sorting
          </Button>
        </div>

        {/* Event table */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Event Name</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Image</th>
              <th>DELETE</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {sortedEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.nom_event}</td>
                <td>{event.lieu_event}</td>
                <td>{event.date_debut}</td>
                <td>{event.date_fin}</td>
                <td>
                  {this.isEventActive(event.date_fin) === "Active" ? (
                    <span className="active-circle"></span>
                  ) : (
                    <span className="inactive-circle"></span>
                  )}
                  {this.isEventActive(event.date_fin)}
                </td>
                <td>
                  <img
                    src={event.image_event}
                    alt={event.nom_event}
                    style={{ maxWidth: "100px" }}
                  />
                </td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.handleDelete(event.id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Link
                    to={`/admin/event/${event.id}`}
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

export default EventList;
