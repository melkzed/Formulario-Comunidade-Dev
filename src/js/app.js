var EJS = {
  pubkey: "EqY4ZvSg14BggUlh2",
  service: "service_j6hjcqn",
  template: "template_ul3c6rm",
};

var emailJsReady = false;
var reserveActive = { 1: false, 2: false };
var currentTeamSize = 1; // capitão + 1 (mínimo)

var RANKS = [
  "Ferro",
  "Bronze",
  "Prata",
  "Ouro",
  "Platina",
  "Diamante",
  "Ascendente",
  "Imortal",
  "Radiante",
];

function isAdminMode() {
  return window.location.search.indexOf("admin=1") !== -1;
}

function rankOptionsHtml() {
  var opts = '<option value="">Selecione o rank</option>';
  RANKS.forEach(function (r) {
    opts += "<option>" + r + "</option>";
  });
  return opts;
}

function loadConfig() {
  var storedPubkey = localStorage.getItem("ejs_pubkey");
  var storedService = localStorage.getItem("ejs_service");
  var storedTemplate = localStorage.getItem("ejs_template");

  if (storedPubkey) EJS.pubkey = storedPubkey;
  if (storedService) EJS.service = storedService;
  if (storedTemplate) EJS.template = storedTemplate;

  var pub = document.getElementById("cfg-pubkey");
  var srv = document.getElementById("cfg-service");
  var tpl = document.getElementById("cfg-template");
  if (pub) pub.value = EJS.pubkey || "";
  if (srv) srv.value = EJS.service || "";
  if (tpl) tpl.value = EJS.template || "";

  var adminMode = isAdminMode();
  if (EJS.pubkey && EJS.service && EJS.template) {
    emailjs.init({ publicKey: EJS.pubkey });
    emailJsReady = true;
    setConfigStatus("✓ EmailJS configurado e ativo", "ok");
    var sBody = document.getElementById("setup-body");
    var sHead = document.getElementById("setup-header");
    if (sBody) sBody.classList.remove("open");
    if (sHead) sHead.classList.remove("open");
  }

  if (adminMode) {
    var banner = document.getElementById("setup-banner");
    if (banner) banner.classList.remove("hidden");
  }
}

function saveConfig() {
  var pk = document.getElementById("cfg-pubkey").value.trim();
  var sv = document.getElementById("cfg-service").value.trim();
  var tp = document.getElementById("cfg-template").value.trim();

  if (!pk || !sv || !tp) {
    setConfigStatus("✗ Preencha todos os três campos", "fail");
    return;
  }

  EJS.pubkey = pk;
  EJS.service = sv;
  EJS.template = tp;
  localStorage.setItem("ejs_pubkey", pk);
  localStorage.setItem("ejs_service", sv);
  localStorage.setItem("ejs_template", tp);

  emailjs.init({ publicKey: pk });
  emailJsReady = true;
  setConfigStatus("✓ Salvo! EmailJS ativo — pode fechar este painel", "ok");
}

function setConfigStatus(msg, type) {
  var el = document.getElementById("config-status");
  if (!el) return;
  el.textContent = msg;
  el.className = "config-status " + type;
}

function toggleSetup() {
  var body = document.getElementById("setup-body");
  var header = document.getElementById("setup-header");
  var isOpen = body.classList.contains("open");
  body.classList.toggle("open", !isOpen);
  header.classList.toggle("open", !isOpen);
}

function attachPhoneMask(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", function () {
    var v = el.value.replace(/\D/g, "");
    if (v.length <= 2) v = "(" + v;
    else if (v.length <= 7) v = "(" + v.slice(0, 2) + ") " + v.slice(2);
    else if (v.length <= 11)
      v = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
    else v = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7, 11);
    el.value = v;
  });
}

function buildTitular(num) {
  var body = document.getElementById("titulares-body");
  if (!body) return;
  var block = document.createElement("div");
  block.className = "member-block";
  block.id = "block-t" + num;
  block.innerHTML =
    '<div class="member-block-title">&gt; Titular ' +
    num +
    ' <span class="role-tag">EQUIPE</span></div>' +
    '<div class="field-row">' +
    '<div class="field" id="f-t' +
    num +
    '-name"><label>Nome Completo</label>' +
    '<input type="text" id="t' +
    num +
    '-name" placeholder="Nome real" maxlength="60" autocomplete="off">' +
    '<span class="err-msg">Informe o nome</span></div>' +
    '<div class="field" id="f-t' +
    num +
    '-tag"><label>Nick e Tag do Valorant</label>' +
    '<input type="text" id="t' +
    num +
    '-tag" placeholder="Jogador#BR1" maxlength="32" autocomplete="off">' +
    '<span class="err-msg">Informe nick e tag</span></div>' +
    "</div>" +
    '<div class="field-row">' +
    '<div class="field" id="f-t' +
    num +
    '-rank"><label>Rank Atual</label>' +
    '<select id="t' +
    num +
    '-rank">' +
    rankOptionsHtml() +
    "</select>" +
    '<span class="err-msg">Selecione o rank</span></div>' +
    "</div>";
  body.appendChild(block);
}


