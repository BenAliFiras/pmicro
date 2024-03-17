package com.earthrealmkoders.gallery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/galleries")
public class GalleryRestApi {
    @Autowired
    private GalleryService galleryService;

    @GetMapping
    public ResponseEntity<Iterable<Gallery>> getAllGalleries() {
        return new ResponseEntity<>(galleryService.getAllGalleries(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Optional<Gallery> getGalleryById(@PathVariable int id) {
        return galleryService.getGalleryById(id);
    }

    @PostMapping(consumes = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Gallery> createGallery(@RequestBody Gallery gallery) {
        return new ResponseEntity<>(galleryService.addGallery(gallery), HttpStatus.OK);
    }
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Gallery> updateGallery(@PathVariable(value = "id") int id,
                                         @RequestBody Gallery job){
        return new ResponseEntity<>(galleryService.updateGallery(id, job),
                HttpStatus.OK);
    }
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteGallery(@PathVariable(value = "id") int id){
        return new ResponseEntity<>(galleryService.deleteGallery(id), HttpStatus.OK);
    }
}
