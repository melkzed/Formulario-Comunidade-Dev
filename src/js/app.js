var EJS = {
  pubkey: 'EqY4ZvSg14BggUlh2',
  service: 'service_j6hjcqn',
  template: 'template_ul3c6rm'
};

var emailJsReady = false;
var currentTeamSize = 3;

function isAdminMode() {
  return window.location.search.indexOf('admin=1') !== -1;
}

function loadConfig() {
  var storedPubkey = localStorage.getItem('ejs_pubkey');
  var storedService = localStorage.getItem('ejs_service');
  var storedTemplate = localStorage.getItem('ejs_template');

  if (storedPubkey) EJS.pubkey = storedPubkey;
  if (storedService) EJS.service = storedService;
  if (storedTemplate) EJS.template = storedTemplate;

  if (EJS.pubkey) document.getElementById('cfg-pubkey').value = EJS.pubkey;
  if (EJS.service) document.getElementById('cfg-service').value = EJS.service;
  if (EJS.template) document.getElementById('cfg-template').value = EJS.template;

  var adminMode = isAdminMode();
  if (EJS.pubkey && EJS.service && EJS.template) {
    emailjs.init({ publicKey: EJS.pubkey });
    emailJsReady = true;
    setConfigStatus('✓ EmailJS configurado e ativo', 'ok');
    document.getElementById('setup-body').classList.remove('open');
    document.getElementById('setup-header').classList.remove('open');
  }

  if (adminMode) {
    document.getElementById('setup-banner').classList.remove('hidden');
  }
}

function setTeamSize(size) {
  currentTeamSize = size;
  ['mc-size-1', 'mc-size-2', 'mc-size-3'].forEach(function (id) {
    document.getElementById(id).className = 'mode-card' + (id === 'mc-size-' + size ? ' sel' : '');
  });
  updateTeamFields();
}

function updateTeamFields() {
  var teamLabel = document.querySelector('#f-team label');
  var teamInput = document.getElementById('team-name');
  var note = document.getElementById('team-size-note');

  if (currentTeamSize === 1) {
    teamInput.placeholder = 'Sem nome de equipe';
    note.textContent = 'Inscrição individual: você entra sem nome de equipe e pode ser realocado para completar uma dupla.';
    document.getElementById('f-team').style.display = 'none';
    document.getElementById('f-team').classList.remove('has-error');
    teamInput.classList.remove('error');
  } else if (currentTeamSize === 2) {
    teamInput.placeholder = 'Ex: Duo Phoenix';
    note.textContent = 'Dupla: se faltar 1 jogador um solo pode completar. Caso contrário, a dupla entra em lista de espera.';
    document.getElementById('f-team').style.display = '';
  } else {
    teamInput.placeholder = 'Ex: Team Phoenix';
    note.textContent = 'Equipe completa de 3 jogadores.';
    document.getElementById('f-team').style.display = '';
  }

  document.getElementById('body-m2').parentElement.style.display = currentTeamSize >= 2 ? '' : 'none';
  document.getElementById('body-m3').parentElement.style.display = currentTeamSize >= 3 ? '' : 'none';
}

function saveConfig() {
  var pk = document.getElementById('cfg-pubkey').value.trim();
  var sv = document.getElementById('cfg-service').value.trim();
  var tp = document.getElementById('cfg-template').value.trim();

  if (!pk || !sv || !tp) {
    setConfigStatus('✗ Preencha todos os três campos', 'fail');
    return;
  }

  EJS.pubkey = pk;
  EJS.service = sv;
  EJS.template = tp;
  localStorage.setItem('ejs_pubkey', pk);
  localStorage.setItem('ejs_service', sv);
  localStorage.setItem('ejs_template', tp);

  emailjs.init({ publicKey: pk });
  emailJsReady = true;
  setConfigStatus('✓ Salvo! EmailJS ativo — pode fechar este painel', 'ok');
}

function setConfigStatus(msg, type) {
  var el = document.getElementById('config-status');
  el.textContent = msg;
  el.className = 'config-status ' + type;
}

function toggleSetup() {
  var body = document.getElementById('setup-body');
  var header = document.getElementById('setup-header');
  var isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  header.classList.toggle('open', !isOpen);
}