function updateTitularesVisibility() {
  for (var i = 2; i <= 5; i++) {
    var block = document.getElementById("block-t" + i);

    if (!block) continue;

    block.style.display = i <= currentTeamSize ? "" : "none";
  }

  var sub = document.getElementById("titulares-sub");

  if (sub) {
    var extra = currentTeamSize - 1;

    if (extra === 0) {
      sub.textContent = "Inscrição individual";
    } else if (extra === 1) {
      sub.textContent = "1 jogador além do capitão";
    } else {
      sub.textContent = extra + " jogadores além do capitão";
    }
  }

  var warning = document.getElementById("size-warning");

  if (warning) {
    warning.classList.toggle("full-team", currentTeamSize === 5);
  }
}

function updateTitularesVisibility() {
  // titulares 2..5 ficam visíveis até currentTeamSize
  for (var i = 2; i <= 5; i++) {
    var block = document.getElementById("block-t" + i);

    if (!block) continue;
    block.style.display = i <= currentTeamSize ? "" : "none";
  }

  function updateTitularesVisibility() {
    for (var i = 2; i <= 5; i++) {
      var block = document.getElementById("block-t" + i);

      if (!block) continue;

      block.style.display = i <= currentTeamSize ? "" : "none";
    }

    var sub = document.getElementById("titulares-sub");

    if (sub) {
      var extra = currentTeamSize - 1;

      if (extra === 0) {
        sub.textContent = "Inscrição individual";
      } else if (extra === 1) {
        sub.textContent = "1 jogador além do capitão";
      } else {
        sub.textContent = extra + " jogadores além do capitão";
      }
    }

    var warning = document.getElementById("size-warning");

    if (warning) {
      warning.classList.toggle("full-team", currentTeamSize === 5);
    }
  }
  var warning = document.getElementById("size-warning");
  if (warning) {
    warning.classList.toggle("full-team", currentTeamSize === 5);
  }
}

function toggleReserve(num) {
  var toggle = document.getElementById("toggle-r" + num);
  var bodyDiv = document.getElementById("reserve-body-" + num);
  if (!toggle || !bodyDiv) return;

  reserveActive[num] = !reserveActive[num];

  if (reserveActive[num]) {
    toggle.classList.add("active");
    toggle.querySelector(".reserve-toggle-icon").textContent = "−";
    toggle.querySelector(".reserve-toggle-text").textContent =
      "Remover reserva " + num;
    toggle.querySelector(".reserve-toggle-sub").textContent =
      "Clique para remover este reserva";
    bodyDiv.style.display = "block";
    bodyDiv.innerHTML =
      '<div class="member-block reserve">' +
      '<div class="member-block-title">&gt; Reserva ' +
      num +
      ' <span class="role-tag">RESERVA</span></div>' +
      '<div class="field-row">' +
      '<div class="field" id="f-r' +
      num +
      '-name"><label>Nome Completo</label>' +
      '<input type="text" id="r' +
      num +
      '-name" placeholder="Nome real" maxlength="60" autocomplete="off"></div>' +
      '<div class="field" id="f-r' +
      num +
      '-tag"><label>Nick e Tag do Valorant</label>' +
      '<input type="text" id="r' +
      num +
      '-tag" placeholder="Jogador#BR1" maxlength="32" autocomplete="off"></div>' +
      "</div>" +
      '<div class="field-row">' +
      '<div class="field" id="f-r' +
      num +
      '-rank"><label>Rank Atual</label>' +
      '<select id="r' +
      num +
      '-rank">' +
      rankOptionsHtml() +
      "</select></div>" +
      "</div>" +
      "</div>";
  } else {
    toggle.classList.remove("active");
    toggle.querySelector(".reserve-toggle-icon").textContent = "+";
    toggle.querySelector(".reserve-toggle-text").textContent =
      "Adicionar reserva " + num;
    toggle.querySelector(".reserve-toggle-sub").textContent =
      num === 1 ? "Inclua um jogador reserva" : "Inclua um segundo reserva";
    bodyDiv.style.display = "none";
    bodyDiv.innerHTML = "";
  }
}

