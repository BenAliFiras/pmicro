package com.earthrealmkoders.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {
    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> SearchEventById(Integer id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Integer id, Event updatedEvent) {
        if (eventRepository.existsById(id)) {
            updatedEvent.setId(id);
            return eventRepository.save(updatedEvent);
        }
        return null; // Handle not found error
    }

    public void deleteEvent(Integer id) {
        eventRepository.deleteById(id);
    }




    public List<Event> getEventsByStatus(Event.Status status) {
        return eventRepository.findByIsActive(status);
    }








}