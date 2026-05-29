# 📋 Formulário de Inscrição — Devs Conectados

Formulário web para inscrição no **1º Campeonato Gamer Devs Conectados**, com suporte a equipes de 3 jogadores, duplas e inscrições individuais. Integrado com **EmailJS** para envio automático de confirmação.

---

## ✨ Recursos

- ✅ **Três tipos de inscrição:**
  - Equipe de 3 jogadores
  - Dupla (2 jogadores + vaga em espera)
  - Individual (sem nome de equipe)

- ✅ **Seleção de modos de jogo:**
  - BedWars
  - SkyWars

- ✅ **Confirmação por email:**
  - E-mail automático para cada participante via EmailJS
  - E-mail para administrador (via mailto)
  - Identificação de tipo de inscrição

- ✅ **Validação dinâmica:**
  - Campos obrigatórios conforme tipo de inscrição
  - Máscara automática para telefone
  - Feedback visual de erros

- ✅ **Design moderno:**
  - Tema escuro estilo Matrix/Gaming
  - Responsivo para mobile e desktop
  - Animações suaves

- ✅ **GitHub Pages ready:**
  - Sem dependências externas (exceto EmailJS)
  - Funciona 100% client-side

---

## 🚀 Como Usar

### 1. Acesso local
Abra `formulário.html` no navegador.

### 2. Acesso no GitHub Pages
Deploy este repositório no GitHub Pages e a URL será:
```
https://seu-usuario.github.io/Formulário-Comunidade-Dev/formulário.html
```

### 3. Preenchimento do Formulário
1. Selecione o tipo de inscrição (Equipe 3, Dupla ou Individual)
2. Preencha o nome da equipe (se aplicável)
3. Selecione os modos de jogo
4. Preencha os dados dos membros (nome, nick, email, telefone)
5. Clique em **ENVIAR INSCRIÇÃO**

---

## ⚙️ Configuração EmailJS

As chaves de EmailJS já estão configuradas no código:
- **Public Key:** `EqY4ZvSg14BggUlh2`
- **Service ID:** `service_j6hjcqn`
- **Template ID:** `template_ul3c6rm`

### Se precisar alterar as chaves:
1. Abra `formulário.html` com o parâmetro `?admin=1`:
   ```
   formulário.html?admin=1
   ```
2. O painel de configuração aparecerá
3. Insira as novas chaves (caso necessário)
4. Clique em **Salvar e Ativar**

### Template do EmailJS
No painel do EmailJS, configure o template com:
- **To Email:** `{{to_email}}`
- **Subject:** `Inscrição confirmada — {{team_label}} · Devs Conectados`
- **Corpo:** Use as variáveis:
  - `{{member_name}}` — Nome do participante
  - `{{member_nick}}` — Nick do Minecraft
  - `{{registration_type}}` — Tipo (Individual/Dupla/Equipe de 3)
  - `{{team_label}}` — Nome da equipe ou "Sem equipe"
  - `{{modes}}` — Modos selecionados
  - `{{event_date}}` — Data do evento
  - `{{event_name}}` — Nome do evento

---

## 📁 Estrutura do Projeto

```
Formulário Comunidade Dev/
├── formulário.html              # Página principal
├── src/
│   ├── css/
│   │   └── style.css           # Estilos do formulário
│   └── js/
│       └── app.js              # Lógica do formulário e envio de email
├── icon/
│   └── icon.jpeg               # Favicon da aba
├── Regulamento_Devs_Conectados.pdf  # Regulamento (linkado no form)
└── README.md                   # Este arquivo
```

---

## 📧 Fluxo de Emails

### 1. E-mail para o Participante
Enviado automaticamente via EmailJS com:
- Confirmação de inscrição
- Tipo de inscrição (Individual/Dupla/Equipe)
- Dados da equipe (se houver)
- Modos de jogo
- Data do evento

### 2. E-mail para o Administrador
Aberto no cliente de email local (mailto) com:
- Dados completos de todos os membros
- Tipo de inscrição
- Modos selecionados

---

## 🎮 Detalhes do Evento

- **Nome:** 1º Campeonato Gamer Devs Conectados
- **Data:** 30 de Maio de 2026
- **Jogo:** Minecraft Java Edition
- **Modos:** BedWars + SkyWars
- **Tamanho de equipe:** 3 jogadores (ou 2 + espera, ou individual)

---

## 🛠️ Tecnologias

- **HTML5** — Estrutura
- **CSS3** — Estilo (sem frameworks)
- **JavaScript Vanilla** — Lógica e validação
- **EmailJS** — Envio de emails

---

## 📝 Validação de Campos

| Campo | Obrigatório | Tipo |
|-------|-----------|------|
| Nome da Equipe | Não (Individual) / Não (Dupla) / Sim (Equipe) | Texto |
| Modo de Jogo | Sim | Checkbox (min. 1) |
| Nome do Membro | Sim | Texto (máx. 60 caracteres) |
| Nick Minecraft | Sim | Texto (máx. 32 caracteres) |
| Email | Sim | Email válido |
| Telefone | Sim | Texto (mín. 10 dígitos) |

---

## 🔒 Segurança

- As chaves do EmailJS (Public Key, Service ID, Template ID) são visíveis no código, mas isto é por design — a Public Key é pública por natureza.
- O formulário não armazena dados localmente (exceto config de admin).
- Todos os dados são enviados diretamente para EmailJS.

---

## 🤝 Contribuindo

Para sugestões ou melhorias:
1. Faça um fork do repositório
2. Crie uma branch com sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é de código aberto e livre para usar, modificar e distribuir.

---

## 📞 Suporte

Para dúvidas sobre inscrição, acesse o Discord da comunidade **Devs Conectados** ou responda para: **melkzedektech@gmail.com**

---

**Desenvolvido com 💚 para a comunidade Devs Conectados**
