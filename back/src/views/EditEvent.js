import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditEvent() {
  const { id } = useParams();
  const [eventData, setEventData] = useState({
    nom_event: '',
    lieu_event: '',
    date_debut: '',
    date_fin: '',
    image_event: '',
    isActive: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8096/events/${id}`)
      .then(response => {
        setEventData(response.data);
      })
      .catch(error => {
        console.error('Error fetching event data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEventData = { ...eventData };
    axios
      .put(`http://localhost:8096/events/${id}`, updatedEventData)
      .then(response => {
        console.log('Event updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating event:', error);
      });
  }

  return (
    <div className="content">
      <h1>Edit Event</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="nom_event">Event Name</Label>
          <Input
            type="text"
            name="nom_event"
            id="nom_event"
            value={eventData.nom_event}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lieu_event">Event Location</Label>
          <Input
            type="text"
            name="lieu_event"
            id="lieu_event"
            value={eventData.lieu_event}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="date_debut">Start Date</Label>
          <Input
            type="text"
            name="date_debut"
            id="date_debut"
            value={eventData.date_debut}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="date_fin">End Date</Label>
          <Input
            type="text"
            name="date_fin"
            id="date_fin"
            value={eventData.date_fin}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="image_event">Event Image URL</Label>
          <Input
            type="text"
            name="image_event"
            id="image_event"
            value={eventData.image_event}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="isActive">Is Active</Label>
          <Input
            type="text"
            name="isActive"
            id="isActive"
            value={eventData.isActive}
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Update Event
        </Button>
      </Form>
    </div>
  );
}

export default EditEvent;
