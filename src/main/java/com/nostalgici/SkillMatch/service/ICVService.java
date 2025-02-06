package com.nostalgici.SkillMatch.service;

import com.nostalgici.SkillMatch.model.Cv;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ICVService {
    List<Cv> getCvs(Map<String, Object> filters);
    Cv saveCv(Cv cv);
    Cv updateCv(String id, Cv updatedCv);
    void deleteCv(String id);
    Cv getCvById(String id);
    List<Cv> getAllCvs();
    Set<String> getAllCompetenze();
    Set<String> getAllRuoli();

}
