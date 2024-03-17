package com.example.fidelite_ms;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/fidelites")

public class FideliteController {

    @Autowired
    private FideliteService fideliteService;

    @Autowired
    public FideliteController(FideliteService fideliteService) {
        this.fideliteService = fideliteService;
    }

    @GetMapping
    public List<Fidelite> getAllFidleites() {
        return fideliteService.getAllFidelites();
    }

    @GetMapping("/{id}")
    public Optional<Fidelite> getFideliteById(@PathVariable Integer id) {
        return fideliteService.getFideliteById(id);
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Fidelite> createFidelite(@RequestBody Fidelite fidelite) {

            return new ResponseEntity<>(fideliteService.createFidelite(fidelite), HttpStatus.OK);

    }

    @PutMapping("/{id}")
    public Fidelite updateFidelite(@PathVariable Integer id, @RequestBody Fidelite updateFidelite) {
        return fideliteService.updateFidelite(id, updateFidelite);
    }

    @DeleteMapping("/{id}")
    public void deleteFidelite(@PathVariable Integer id) {
        fideliteService.deleteFidelite(id);
    }
}
