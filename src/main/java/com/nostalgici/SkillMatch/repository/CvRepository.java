package com.nostalgici.SkillMatch.repository;

import com.nostalgici.SkillMatch.model.Cv;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CvRepository extends MongoRepository<Cv, String> {
    // Metodi esistenti
    List<Cv> findByCompetenzeContainingIgnoreCase(String competenza);
    List<Cv> findByRuoloContainingIgnoreCase(String ruolo);
    List<Cv> findByAnniEsperienzaGreaterThanEqual(int anniEsperienza);

    // Nuovi metodi
    List<Cv> findByNomeContainingIgnoreCase(String nome);

    @Query("{'competenze': {$all: ?0}}")
    List<Cv> findByMultipleCompetenze(List<String> competenze);

    @Query("{'ruolo': {$in: ?0}}")
    List<Cv> findByMultipleRuoli(List<String> ruoli);

    @Query("{'$and': [{'competenze': {$all: ?0}}, {'ruolo': {$in: ?1}}, {'anniEsperienza': {$gte: ?2}}]}")
    List<Cv> findByCompetenzaAndRuoloAndEsperienza(List<String> competenze, List<String> ruoli, int anniEsperienza);
}