package com.earthrealmkoders.events;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;
@Entity
public class Event implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom_event;
    private String lieu_event;
    private String date_debut;
    private String date_fin;
    private String image_event;

    @Enumerated(EnumType.STRING)
    private Status isActive;

    public Event() {
        // Default constructor
    }

    public Event(String nom_event, String lieu_event, String date_debut, String date_fin,
                  String image_event, Status isActive) {
        this.nom_event = nom_event;
        this.lieu_event = lieu_event;
        this.date_debut = date_debut;
        this.date_fin = date_fin;
        this.image_event = image_event;
        this.isActive = isActive;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom_event() {
        return nom_event;
    }

    public void setNom_event(String nom_event) {
        this.nom_event = nom_event;
    }

    public String getLieu_event() {
        return lieu_event;
    }

    public void setLieu_event(String lieu_event) {
        this.lieu_event = lieu_event;
    }

    public String getDate_debut() {
        return date_debut;
    }

    public void setDate_debut(String date_debut) {
        this.date_debut = date_debut;
    }

    public String getDate_fin() {
        return date_fin;
    }

    public void setDate_fin(String date_fin) {
        this.date_fin = date_fin;
    }



    public String getImage_event() {
        return image_event;
    }

    public void setImage_event(String image_event) {
        this.image_event = image_event;
    }

    public Status getIsActive() {
        return isActive;
    }

    public void setIsActive(Status isActive) {
        this.isActive = isActive;
    }

    // Define an enum for isActive
    public enum Status {
        Active,
        Inactive
    }
}
