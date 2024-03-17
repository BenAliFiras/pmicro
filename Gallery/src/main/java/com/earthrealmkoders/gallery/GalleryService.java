package com.earthrealmkoders.gallery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {
    @Autowired
    private GalleryRepository galleryRepository;

    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    public Optional<Gallery> getGalleryById(int id) {
        return galleryRepository.findById(id);
    }
    public Gallery addGallery(Gallery gallery) {
        return galleryRepository.save(gallery);
    }

    public Gallery updateGallery(int id, Gallery newGallery) {
        if (galleryRepository.findById(id).isPresent()) {
            Gallery existingGallery = galleryRepository.findById(id).get();
            existingGallery.setTheme(newGallery.getTheme());
            existingGallery.setDescription(newGallery.getDescription());
            existingGallery.setStart_date(newGallery.getStart_date());
            existingGallery.setEnd_date(newGallery.getEnd_date());
            existingGallery.setLocation(newGallery.getLocation());
            return galleryRepository.save(existingGallery);
        } else
            return null;
    }

    public String deleteGallery(int id) {
        if (galleryRepository.findById(id).isPresent()) {
            galleryRepository.deleteById(id);
            return "gallery supprimé";
        } else
            return "gallery non supprimé";
    }
}
