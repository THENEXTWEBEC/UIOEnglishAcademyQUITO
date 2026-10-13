/* Progressive enhancement only. No submissions, tracking, storage or external runtime. */
const menu = document.querySelector(".menu");
const navigation = document.querySelector("#navigation");
const desktopNavigation = window.matchMedia("(min-width: 1024px)");

function setMenu(open, restoreFocus = false) {
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Cerrar menú de navegación" : "Abrir menú de navegación",
  );
  navigation.classList.toggle("open", open);
  if (restoreFocus) menu.focus();
}

menu.addEventListener("click", () => {
  setMenu(menu.getAttribute("aria-expanded") !== "true");
});
navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  setMenu(false);
  if (!desktopNavigation.matches) {
    const heading = document.querySelector(link.hash)?.querySelector("h2");
    if (heading) {
      heading.tabIndex = -1;
      requestAnimationFrame(() => heading.focus({ preventScroll: true }));
    }
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false, true);
  }
});
desktopNavigation.addEventListener("change", () => setMenu(false));

const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, focus = false) {
  tabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute("aria-controls")).hidden =
      !active;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    let target;
    if (["ArrowDown", "ArrowRight"].includes(event.key))
      target = (index + 1) % tabs.length;
    if (["ArrowUp", "ArrowLeft"].includes(event.key))
      target = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = tabs.length - 1;
    if (target !== undefined) {
      event.preventDefault();
      selectTab(tabs[target], true);
    }
  });
});

const form = document.querySelector("#inquiry");
const fields = ["name", "contact", "goal"].map((id) =>
  document.getElementById(id),
);
const goal = document.querySelector("#goal");
const errors = document.querySelector("#form-errors");
const prepared = document.querySelector("#email-fallback");
const copyStatus = document.querySelector("#copy-status");
let validationStarted = false;

function fieldMessage(field) {
  const value = field.value.trim();
  if (field.id === "name" && value.length < 2)
    return "Escribe tu nombre, con al menos dos caracteres.";
  if (field.id === "contact") {
    if (!value)
      return "Escribe un correo o teléfono para que puedan responderte.";
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const phone =
      /^\+?[\d\s().-]+$/.test(value) &&
      /^\d{7,15}$/.test(value.replace(/\D/g, ""));
    if (!email && !phone)
      return "Escribe un correo válido o un teléfono de 7 a 15 dígitos, con código de país si corresponde.";
  }
  if (field.id === "goal" && !value) return "Elige el objetivo de tu consulta.";
  return "";
}
function validateField(field) {
  const message = fieldMessage(field);
  const feedback = document.getElementById(`${field.id}-error`);
  field.setCustomValidity(message);
  field.setAttribute("aria-invalid", String(Boolean(message)));
  feedback.textContent = message;
  feedback.hidden = !message;
  return !message;
}
function clearPrepared() {
  prepared.hidden = true;
  document.querySelector("#prepared-message").value = "";
  copyStatus.textContent = "";
}
function updateGoal() {
  document.querySelector("#goal-status").textContent = goal.value
    ? `Tu consulta: ${goal.value}.`
    : "";
}

document.querySelectorAll("[data-goal]").forEach((link) => {
  link.addEventListener("click", () => {
    goal.value = link.dataset.goal;
    clearPrepared();
    updateGoal();
    if (validationStarted) validateField(goal);
  });
});
form.addEventListener("input", (event) => {
  if (!event.target.matches("input, select, textarea:not([readonly])")) return;
  clearPrepared();
  errors.hidden = true;
  if (validationStarted && fields.includes(event.target))
    validateField(event.target);
});
goal.addEventListener("change", updateGoal);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validationStarted = true;
  const invalidFields = fields.filter((field) => !validateField(field));
  if (invalidFields.length) {
    clearPrepared();
    errors.textContent =
      invalidFields.length === 1
        ? "Revisa el campo indicado antes de preparar tu consulta."
        : "Revisa los campos indicados antes de preparar tu consulta.";
    errors.hidden = false;
    invalidFields[0].focus();
    return;
  }
  errors.hidden = true;
  const data = new FormData(form);
  const message = String(data.get("message")).trim();
  const body = [
    "Hola, UIO English Academy:",
    "",
    `Soy ${String(data.get("name")).trim()}.`,
    `Mi contacto: ${String(data.get("contact")).trim()}`,
    `Me interesa: ${data.get("goal")}`,
    ...(message ? ["", message] : []),
    "",
    "Por favor, ayúdenme con información sobre disponibilidad, modalidad, horarios y costos. Si corresponde, quisiera consultar una clase demo gratuita.",
    "",
    "Gracias.",
  ].join("\n");
  document.querySelector("#prepared-message").value = body;
  document.querySelector("#open-email").href =
    `mailto:enqualitylanguages@gmail.com?subject=${encodeURIComponent(`Consulta: ${data.get("goal")}`)}&body=${encodeURIComponent(body)}`;
  prepared.hidden = false;
  document.querySelector("#prepared-title").focus();
});

document
  .querySelector("#copy-message")
  .addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const text = document.querySelector("#prepared-message");
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    try {
      await navigator.clipboard.writeText(text.value);
      copyStatus.textContent =
        "Mensaje copiado. Pégalo en tu correo y envíalo cuando estés listo.";
    } catch {
      text.focus();
      text.select();
      copyStatus.textContent =
        "Seleccionamos el mensaje. Usa la opción de copiar de tu dispositivo.";
    } finally {
      button.disabled = false;
      button.removeAttribute("aria-busy");
    }
  });
document.querySelector("#edit-message").addEventListener("click", () => {
  clearPrepared();
  fields[0].focus();
});

if ("IntersectionObserver" in window) {
  const navLinks = [...navigation.querySelectorAll("a")];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          if (link.hash === `#${entry.target.id}`)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
  );
  navLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) sectionObserver.observe(section);
  });

  // Content stays visible if JavaScript or animation support is unavailable.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-enter");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".section-heading, .section-photo, .academy-copy, .steps li",
      )
      .forEach((element) => revealObserver.observe(element));
  }
}

// Enable only after the preparation handler is installed; no accidental native GET submission.
document.querySelector("#prepare-query").disabled = false;