function reqField(id, fid) {
  var v = document.getElementById(id).value.trim();
  var ok = v.length > 0;
  document.getElementById(fid).classList.toggle("has-error", !ok);
  document.getElementById(id).classList.toggle("error", !ok);
  return ok;
}

function emailField(id, fid) {
  var v = document.getElementById(id).value.trim();
  var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  document.getElementById(fid).classList.toggle("has-error", !ok);
  document.getElementById(id).classList.toggle("error", !ok);
  return ok;
}

function tagField(id, fid) {
  var v = document.getElementById(id).value.trim();
  var ok = /^.+#.+$/.test(v);
  document.getElementById(fid).classList.toggle("has-error", !ok);
  document.getElementById(id).classList.toggle("error", !ok);
  return ok;
}

function phoneField(id, fid) {
  var v = document.getElementById(id).value.replace(/\D/g, "");
  var ok = v.length >= 10;
  document.getElementById(fid).classList.toggle("has-error", !ok);
  document.getElementById(id).classList.toggle("error", !ok);
  return ok;
}

function sendConfirmation(data) {
  if (!emailJsReady) return Promise.resolve({ skipped: true, noConfig: true });
  return emailjs
    .send(EJS.service, EJS.template, data)
    .then(function (res) {
      console.log("EmailJS: sucesso ->", data.to_email, res);
      return res;
    })
    .catch(function (err) {
      console.error("EmailJS: erro ->", data.to_email, err);
      throw err;
    });
}

function showSuccessScreen(message) {
  document.getElementById("success-team-name").textContent = message.teamLabel;
  document.getElementById("success-sub").textContent = message.body;
  document.getElementById("success-screen").classList.add("show");
}

function closeSuccess() {
  document.getElementById("success-screen").classList.remove("show");
}

function buildAdminEmail(teamName, captain, titulares, reservas, teamSize) {
  var lines = [
    "INSCRIÇÃO — VALORANT CHAMPIONSHIP DEVS CONECTADOS",
    "Data: 20 de junho de 2026 — 20:00",
    "",
    "EQUIPE: " + teamName,
    "TAMANHO INFORMADO: " +
      (teamSize === 1
        ? "1 jogador inscrito"
        : teamSize + " jogadores inscritos") +
      (teamSize < 5
        ? " — INCOMPLETA, sujeita a remontagem pela organização"
        : " — completa"),
    "",
    "── CAPITÃO ──",
    "Nome:  " + captain.name,
    "Tag:   " + captain.tag,
    "Rank:  " + captain.rank,
    "Tel:   " + captain.phone,
    "Email: " + captain.email,
    "",
  ];

  titulares.forEach(function (t, idx) {
    lines.push("── TITULAR " + (idx + 2) + " ──");
    lines.push("Nome: " + t.name);
    lines.push("Tag:  " + t.tag);
    lines.push("Rank: " + t.rank);
    lines.push("");
  });

  reservas.forEach(function (r, idx) {
    lines.push("── RESERVA " + (idx + 1) + " ──");
    lines.push("Nome: " + r.name);
    lines.push("Tag:  " + r.tag);
    lines.push("Rank: " + r.rank);
    lines.push("");
  });

  lines.push("Enviado via formulário de inscrição Valorant.");

  var subject = encodeURIComponent(
    "[INSCRIÇÃO VALORANT] " +
      teamName +
      " (" +
      teamSize +
      "x) — Devs Conectados",
  );
  var body = encodeURIComponent(lines.join("\n"));
  return "mailto:melkzedektech@gmail.com?subject=" + subject + "&body=" + body;
}

function setTeamSize(size) {
  currentTeamSize = size;

  // Atualiza visual dos botões
  for (var i = 1; i <= 5; i++) {
    var card = document.getElementById("mc-size-" + i);

    if (!card) continue;

    if (i === size) {
      card.classList.add("sel");
    } else {
      card.classList.remove("sel");
    }
  }

  // Mostra/esconde jogadores titulares
  updateTitularesVisibility();
}

