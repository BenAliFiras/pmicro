package com.earthrealmkoders.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RequestMapping("/article")
@RestController
@CrossOrigin(origins="*")
public class ArticleController {
    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable int id) {
        Optional<Article> article = articleService.getArticleById(id);
        return article.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

   @PostMapping
    public ResponseEntity<Article> createReclamation(@RequestBody Article article) {
       Article createdArticle = articleService.createArticle(article);
        return ResponseEntity.created(URI.create("/articles/" + createdArticle.getId())).body(createdArticle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateProduct(@PathVariable int id, @RequestBody Article updatedArticle) {
        Article updated = articleService.updateArticle(id, updatedArticle);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable int id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/search")
    public ResponseEntity<List<Article>> searchArticles(@RequestParam("query") String query) {
        List<Article> searchResults = articleService.searchArticles(query);
        return ResponseEntity.ok(searchResults);
    }
}
