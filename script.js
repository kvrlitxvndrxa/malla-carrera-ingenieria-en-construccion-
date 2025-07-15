const malla = [
  { semestre: 1, codigo: "FIN100-12", nombre: "Desarrollo integral", prereq: [] },
  { semestre: 1, codigo: "FIS1035", nombre: "Introducción a la física", prereq: [] },
  { semestre: 1, codigo: "ICC141", nombre: "Introducción a la Ingenieria en Construcción", prereq: [] },
  { semestre: 1, codigo: "MAT1001", nombre: "Fundamentos de matemáticas", prereq: [] },

  { semestre: 2, codigo: "FIS1002", nombre: "Física para ingeniería", prereq: ["MAT1001"] },
  { semestre: 2, codigo: "ICC150", nombre: "Dibujo de ingeniería 1", prereq: ["ICC141"] },
  { semestre: 2, codigo: "ICC151", nombre: "Química de los materiales", prereq: ["ICC141"] },
  { semestre: 2, codigo: "MAT1002", nombre: "Cálculo Diferencial e Integral", prereq: ["MAT1001"] },

  { semestre: 3, codigo: "ICC243", nombre: "Materiales de construcción", prereq: ["ICC151"] },
  { semestre: 3, codigo: "ICC246", nombre: "Práctica 1", prereq: ["ICC150"] },
  { semestre: 3, codigo: "ICC247", nombre: "Dibujo de ingeniería 2", prereq: ["ICC150"] },
  { semestre: 3, codigo: "ING9001", nombre: "Inglés 1", prereq: [] },
  { semestre: 3, codigo: "MAT1004", nombre: "Álgebra lineal", prereq: ["MAT1001"] },

  { semestre: 4, codigo: "ICC253", nombre: "Tecnología del hormigón", prereq: ["ICC243"] },
  { semestre: 4, codigo: "ICC254", nombre: "Topografía", prereq: ["ICC247"] },
  { semestre: 4, codigo: "ICC256", nombre: "Hidráulica", prereq: ["MAT1002"] },
  { semestre: 4, codigo: "ICC257", nombre: "Estadística y probabilidad", prereq: ["MAT1002"] },
  { semestre: 4, codigo: "ING9002", nombre: "Inglés 2", prereq: ["ING9001"] },

  { semestre: 5, codigo: "ICC310", nombre: "Medio ambiente y sustentabilidad", prereq: ["ICC257"] },
  { semestre: 5, codigo: "ICC334", nombre: "Contratos y administración de empresas", prereq: ["ICC253"] },
  { semestre: 5, codigo: "ICC335", nombre: "Edificación 1", prereq: ["ICC253"] },
  { semestre: 5, codigo: "ICC349", nombre: "Estructuras 1", prereq: ["ICC243"] },
  { semestre: 5, codigo: "ICC358", nombre: "Hidrología", prereq: ["ICC257"] },
  { semestre: 5, codigo: "ING9003", nombre: "Inglés 3", prereq: ["ING9002"] },

  { semestre: 6, codigo: "ICC346", nombre: "Aseguramiento de la calidad", prereq: ["ICC334"] },
  { semestre: 6, codigo: "ICC352", nombre: "Mecánica de suelos 1", prereq: ["ICC349"] },
  { semestre: 6, codigo: "ICC354", nombre: "Edificación 2", prereq: ["ICC335"] },
  { semestre: 6, codigo: "ICC357", nombre: "Obras sanitarias", prereq: ["ICC256"] },
  { semestre: 6, codigo: "ICC359", nombre: "Estructuras 2", prereq: ["ICC349"] },
  { semestre: 6, codigo: "ING9004", nombre: "Inglés 4", prereq: ["ING9003"] },

  { semestre: 7, codigo: "ICC440", nombre: "Mecánica de suelos 2", prereq: ["ICC352"] },
  { semestre: 7, codigo: "ICC443", nombre: "Equipamiento de edificios", prereq: ["ICC354"] },
  { semestre: 7, codigo: "ICC445", nombre: "Práctica 2", prereq: ["ICC246"] },
  { semestre: 7, codigo: "ICC446", nombre: "Gestión financiera en la construcción", prereq: ["ICC334"] },
  { semestre: 7, codigo: "ICC450", nombre: "Estructuras 3", prereq: ["ICC359"] },
  { semestre: 7, codigo: "ICC457", nombre: "Investigación de operaciones", prereq: ["ICC334"] },

  { semestre: 8, codigo: "ICC454", nombre: "Caminos 1", prereq: ["ICC440"] },
  { semestre: 8, codigo: "ICC460", nombre: "Programación y gestión de proyectos", prereq: ["ICC446"] },
  { semestre: 8, codigo: "ICC462", nombre: "Evaluación de proyectos", prereq: ["ICC457"] },
  { semestre: 8, codigo: "ICC463", nombre: "Obras de infraestructura", prereq: ["ICC440"] },

  { semestre: 9, codigo: "ICC544", nombre: "Caminos 2", prereq: ["ICC454"] },
  { semestre: 9, codigo: "ICC575", nombre: "Práctica 3", prereq: ["ICC445"] },
  { semestre: 9, codigo: "ICC579", nombre: "Taller de título", prereq: ["ICC460"] }
];

const aprobados = new Set();

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (let s = 1; s <= 9; s++) {
    const semestre = malla.filter(r => r.semestre === s);
    if (semestre.length === 0) continue;

    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>${s}° Semestre</h2>`;
    const ul = document.createElement("ul");

    semestre.forEach(ramo => {
      const li = document.createElement("li");
      li.textContent = `${ramo.codigo} - ${ramo.nombre}`;
      li.dataset.codigo = ramo.codigo;

      const requisitos = ramo.prereq || [];
      const habilitado = requisitos.every(req => aprobados.has(req));

      if (aprobados.has(ramo.codigo)) {
        li.classList.add("aprobado");
      } else if (habilitado) {
        li.classList.add("habilitado");
      }

      if (habilitado || aprobados.has(ramo.codigo)) {
        li.addEventListener("click", () => toggleRamo(ramo.codigo));
      }

      ul.appendChild(li);
    });

    div.appendChild(ul);
    contenedor.appendChild(div);
  }
}

function toggleRamo(codigo) {
  if (aprobados.has(codigo)) {
    aprobados.delete(codigo);
  } else {
    aprobados.add(codigo);
  }
  renderMalla();
}

function resetear() {
  aprobados.clear();
  renderMalla();
}

renderMalla();
