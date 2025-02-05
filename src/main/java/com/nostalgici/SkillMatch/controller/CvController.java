package com.nostalgici.SkillMatch.controller;

import com.nostalgici.SkillMatch.model.Cv;
import com.nostalgici.SkillMatch.service.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/cvs")
@CrossOrigin(origins = "*")
public class CvController {

    @Autowired
    private CvService cvService;

    // Ottieni CV filtrati
    @PostMapping
    public ResponseEntity<List<Cv>> getCvs(@RequestBody Map<String, Object> filters) {
        List<Cv> cvs = cvService.getCvs(filters);
        return ResponseEntity.ok(cvs);
    }

    // Carica un nuovo CV
    @PostMapping("/upload")
    public ResponseEntity<Cv> uploadCv(@RequestBody Cv cv) {
        Cv savedCv = cvService.saveCv(cv);
        return ResponseEntity.ok(savedCv);
    }

    // Aggiorna un CV esistente
    @PutMapping("/{id}")
    public ResponseEntity<Cv> updateCv(@PathVariable String id, @RequestBody Cv updatedCv) {
        Cv cv = cvService.updateCv(id, updatedCv);
        if (cv != null) {
            return ResponseEntity.ok(cv);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Elimina un CV
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCv(@PathVariable String id) {
        cvService.deleteCv(id);
        return ResponseEntity.noContent().build();
    }

    // Ottieni un CV specifico tramite ID
    @GetMapping("/{id}")
    public ResponseEntity<Cv> getCvById(@PathVariable String id) {
        Cv cv = cvService.getCvById(id);
        if (cv != null) {
            return ResponseEntity.ok(cv);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Ottieni tutti i CV
    @GetMapping
    public ResponseEntity<List<Cv>> getAllCvs() {
        List<Cv> cvs = cvService.getAllCvs();
        return ResponseEntity.ok(cvs);
    }

    @GetMapping("/competenze")
    public ResponseEntity<Set<String>> getAllCompetenze() {
        Set<String> competenze = cvService.getAllCompetenze();
        return ResponseEntity.ok(competenze);
    }

    @GetMapping("/ruoli")
    public ResponseEntity<Set<String>> getAllRuoli() {
        Set<String> ruoli = cvService.getAllRuoli();
        return ResponseEntity.ok(ruoli);
    }
}