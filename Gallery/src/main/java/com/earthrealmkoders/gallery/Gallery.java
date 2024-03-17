package com.earthrealmkoders.gallery;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Gallery implements Serializable {
    @Id
    @GeneratedValue
    private int id;

    private String theme;
    private String description;
    @Temporal(TemporalType.DATE)
    private Date start_date;
    @Temporal(TemporalType.DATE)
    private Date end_date;
    private String location;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Gallery() {
    }

    public Gallery(String theme, String description, Date start_date, Date end_date, String location) {
        this.theme = theme;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.location = location;
    }
}