function buildMember(num) {
  var body = document.getElementById('body-m' + num);
  body.innerHTML =
    '<div class="field-row">' +
    '<div class="field" id="f-m' + num + '-name"><label>Nome Completo</label>' +
    '<input type="text" id="m' + num + '-name" placeholder="Nome real" maxlength="60" autocomplete="off">' +
    '<span class="err-msg">Informe o nome</span></div>' +
    '<div class="field" id="f-m' + num + '-nick"><label>Nick do Minecraft</label>' +
    '<input type="text" id="m' + num + '-nick" placeholder="NickExato123" maxlength="32" autocomplete="off">' +
    '<span class="err-msg">Informe o nick</span></div>' +
    '</div>' +
    '<div class="field-row">' +
    '<div class="field" id="f-m' + num + '-email"><label>Email</label>' +
    '<input type="email" id="m' + num + '-email" placeholder="jogador@email.com" maxlength="80" autocomplete="off">' +
    '<span class="err-msg">Informe um email válido</span></div>' +
    '<div class="field" id="f-m' + num + '-phone"><label>Celular</label>' +
    '<input type="tel" id="m' + num + '-phone" placeholder="(11) 99999-9999" maxlength="16" autocomplete="off">' +
    '<span class="err-msg">Informe o celular</span></div>' +
    '</div>';

  var ph = document.getElementById('m' + num + '-phone');
  ph.addEventListener('input', function () {
    var v = ph.value.replace(/\D/g, '');
    if (v.length <= 2) v = '(' + v;
    else if (v.length <= 7) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
    else if (v.length <= 11) v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
    else v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7, 11);
    ph.value = v;
  });
}

function toggleMode(m) {
  var cb = document.getElementById('mode-' + m);
  cb.checked = !cb.checked;
  document.getElementById('mc-' + m).className = 'mode-card' + (cb.checked ? ' sel' : '');
}

function reqField(id, fid) {
  var v = document.getElementById(id).value.trim();
  var ok = v.length > 0;
  document.getElementById(fid).classList.toggle('has-error', !ok);
  document.getElementById(id).classList.toggle('error', !ok);
  return ok;
}

function emailField(id, fid) {
  var v = document.getElementById(id).value.trim();
  var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  document.getElementById(fid).classList.toggle('has-error', !ok);
  document.getElementById(id).classList.toggle('error', !ok);
  return ok;
}

function phoneField(num) {
  var v = document.getElementById('m' + num + '-phone').value.replace(/\D/g, '');
  var ok = v.length >= 10;
  document.getElementById('f-m' + num + '-phone').classList.toggle('has-error', !ok);
  document.getElementById('m' + num + '-phone').classList.toggle('error', !ok);
  return ok;
}

function sendConfirmation(member, teamName, teamLabel, registrationType, modesStr) {
  if (!emailJsReady) {
    return Promise.resolve({ skipped: true, noConfig: true });
  }

  return emailjs.send(EJS.service, EJS.template, {
    to_email: member.email,
    to_name: member.name,
    member_name: member.name,
    member_nick: member.nick,
    team_name: teamName,
    team_label: teamLabel,
    registration_type: registrationType,
    modes: modesStr,
    event_date: '30 de Maio de 2026',
    event_name: '1º Campeonato Gamer Devs Conectados'
  }).then(function (res) {
    console.log('EmailJS: sucesso ->', member.email, res);
    return res;
  }).catch(function (err) {
    console.error('EmailJS: erro ->', member.email, err);
    throw err;
  });
}

function showSuccessScreen(message) {
  document.getElementById('success-team-name').textContent = message.teamLabel;
  document.getElementById('success-screen').classList.add('show');
  document.getElementById('success-sub').textContent = message.body;
}

function closeSuccess() {
  document.getElementById('success-screen').classList.remove('show');
}

function buildAdminEmail(members, registrationType, teamLabel, modesStr) {
  var adminLines = [
    'INSCRIÇÃO — 1º CAMPEONATO GAMER DEVS CONECTADOS',
    'Data: 30 de Maio de 2026',
    '',
    'Tipo de inscrição: ' + registrationType,
    'EQUIPE: ' + teamLabel,
    'MODOS: ' + modesStr,
    ''
  ];

  members.forEach(function (m, idx) {
    adminLines.push('── MEMBRO ' + (idx + 1) + ' ──');
    adminLines.push('Nome:    ' + m.name);
    adminLines.push('Nick:    ' + m.nick);
    adminLines.push('Email:   ' + m.email);
    adminLines.push('Celular: ' + m.phone);
    adminLines.push('');
  });

  adminLines.push('Enviado via formulário de inscrição.');
  var adminSubject = encodeURIComponent('[INSCRIÇÃO] ' + registrationType + ' — ' + teamLabel + ' — Campeonato Devs Conectados');
  var adminBody = encodeURIComponent(adminLines.join('\n'));
  return 'mailto:melkzedektech@gmail.com?subject=' + adminSubject + '&body=' + adminBody;
}

