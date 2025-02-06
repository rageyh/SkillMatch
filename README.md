---

# 🌟 SkillMatch - Piattaforma di Matching per Competenze 🌟

![SkillMatch Logo]([https://via.placeholder.com/150](https://www.itstechtalentfactory.it/wp-content/uploads/2024/10/ITS-Academy-Tech-Talent-Factory.png)) 

SkillMatch è una piattaforma moderna che permette agli utenti di cercare, visualizzare e caricare CV basati su competenze professionali. L'applicazione combina un'interfaccia utente intuitiva con backend robusto basato su Spring Boot e MongoDB, offrendo un'esperienza fluida e scalabile.

---

## 📋 Indice

- [Descrizione del Progetto](#descrizione-del-progetto)
- [Funzionalità Principali](#funzionalità-principali)
- [Requisiti](#requisiti)
- [Installazione e Configurazione](#installazione-e-configurazione)
- [Popolamento del Database](#popolamento-del-database)
- [Esecuzione dell'Applicazione](#esecuzione-dellapplicazione)
- [Contributi](#contributi)
- [Licenza](#licenza)

---

## 📖 Descrizione del Progetto

SkillMatch è un'applicazione web che consente agli utenti di:
- Cercare CV in base a competenze, ruoli o anni di esperienza.
- Caricare nuovi CV tramite un form interattivo.
- Visualizzare i risultati in tempo reale con filtri avanzati.

Il backend è costruito utilizzando **Spring Boot**, mentre il frontend è realizzato con **HTML, CSS e JavaScript**. Il database utilizza **MongoDB** per memorizzare i dati dei CV in formato semistrutturato.

---

## ✨ Funzionalità Principali

- **Ricerca Avanzata**: Filtra i CV in base a competenze, ruoli o anni di esperienza.
- **Caricamento CV**: Aggiungi nuovi CV tramite un form modale.
- **Interfaccia Utente Moderna**: Design pulito e responsive per una migliore esperienza utente.
- **Backend Scalabile**: API RESTful per gestire le operazioni CRUD sui CV.
- **Docker Support**: Facile deploy con Docker Compose.

---

## 🛠️ Requisiti (Se non si utilizza docker)

Prima di eseguire l'applicazione, assicurati di avere installato i seguenti strumenti:

- **Java 17** (o superiore)
- **Node.js** (opzionale, se il frontend è separato)
- **MongoDB** (incluso nel Docker Compose)
- **Git** (per clonare il repository)

---

## 🚀 Installazione e Configurazione

### 1. Clona il Repository
```bash
git clone https://github.com/tuo-username/skillmatch.git
cd skillmatch
```

### 2. Configura MongoDB
Assicurati che MongoDB sia configurato correttamente nel file `application.properties`:
```properties
spring.data.mongodb.uri=mongodb://admin:password@localhost:27017/skillmatch
spring.data.mongodb.database=skillmatch
```

### 3. Popola il Database
Prima di avviare l'applicazione, è necessario popolare il database con alcuni dati iniziali. Puoi farlo importando un file CSV o inserendo manualmente i dati in MongoDB.

#### 1. Inserimento Manuale
Puoi inserire i dati direttamente in MongoDB usando `mongosh`:
```javascript
use skillmatch;
db.cvs.insertMany([
    {
        nome: "Mario Rossi",
        ruolo: "Data Scientist",
        competenze: ["Python", "Machine Learning"],
        descrizione: "Esperto in analisi dati.",
        anniEsperienza: 5
    },
    // Aggiungi altri CV qui...
]);
```

---

## ▶️ Esecuzione dell'Applicazione

### 1. Avvia l'Applicazione con Docker Compose
```bash
docker-compose up --build
```

### 2. Accedi all'Applicazione
Apri il browser e vai all'URL:
```
http://localhost:8080/
```

### 3. Testa l'API
Puoi testare l'API RESTful usando Postman o `curl`:
```bash
curl -X POST http://localhost:8080/api/cvs \
-H "Content-Type: application/json" \
-d '{"query": "Python", "anniEsperienza": 2}'
```

---

## 📜 Licenza

Questo progetto è rilasciato sotto la licenza del miglior team its (Libutti, Manfredi, e il generale)
