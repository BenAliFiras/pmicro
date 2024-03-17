package com.example.fidelite_ms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FideliteService {
    private FideliteRepository fideliteRepository;

    @Autowired
    public FideliteService(FideliteRepository fideliteRepository) {
        this.fideliteRepository = fideliteRepository;
    }

    public List<Fidelite> getAllFidelites() {
        return fideliteRepository.findAll();
    }

    public Optional<Fidelite> getFideliteById(Integer id) {
        return fideliteRepository.findById(id);
    }

    public Fidelite createFidelite(Fidelite fidelite) {
        return fideliteRepository.save(fidelite);
    }


    public Fidelite updateFidelite(Integer id, Fidelite updatedFidelite) {
        if (fideliteRepository.existsById(id)) {
            updatedFidelite.setId(id);
            return fideliteRepository.save(updatedFidelite);
        }
        return null; // Handle not found error
    }

    public void deleteFidelite(Integer id) {
        fideliteRepository.deleteById(id);
    }
}