function initForm() {
  buildMember(1);
  buildMember(2);
  buildMember(3);
  updateTeamFields();
  loadConfig();

  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    var ok = true;
    if (currentTeamSize > 1) {
      ok = reqField('team-name', 'f-team') && ok;
    }

    var bwOn = document.getElementById('mode-bw').checked;
    var hgOn = document.getElementById('mode-hg').checked;
    var modesErr = document.getElementById('modes-err');

    if (!bwOn && !hgOn) {
      modesErr.style.display = 'block';
      ok = false;
    } else {
      modesErr.style.display = 'none';
    }

    for (var i = 1; i <= currentTeamSize; i++) {
      ok = reqField('m' + i + '-name', 'f-m' + i + '-name') && ok;
      ok = reqField('m' + i + '-nick', 'f-m' + i + '-nick') && ok;
      ok = emailField('m' + i + '-email', 'f-m' + i + '-email') && ok;
      ok = phoneField(i) && ok;
    }

    if (!ok) {
      var first = document.querySelector('.error');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = '⏳ Enviando...';

    var teamName = document.getElementById('team-name').value.trim();
    var registrationType = currentTeamSize === 1 ? 'Individual' : currentTeamSize === 2 ? 'Dupla' : 'Equipe de 3';
    var teamLabel = currentTeamSize === 1 ? 'Sem equipe' : (teamName || 'Sem nome de equipe');
    var modes = [];
    if (bwOn) modes.push('BedWars');
    if (hgOn) modes.push('SkyWars');
    var modesStr = modes.join(' + ');

    var members = [];
    for (var j = 1; j <= currentTeamSize; j++) {
      members.push({
        name: document.getElementById('m' + j + '-name').value.trim(),
        nick: document.getElementById('m' + j + '-nick').value.trim(),
        email: document.getElementById('m' + j + '-email').value.trim(),
        phone: document.getElementById('m' + j + '-phone').value.trim()
      });
    }

    window.open(buildAdminEmail(members, registrationType, teamLabel, modesStr));

    var promises = [];
    if (emailJsReady) {
      btn.textContent = '⏳ Enviando confirmações...';
      members.forEach(function (member) {
        promises.push(sendConfirmation(member, teamName, teamLabel, registrationType, modesStr));
      });
    }

    Promise.allSettled(promises).then(function (results) {
      btn.disabled = false;
      btn.textContent = '⚡ ENVIAR INSCRIÇÃO';

      var failed = results.filter(function (result) { return result.status !== 'fulfilled'; });
      if (failed.length > 0) {
        console.warn('Alguns envios de confirmação falharam:', failed);
        showSuccessScreen({
          teamLabel: '⟨ ' + teamLabel.toUpperCase() + ' ⟩',
          body: 'Sua inscrição foi registrada, mas houve erro no envio de confirmação para alguns participantes. Verifique o console e o painel do EmailJS.'
        });
        alert('Atenção: houve erro ao enviar confirmações para alguns participantes. Verifique o console e o painel do EmailJS.');
      } else if (!emailJsReady) {
        showSuccessScreen({
          teamLabel: '⟨ ' + teamLabel.toUpperCase() + ' ⟩',
          body: 'Sua inscrição foi enviada ao administrador, mas a confirmação por email não pôde ser enviada porque o EmailJS não está configurado. Use ?admin=1 para configurar.'
        });
      } else {
        showSuccessScreen({
          teamLabel: '⟨ ' + teamLabel.toUpperCase() + ' ⟩',
          body: 'Sua inscrição foi registrada com sucesso! Um email de confirmação foi enviado a cada participante.'
        });
        console.log('Todas confirmações enviadas com sucesso.');
      }
    }).catch(function (err) {
      console.error('Erro inesperado ao processar confirmações:', err);
      btn.disabled = false;
      btn.textContent = '⚡ ENVIAR INSCRIÇÃO';
      showSuccessScreen({
        teamLabel: '⟨ ' + teamLabel.toUpperCase() + ' ⟩',
        body: 'Sua inscrição foi registrada, mas ocorreu um erro no envio de confirmações. Veja o console para detalhes.'
      });
    });
  });
}

window.addEventListener('DOMContentLoaded', initForm);
