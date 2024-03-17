package com.earthrealmkoders.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {
    private final ArticleRepo articleRepository;

    @Autowired
    public ArticleService(ArticleRepo articleRepository) {
        this.articleRepository = articleRepository;
    }


    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Optional<Article> getArticleById(int id) {
        return articleRepository.findById(id);
    }

    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    public Article updateArticle(int id, Article updatedArticle) {
        Optional<Article> existingArticle = articleRepository.findById(id);
        if (existingArticle.isPresent()) {
            Article articleToUpdate = existingArticle.get();
            // Update properties here
            articleToUpdate.setContenu(updatedArticle.getContenu());
            articleToUpdate.setAuteur(updatedArticle.getAuteur());
            articleToUpdate.setTitre(updatedArticle.getTitre());
            articleToUpdate.setDate_publication(updatedArticle.getDate_publication());
            return articleRepository.save(articleToUpdate);
        } else {
            // Handle product not found
            return null;
        }
    }

    public void deleteArticle(int id) {
        articleRepository.deleteById(id);
    }
    public List<Article> searchArticles(String query) {
        return articleRepository.findByTitreContainingIgnoreCase(query);
    }


}
