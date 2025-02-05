// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cvFeed = document.getElementById("cv-feed");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const experienceSlider = document.getElementById("experience-slider");
    const experienceValue = document.getElementById("experience-value");
    const skillsFilter = document.getElementById("skills-filter");
    const rolesFilter = document.getElementById("roles-filter");

    let selectedSkills = new Set();
    let selectedRoles = new Set();

    // Carica competenze e ruoli disponibili
    async function loadFilters() {
        try {
            const [competenzeResponse, ruoliResponse] = await Promise.all([
                fetch("http://localhost:8080/api/cvs/competenze"),
                fetch("http://localhost:8080/api/cvs/ruoli")
            ]);

            const competenze = await competenzeResponse.json();
            const ruoli = await ruoliResponse.json();

            renderSkillsFilter(competenze);
            renderRolesFilter(ruoli);
        } catch (error) {
            console.error("Error loading filters:", error);
        }
    }

    function renderSkillsFilter(competenze) {
        skillsFilter.innerHTML = competenze.map(skill => `
            <div class="filter-item">
                <input type="checkbox" id="skill-${skill}" value="${skill}">
                <label for="skill-${skill}">${skill}</label>
            </div>
        `).join('');

        // Aggiungi event listeners
        skillsFilter.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    selectedSkills.add(checkbox.value);
                } else {
                    selectedSkills.delete(checkbox.value);
                }
                applyFilters();
            });
        });
    }

    function renderRolesFilter(ruoli) {
        rolesFilter.innerHTML = ruoli.map(role => `
            <div class="filter-item">
                <input type="checkbox" id="role-${role}" value="${role}">
                <label for="role-${role}">${role}</label>
            </div>
        `).join('');

        // Aggiungi event listeners
        rolesFilter.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    selectedRoles.add(checkbox.value);
                } else {
                    selectedRoles.delete(checkbox.value);
                }
                applyFilters();
            });
        });
    }

    // Aggiorna il valore dello slider dell'esperienza
    experienceSlider.addEventListener('input', () => {
        experienceValue.textContent = `${experienceSlider.value} anni`;
        applyFilters();
    });

    async function applyFilters() {
        const filters = {
            query: searchInput.value,
            competenze: Array.from(selectedSkills),
            ruoli: Array.from(selectedRoles),
            anniEsperienza: parseInt(experienceSlider.value, 10)
        };

        await fetchCVs(filters);
    }

    async function fetchCVs(filters = {}) {
        try {
            const response = await fetch("http://localhost:8080/api/cvs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filters)
            });
            const data = await response.json();
            renderCVs(data);
        } catch (error) {
            console.error("Error fetching CVs:", error);
            cvFeed.innerHTML = "<p>Si è verificato un errore durante il caricamento dei CV.</p>";
        }
    }

    function renderCVs(cvs) {
        cvFeed.innerHTML = "";
        if (cvs.length === 0) {
            cvFeed.innerHTML = "<p>Nessun risultato trovato.</p>";
            return;
        }

        cvs.forEach((cv) => {
            const card = document.createElement("div");
            card.className = "cv-card";
            card.innerHTML = `
                <h3>${cv.nome} - ${cv.ruolo}</h3>
                <p><strong>Esperienza:</strong> ${cv.anniEsperienza} anni</p>
                <p><strong>Competenze:</strong> ${cv.competenze.join(", ")}</p>
                <p class="cv-description">${cv.descrizione}</p>
                <button class="view-cv-btn" onclick="viewFullCV('${cv.id}')">
                    Visualizza CV Completo
                </button>
            `;
            cvFeed.appendChild(card);
        });
    }

    // Event listener per la ricerca
    searchButton.addEventListener("click", applyFilters);
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            applyFilters();
        }
    });

    // Carica i filtri e i CV all'avvio
    loadFilters();
    fetchCVs();
});