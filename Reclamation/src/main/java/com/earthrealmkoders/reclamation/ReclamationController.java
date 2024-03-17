package com.earthrealmkoders.reclamation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin(origins="*")
@RequestMapping("/reclamations")
public class ReclamationController {

    private final ReclamationService reclamationService;

    @Autowired
    public ReclamationController(ReclamationService reclamationService) {
        this.reclamationService = reclamationService;
    }

    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return reclamationService.getAllReclamations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reclamation> getReclamationById(@PathVariable int id) {
        Optional<Reclamation> reclamation = reclamationService.getReclamationById(id);
        return reclamation.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Reclamation> createReclamation(@RequestBody Reclamation reclamation) {
        Reclamation createdReclamation = reclamationService.createReclamation(reclamation);
        return ResponseEntity.created(URI.create("/reclamations/" + createdReclamation.getId())).body(createdReclamation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reclamation> updateReclamation(@PathVariable int id, @RequestBody Reclamation updatedReclamation) {
        Reclamation updated = reclamationService.updateReclamation(id, updatedReclamation);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable int id) {
        reclamationService.deleteReclamation(id);
        return ResponseEntity.noContent().build();
    }
}
