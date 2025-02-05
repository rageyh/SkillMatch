package com.nostalgici.SkillMatch.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.neo4j.core.schema.GeneratedValue;

import java.util.List;

@Data
@Document(collection = "cvs")
public class Cv {
    @Id
    private String id;
    private String nome;
    private String ruolo;
    private List<String> competenze;
    private String descrizione;
    private int anniEsperienza;
}
