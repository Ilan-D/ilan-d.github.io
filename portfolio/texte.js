// Gestion du menu hamburger
const menuHamburger = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".div-links");

menuHamburger.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-menu");
  texteDiv.classList.toggle("hidden");
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

    // Calcul des index pour les projets gauche et droit
    const leftIndex =
        (currentProjectIndex - 1 + projects.length) % projects.length;
    const rightIndex = (currentProjectIndex + 1) % projects.length;

    // Mise à jour des images
    centerProject.src = projects[currentProjectIndex].image;
    leftProject.src = projects[leftIndex].image;
    rightProject.src = projects[rightIndex].image;

    // Mise à jour des informations
    projectInfo.querySelector("h2").textContent = projects[currentProjectIndex].title;
    projectInfo.querySelector("p").textContent = projects[currentProjectIndex].description;

    document.body.style.backgroundImage = projects[currentProjectIndex].background;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.transition = "background-image 0.5s ease";
}

function slideProjects(direction) {
  const centerProject = document.getElementById("center-project");

  // Dans slideProjects(), avant de changer le projet
//   document.body.style.opacity = "0";
//   setTimeout(() => {
//     updateProjects();
//     document.body.style.opacity = "1";
//   }, 500);

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
