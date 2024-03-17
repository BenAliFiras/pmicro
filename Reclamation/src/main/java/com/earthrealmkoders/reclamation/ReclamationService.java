package com.earthrealmkoders.reclamation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public class ReclamationService {

    private final ReclamationRepository reclamationRepository;

    @Autowired
    public ReclamationService(ReclamationRepository reclamationRepository) {
        this.reclamationRepository = reclamationRepository;
    }


    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    public Optional<Reclamation> getReclamationById(int id) {
        return reclamationRepository.findById(id);
    }

    public Reclamation createReclamation(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    public Reclamation updateReclamation(int id, Reclamation updatedReclamation) {
        Optional<Reclamation> existingReclamation = reclamationRepository.findById(id);
        if (existingReclamation.isPresent()) {
            Reclamation reclamationToUpdate = existingReclamation.get();

            // Update properties
            reclamationToUpdate.setContenu(updatedReclamation.getContenu());
            reclamationToUpdate.setObjet(updatedReclamation.getObjet());
            reclamationToUpdate.setIdUser(updatedReclamation.getIdUser());
            reclamationToUpdate.setStatus(updatedReclamation.getStatus());
            // Update the date to the current date
            reclamationToUpdate.setDate(new Date());

            return reclamationRepository.save(reclamationToUpdate);
        } else {
            // Handle reclamation not found
            return null;
        }
    }


    public void deleteReclamation(int id) {
        reclamationRepository.deleteById(id);
    }
}
