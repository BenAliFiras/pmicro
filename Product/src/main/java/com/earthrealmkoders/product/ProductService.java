package com.earthrealmkoders.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(int id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(int id, Product updatedProduct) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product productToUpdate = existingProduct.get();
            // Update properties here
            productToUpdate.setNomProduit(updatedProduct.getNomProduit());
            productToUpdate.setPrixProduit(updatedProduct.getPrixProduit());
            productToUpdate.setCategorie(updatedProduct.getCategorie());
            productToUpdate.setImageProduit(updatedProduct.getImageProduit());
            productToUpdate.setStockProduit(updatedProduct.getStockProduit());
            return productRepository.save(productToUpdate);
        } else {
            // Handle product not found
            return null;
        }
    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    public Product markAsFavorite(int id) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product productToMarkAsFavorite = existingProduct.get();
            productToMarkAsFavorite.setFavorite(true); // Mark the product as a favorite
            return productRepository.save(productToMarkAsFavorite);
        } else {
            // Handle product not found
            return null;
        }
    }


}
