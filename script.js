const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const projectData = {
  vaidosas: {
    type: "SITE / NEGÓCIO REAL",
    title: "Vaidosas Beauty",
    image: "https://s3.sa-east-1.amazonaws.com/arquivos.maismei.com.br/minisite/bec908d3-4a40-4faa-ab9a-2941690d3fda/logos/fcf8d4c8-6ba7-47c6-bb7c-7728702aac6f.jpg",
    description: "Projeto real ligado ao meu próprio negócio de beleza, usado aqui para demonstrar experiência com presença digital, organização de informações e apresentação de serviços.",
    details: ["Presença digital para negócio de beleza", "Apresentação de serviços", "Informações de contato e atendimento"],
    link: "https://vaidosas-beauty.maismei.link/"
  },
  "entre-fios": {
    type: "LANDING PAGE · PROJETO CONCEITUAL",
    title: "Entre Fios",
    image: "assets/entre-fios.png",
    description: "Landing page conceitual para uma marca artesanal de crochê, criada para demonstrar storytelling, catálogo visual e uma jornada simples até o contato.",
    details: ["Hero com proposta de valor", "Coleção de produtos", "Diferenciais da marca", "Fluxo de encomenda", "CTA para WhatsApp"],
    link: "#"
  },
  sabor: {
    type: "SITE INSTITUCIONAL · PROJETO CONCEITUAL",
    title: "Sabor & Mesa",
    image: "assets/sabor-e-mesa.png",
    description: "Site institucional conceitual para restaurante, com foco em experiência, cardápio, ambiente e conversão para reservas.",
    details: ["Apresentação do restaurante", "Cardápio por categorias", "Galeria", "Diferenciais", "Depoimento demonstrativo", "Reserva e localização"],
    link: "#"
  },
  lume: {
    type: "E-COMMERCE · PROJETO CONCEITUAL",
    title: "Lume Store",
    image: "assets/lume-store.png",
    description: "Conceito de e-commerce criado para demonstrar uma jornada de compra clara, categorias, produtos, benefícios e comunicação promocional.",
    details: ["Categorias", "Produtos em destaque", "Benefícios de compra", "Oferta promocional", "Newsletter", "Rodapé comercial"],
    link: "#"
  }
};

const modal = document.querySelector("#projectModal");
const modalImage = document.querySelector("#modalImage");
const modalType = document.querySelector("#modalType");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalDetails = document.querySelector("#modalDetails");
const modalLink = document.querySelector("#modalLink");

function openProject(key) {
  const project = projectData[key];
  if (!project) return;

  modalImage.src = project.image;
  modalImage.alt = `Preview do projeto ${project.title}`;
  modalType.textContent = project.type;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalDetails.innerHTML = `<ul>${project.details.map(item => `<li>${item}</li>`).join("")}</ul>`;

  if (project.link === "#") {
    modalLink.style.display = "none";
  } else {
    modalLink.style.display = "inline-flex";
    modalLink.href = project.link;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => openProject(card.dataset.project));
});

document.querySelectorAll("[data-close]").forEach(el => {
  el.addEventListener("click", closeProject);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeProject();
});

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, {rootMargin:"-35% 0px -55% 0px"});

sections.forEach(section => observer.observe(section));
