// Gestion du menu hamburger
const menuHamburger = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".div-links");
const main = document.querySelector("main");
const logo = document.getElementById("logo");
const images = document.querySelector(".project-container");

menuHamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Empêche la propagation du clic

    // Basculer la visibilité du menu
    navLinks.classList.toggle("mobile-menu");

    // Appliquer le flou UNIQUEMENT quand le menu est ouvert
    if (navLinks.classList.contains("mobile-menu")) {
        main.classList.add("main-blur");
        logo.classList.add("main-blur");
        images.classList.add("main-blur");
    } else {
        main.classList.remove("main-blur");
        logo.classList.remove("main-blur");
        images.classList.remove("main-blur");
    }
});

// Fermer le menu et retirer le flou si on clique ailleurs
document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target)) {
        navLinks.classList.remove("mobile-menu");
        main.classList.remove("main-blur");
        logo.classList.remove("main-blur");
        images.classList.remove("main-blur");
    }
});

// Tableau de vos projets
const projects = [
    {
        title: "Projet 1",
        description: "Description du premier projet",
        image: "assets/snake.png",
        background: "url('assets/snake_fd.jpeg')", // Ajoutez cette ligne
    },
    {
        title: "Projet 2",
        description: "Description du deuxième projet",
        image: "assets/pvz.jpg",
        background: "url('assets/pvz_fd.jpeg')", // Ajoutez cette ligne
        link: "https://github.com/Ilan-D/PlantsVsZombie-revisited",
    },
    {
        title: "Projet 3",
        description: "Description du troisième projet",
        image: "assets/2048.png",
        background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Vous pouvez aussi utiliser des dégradés
    },
];

let currentProjectIndex = 0;

function updateProjects() {
    const centerProject = document.getElementById("center-project");
    const leftProject = document.getElementById("left-project");
    const rightProject = document.getElementById("right-project");
    const projectInfo = document.getElementById("project-info");
    const linkA3 = document.getElementById("link_git");

    // Calcul des index pour les projets gauche et droit
    const leftIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    const rightIndex = (currentProjectIndex + 1) % projects.length;

    // Mise à jour des images
    centerProject.src = projects[currentProjectIndex].image;
    leftProject.src = projects[leftIndex].image;
    rightProject.src = projects[rightIndex].image;

    // Mise à jour des informations
    projectInfo.querySelector("h2").textContent = projects[currentProjectIndex].title;
    projectInfo.querySelector("p").textContent = projects[currentProjectIndex].description;

    // Mise à jour du lien (nouveau code)
    if (projects[currentProjectIndex].link) { // Vérifie si un lien est défini
        linkA3.href = projects[currentProjectIndex].link;
        linkA3.style.display = "inline"; // Affiche le lien si caché
    } else {
        linkA3.href = "#"; // Lien par défaut
        // ou linkA3.style.display = "none" pour le cacher
    }

    document.body.style.backgroundImage = projects[currentProjectIndex].background;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.transition = "background-image 0.5s ease";
}

/**
 * fonction qui va prendre un des deux projets et va le glisser en fonction de la direction
 */
function slideProjects(direction) {
    const centerProject = document.getElementById("center-project");

    // Animation de glissement
    centerProject.classList.add(direction === -1 ? "slide-left" : "slide-right");

    setTimeout(() => {
        currentProjectIndex =
            (currentProjectIndex + direction + projects.length) % projects.length;
        updateProjects();

        // Réinitialise l'image centrale et enlève les classes d'animation
        centerProject.style.transform = "translateX(0)";
        centerProject.style.opacity = "1";
        centerProject.classList.remove("slide-left", "slide-right");
    }, 500);
}

// Écouteurs pour les clics sur les images latérales
document
    .getElementById("left-project")
    .addEventListener("click", () => slideProjects(-1));
document
    .getElementById("right-project")
    .addEventListener("click", () => slideProjects(1));

// Initialisation
updateProjects();
