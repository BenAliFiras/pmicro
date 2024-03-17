package com.earthrealmkoders.article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArticleRepo extends JpaRepository<Article,Integer> {
    List<Article> findByTitreContainingIgnoreCase(String titre);

}
