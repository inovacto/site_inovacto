(() => {
  const EMAIL = "gustavo@inovacto.com.br";

  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");
  const button = form.querySelector('button[type="submit"]');

  const setStatus = (msg, ok) => {
    status.textContent = msg;
    status.className = "mt-4 text-sm " + (ok ? "text-emerald-700" : "text-red-700");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      const invalid = form.querySelector(":invalid");
      const label = form.querySelector(`label[for="${invalid.id}"]`);
      setStatus(`Preencha o campo ${label ? label.firstChild.textContent.trim() : ""} corretamente.`, false);
      invalid.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    if (data.empresa_site) return; // honeypot
    delete data.empresa_site;

    const endpoint = form.dataset.endpoint?.trim();

    // Sem backend configurado: abre o e-mail do visitante com a mensagem pronta
    if (!endpoint) {
      const subject = `Orçamento: ${data.servico}`;
      const body =
        `Nome: ${data.nome}\nE-mail: ${data.email}` +
        (data.telefone ? `\nTelefone: ${data.telefone}` : "") +
        `\nServiço: ${data.servico}\n\n${data.mensagem}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("Abrimos o seu programa de e-mail com a mensagem pronta. Confirme o envio por lá.", true);
      return;
    }

    button.disabled = true;
    button.textContent = "Enviando...";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      setStatus("Mensagem enviada. Vamos responder no e-mail informado.", true);
    } catch {
      setStatus(`Não foi possível enviar agora. Escreva direto para ${EMAIL}.`, false);
    } finally {
      button.disabled = false;
      button.textContent = "Enviar mensagem";
    }
  });
})();