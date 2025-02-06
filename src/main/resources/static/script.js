// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cvFeed = document.getElementById("cv-feed");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const experienceSlider = document.getElementById("experience-slider");
    const experienceValue = document.getElementById("experience-value");
    const skillsFilter = document.getElementById("skills-filter");
    const rolesFilter = document.getElementById("roles-filter");
    const uploadCvBtn = document.getElementById("upload-cv");

    let selectedSkills = new Set();
    let selectedRoles = new Set();

    // Modal for CV details and upload
    function createModal() {
        const modal = document.createElement("div");
        modal.id = "cv-modal";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div id="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Aggiungi questi gestori eventi
        modal.querySelector(".close").addEventListener("click", () => modal.style.display = "none");
        window.addEventListener("click", (e) => e.target === modal && (modal.style.display = "none"));
        
        return modal;
    }

    const modal = createModal();

    // Function to view full CV details
    async function viewFullCV(cvId) {
        try {
            const response = await fetch(`http://localhost:8080/api/cvs/${cvId}`);
            const cv = await response.json();
    
            const modalBody = document.getElementById("modal-body");
            modalBody.innerHTML = `
                <div id="cv-details">
                    <h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        ${cv.nome} - ${cv.ruolo}
                    </h2>
                    <div class="cv-detail-section">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            Esperienza Professionale
                        </h3>
                        <p class="detailed-expirience"><strong>Anni di Esperienza:</strong> ${cv.anniEsperienza} anni</p>
                    </div>
                    <div class="cv-detail-section">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            Competenze
                        </h3>
                        <div class="competenze-list">
                            ${cv.competenze.map(competenza => 
                                `<span class="competenza-tag">${competenza}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="cv-detail-section">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                            Descrizione Profilo
                        </h3>
                        <p class="detailed-description">${cv.descrizione}</p>
                    </div>
                </div>
            `;
    
            modal.style.display = "block";
        } catch (error) {
            console.error("Error fetching CV details:", error);
            alert("Impossibile caricare i dettagli del CV");
        }
    }

    // Function to show CV upload form
    function showCvUploadForm() {
        const modalBody = document.getElementById("modal-body");
        modalBody.innerHTML = `
            <h2>Carica il tuo CV</h2>
            <form id="cv-upload-form">
                <div class="form-group">
                    <label for="nome">Nome Completo</label>
                    <input type="text" id="nome" required>
                </div>
                <div class="form-group">
                    <label for="ruolo">Ruolo</label>
                    <input type="text" id="ruolo" required>
                </div>
                <div class="form-group">
                    <label for="anniEsperienza">Anni di Esperienza</label>
                    <input type="number" id="anniEsperienza" min="0" required>
                </div>
                <div class="form-group">
                    <label for="competenze">Competenze (separate da virgola)</label>
                    <input type="text" id="competenze" required>
                </div>
                <div class="form-group">
                    <label for="descrizione">Descrizione</label>
                    <textarea id="descrizione" required></textarea>
                </div>
                <button type="submit" class="submit-btn">Carica CV</button>
            </form>
        `;

        const form = document.getElementById("cv-upload-form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const cv = {
                nome: document.getElementById("nome").value,
                ruolo: document.getElementById("ruolo").value,
                anniEsperienza: parseInt(document.getElementById("anniEsperienza").value),
                competenze: document.getElementById("competenze").value.split(",").map(s => s.trim()),
                descrizione: document.getElementById("descrizione").value
            };

            try {
                const response = await fetch("http://localhost:8080/api/cvs/upload", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cv)
                });

                if (response.ok) {
                    alert("CV caricato con successo!");
                    modal.style.display = "none";
                    fetchCVs(); // Refresh CV list
                } else {
                    throw new Error("Errore nel caricamento del CV");
                }
            } catch (error) {
                console.error("Error uploading CV:", error);
                alert("Impossibile caricare il CV. Riprova.");
            }
        });

        modal.style.display = "block";
    }

    // Existing functions from previous implementation
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
            cvFeed.innerHTML = "<p class='no-results'>Nessun risultato trovato.</p>";
            return;
        }
    
        cvs.forEach((cv) => {
            const card = document.createElement("div");
            card.className = "cv-card";
            card.innerHTML = `
                <h3>${cv.nome} - ${cv.ruolo}</h3>
                <div class="cv-card-content">
                    <p><strong>Esperienza:</strong> ${cv.anniEsperienza} anni</p>
                    <p><strong>Competenze:</strong> ${cv.competenze.join(", ")}</p>
                    <p class="cv-description">${cv.descrizione}</p>
                    <button class="view-cv-btn" data-cv-id="${cv.id}">
                        <i>👁️</i>
                        Visualizza Dettagli CV
                    </button>
                </div>
            `;
            cvFeed.appendChild(card);
        });
    
        // Add event listeners to view CV buttons
        cvFeed.querySelectorAll(".view-cv-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const cvId = btn.getAttribute("data-cv-id");
                viewFullCV(cvId);
            });
        });
    }
    

    // Existing filter and search functions
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

    // Event listeners
    searchButton.addEventListener("click", applyFilters);
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            applyFilters();
        }
    });

    // Add event listener for CV upload button
    uploadCvBtn.addEventListener("click", showCvUploadForm);

    // Load filters and CVs on startup
    loadFilters();
    fetchCVs();
});