function initForm() {
  var form = document.getElementById("valorant-form");
  if (!form) return;

  var capRankSelect = document.getElementById("cap-rank");
  if (capRankSelect) capRankSelect.innerHTML = rankOptionsHtml();

  for (var i = 2; i <= 5; i++) buildTitular(i);
  setTeamSize(1);
  attachPhoneMask("cap-phone");
  loadConfig();

  [1, 2, 3, 4, 5].forEach(function (s) {
    var card = document.getElementById("mc-size-" + s);
    if (card)
      card.addEventListener("click", function () {
        var size = parseInt(this.getAttribute("data-size"), 10);
        setTeamSize(size);
      });
  });

  var t1 = document.getElementById("toggle-r1");
  var t2 = document.getElementById("toggle-r2");
  if (t1)
    t1.addEventListener("click", function () {
      toggleReserve(1);
    });
  if (t2)
    t2.addEventListener("click", function () {
      toggleReserve(2);
    });

  var saveBtn = document.getElementById("save-config");
  if (saveBtn) saveBtn.addEventListener("click", saveConfig);
  var setupHeader = document.getElementById("setup-header");
  if (setupHeader) setupHeader.addEventListener("click", toggleSetup);
  var successClose = document.getElementById("success-close");
  if (successClose) successClose.addEventListener("click", closeSuccess);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;

    ok = reqField("team-name", "f-team") && ok;
    ok = reqField("cap-name", "f-cap-name") && ok;
    ok = tagField("cap-tag", "f-cap-tag") && ok;
    ok = reqField("cap-rank", "f-cap-rank") && ok;
    ok = phoneField("cap-phone", "f-cap-phone") && ok;
    ok = emailField("cap-email", "f-cap-email") && ok;

    var titulares = [];
    for (var i = 2; i <= currentTeamSize; i++) {
      ok = reqField("t" + i + "-name", "f-t" + i + "-name") && ok;
      ok = tagField("t" + i + "-tag", "f-t" + i + "-tag") && ok;
      ok = reqField("t" + i + "-rank", "f-t" + i + "-rank") && ok;
      titulares.push({
        name: document.getElementById("t" + i + "-name").value.trim(),
        tag: document.getElementById("t" + i + "-tag").value.trim(),
        rank: document.getElementById("t" + i + "-rank").value,
      });
    }

    if (!ok) {
      var first = document.querySelector(".error");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    var btn = document.getElementById("submit-btn");
    btn.disabled = true;
    btn.textContent = "Enviando...";

    var teamName = document.getElementById("team-name").value.trim();
    var captain = {
      name: document.getElementById("cap-name").value.trim(),
      tag: document.getElementById("cap-tag").value.trim(),
      rank: document.getElementById("cap-rank").value,
      phone: document.getElementById("cap-phone").value.trim(),
      email: document.getElementById("cap-email").value.trim(),
    };

    var reservas = [];
    for (var r = 1; r <= 2; r++) {
      if (reserveActive[r]) {
        var rn = document.getElementById("r" + r + "-name");
        var rt = document.getElementById("r" + r + "-tag");
        var rr = document.getElementById("r" + r + "-rank");
        if (rn && rn.value.trim()) {
          reservas.push({
            name: rn.value.trim(),
            tag: rt.value.trim(),
            rank: rr.value,
          });
        }
      }
    }

    window.open(
      buildAdminEmail(teamName, captain, titulares, reservas, currentTeamSize),
    );

    var promise = Promise.resolve({ skipped: true });
    if (emailJsReady) {
      btn.textContent = "Enviando confirmação...";
      promise = sendConfirmation({
        to_name: captain.name,
        to_email: captain.email,
        member_name: captain.name,
        team_name: teamName,
        team_label: teamName,
        modes: "Valorant 5x5",
        registration_type: "Equipe (" + currentTeamSize + " titulares)",
        event_date: "20 de junho de 2026",
        event_name: "Valorant Championship Devs Conectados",
      });
    }

    promise
      .then(function () {
        btn.disabled = false;
        btn.textContent = "Enviar inscrição";

        var incompleteNote =
          currentTeamSize < 5
            ? " Sua inscrição poderá ser agrupada com outros jogadores ou equipes incompletas para formação dos times oficiais do campeonato."
            : "";

        if (!emailJsReady) {
          showSuccessScreen({
            teamLabel: "⟨ " + teamName.toUpperCase() + " ⟩",
            body:
              "Sua inscrição foi enviada ao administrador, mas a confirmação por email não pôde ser enviada porque o EmailJS não está configurado." +
              incompleteNote,
          });
        } else {
          showSuccessScreen({
            teamLabel: "⟨ " + teamName.toUpperCase() + " ⟩",
            body:
              "Sua equipe foi registrada com sucesso! Um email de confirmação foi enviado ao capitão." +
              incompleteNote +
              " Aguarde a divulgação das chaves no Discord.",
          });
        }
      })
      .catch(function (err) {
        console.error("Erro inesperado ao processar confirmação:", err);
        btn.disabled = false;
        btn.textContent = "Enviar inscrição";
        showSuccessScreen({
          teamLabel: "⟨ " + teamName.toUpperCase() + " ⟩",
          body: "Sua inscrição foi registrada, mas houve um erro no envio da confirmação por email. Verifique o console e o painel do EmailJS.",
        });
      });
  });
}

window.addEventListener("DOMContentLoaded", initForm);
