package com.nostalgici.SkillMatch.service;

import com.nostalgici.SkillMatch.model.Cv;
import com.nostalgici.SkillMatch.repository.CvRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Repository
public class CvService implements ICVService {

    @Autowired
    private CvRepository cvRepository;

    /**
     * Ottiene i CV in base ai filtri specificati.
     *
     * @param filters Mappa contenente i filtri (es. query, anniEsperienza).
     * @return Lista di CV filtrati.
     */
    @Override
    public List<Cv> getCvs(Map<String, Object> filters) {
        // sperando che siano giusti
        String searchQuery = (String) filters.get("query");
        List<String> competenze = (List<String>) filters.get("competenze");
        List<String> ruoli = (List<String>) filters.get("ruoli");
        Integer anniEsperienza = (Integer) filters.get("anniEsperienza");

        if (isEmptyFilters(searchQuery, competenze, ruoli, anniEsperienza)) {
            return cvRepository.findAll();
        }
        if (searchQuery != null && !searchQuery.isEmpty()) {
            return searchByQuery(searchQuery);
        }

        return searchByFilters(competenze, ruoli, anniEsperienza);
    }

    /**
     * Salva un nuovo CV nel database.
     *
     * @param cv Oggetto Cv da salvare.
     * @return Il CV salvato.
     */
    @Override
    public Cv saveCv(Cv cv) {
        return cvRepository.save(cv);
    }

    /**
     * Aggiorna un CV esistente nel database.
     *
     * @param id ID del CV da aggiornare.
     * @param updatedCv Nuovi dati del CV.
     * @return Il CV aggiornato, oppure null se non esiste.
     */
    @Override
    public Cv updateCv(String id, Cv updatedCv) {
        Optional<Cv> existingCv = cvRepository.findById(id);
        if (existingCv.isPresent()) {
            Cv cv = existingCv.get();
            cv.setNome(updatedCv.getNome());
            cv.setRuolo(updatedCv.getRuolo());
            cv.setCompetenze(updatedCv.getCompetenze());
            cv.setDescrizione(updatedCv.getDescrizione());
            cv.setAnniEsperienza(updatedCv.getAnniEsperienza());
            return cvRepository.save(cv);
        }
        return null; // Restituisce null se il CV non esiste
    }

    /**
     * Elimina un CV dal database.
     *
     * @param id ID del CV da eliminare.
     */
    @Override
    public void deleteCv(String id) {
        cvRepository.deleteById(id);
    }

    /**
     * Ottiene un CV specifico tramite ID.
     *
     * @param id ID del CV da recuperare.
     * @return Il CV trovato, oppure null se non esiste.
     */
    @Override
    public Cv getCvById(String id) {
        Optional<Cv> cv = cvRepository.findById(id);
        return cv.orElse(null); // Restituisce null se il CV non esiste
    }

    /**
     * Ottiene tutti i CV presenti nel database.
     *
     * @return Lista di tutti i CV.
     */
    @Override
    public List<Cv> getAllCvs() {
        return cvRepository.findAll();
    }
    @Override
    public Set<String> getAllRuoli() {
        return cvRepository.findAll().stream()
                .map(Cv::getRuolo)
                .collect(Collectors.toSet());
    }

    @Override
    public Set<String> getAllCompetenze() {
        return cvRepository.findAll().stream()
                .flatMap(cv -> cv.getCompetenze().stream())
                .collect(Collectors.toSet());
    }

    private List<Cv> searchByFilters(List<String> competenze, List<String> ruoli, Integer anniEsperienza) {
        if (competenze != null && !competenze.isEmpty() &&
                ruoli != null && !ruoli.isEmpty() &&
                anniEsperienza != null && anniEsperienza > 0) {
            return cvRepository.findByCompetenzaAndRuoloAndEsperienza(competenze, ruoli, anniEsperienza);
        }

        if (competenze != null && !competenze.isEmpty()) {
            return cvRepository.findByMultipleCompetenze(competenze);
        }

        if (ruoli != null && !ruoli.isEmpty()) {
            return cvRepository.findByMultipleRuoli(ruoli);
        }

        if (anniEsperienza != null && anniEsperienza > 0) {
            return cvRepository.findByAnniEsperienzaGreaterThanEqual(anniEsperienza);
        }

        return cvRepository.findAll();
    }

    private boolean isEmptyFilters(String query, List<String> competenze, List<String> ruoli, Integer anniEsperienza) {
        return (query == null || query.isEmpty()) &&
                (competenze == null || competenze.isEmpty()) &&
                (ruoli == null || ruoli.isEmpty()) &&
                (anniEsperienza == null || anniEsperienza == 0);
    }


    private List<Cv> searchByQuery(String query) {
        Set<Cv> results = new HashSet<>();
        results.addAll(cvRepository.findByNomeContainingIgnoreCase(query));
        results.addAll(cvRepository.findByCompetenzeContainingIgnoreCase(query));
        results.addAll(cvRepository.findByRuoloContainingIgnoreCase(query));
        return new ArrayList<>(results);
    }
}