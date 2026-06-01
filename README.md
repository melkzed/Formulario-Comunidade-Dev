# 📋 Formulário de Inscrição — Devs Conectados

Formulário web para inscrição no **1º Campeonato Gamer Devs Conectados**, com suporte a inscrições individuais, duplas e equipes de 3 jogadores. Integração com **EmailJS** para envio automático de confirmação.

---

## ✨ Recursos

- ✅ **Tipos de inscrição:**
  - Individual
  - Dupla
  - Equipe de 3 jogadores
- ✅ **Modos de jogo:** BedWars e SkyWars
- ✅ **Envio de confirmação por email:**
  - Email ao participante via EmailJS
  - Email ao administrador via `mailto`
- ✅ **Validação dinâmica:**
  - Campos obrigatórios ajustados ao tipo de inscrição
  - Máscara de telefone automática
  - Feedback visual de erros em tempo real
- ✅ **Design responsivo:**
  - Visual escuro e estilo gamer
  - Compatível com desktop e mobile
- ✅ **Projeto 100% client-side:**
  - Sem dependências de backend
  - Funciona localmente ou no GitHub Pages

---

## 🚀 Como Usar

### Acesso pelo GitHub Pages
Acesse o formulário diretamente em:

```text
https://melkzed.github.io/Formulario-Comunidade-Dev/
```

### Acesso local (opcional)
Se quiser, abra `index.html` no navegador para testar localmente.

### Preenchimento do formulário
1. Escolha o tipo de inscrição (Individual, Dupla ou Equipe de 3)
2. Preencha o nome da equipe se aplicável
3. Selecione os modos de jogo
4. Complete os dados dos participantes
5. Clique em **ENVIAR INSCRIÇÃO**

---

## ⚙️ Configuração EmailJS

As configurações padrão do EmailJS estão definidas no código:
- **Public Key:** `EqY4ZvSg14BggUlh2`
- **Service ID:** `service_j6hjcqn`
- **Template ID:** `template_ul3c6rm`

### Atualizar chaves do EmailJS
1. Acesse `index.html` com o parâmetro `?admin=1`:
   ```text
   index.html?admin=1
   ```
2. O painel de configuração aparecerá
3. Cole as novas chaves
4. Clique em **Salvar e Ativar**

---

## 📥 Template de EmailJS

Use as seguintes variáveis no template do EmailJS:
- `{{to_email}}`
- `{{to_name}}`
- `{{member_name}}`
- `{{member_nick}}`
- `{{team_name}}`
- `{{team_label}}`
- `{{registration_type}}`
- `{{modes}}`
- `{{event_date}}`
- `{{event_name}}`

Sugestão de assunto:

```text
Inscrição confirmada — {{team_label}} · Devs Conectados
```

---

## 📁 Estrutura do Projeto

```
Formulário Comunidade Dev/
├── index.html                          # Página principal do formulário
├── src/
│   ├── css/
│   │   └── style.css                   # Estilos do formulário
│   └── js/
│       └── app.js                      # Lógica do formulário e envio via EmailJS
├── icon/
│   └── icon.jpeg                       # Ícone do projeto
├── docs/
│   └── Regulamento_Devs_Conectados.pdf # Regulamento do evento
└── README.md                           # Este arquivo
```

---

## 📧 Fluxo de Inscrição

- Participante recebe email de confirmação via EmailJS.
- Administrador recebe um email pré-preenchido no cliente local via `mailto`.
- Dados de equipe, tipo de inscrição e modos de jogo são incluídos na mensagem.

---

## 🎮 Detalhes do Evento

- **Nome:** 1º Campeonato Gamer Devs Conectados
- **Data:** 30 de Maio de 2026
- **Jogo:** Minecraft Java Edition
- **Modos:** BedWars + SkyWars
- **Tamanhos válidos:** individual, dupla ou equipe de 3

---

## 🛠️ Tecnologias

- **HTML5** — Estrutura da página
- **CSS3** — Estilo e responsividade
- **JavaScript Vanilla** — Validação e envio de formulários
- **EmailJS** — Envio de emails diretamente do navegador

---

## 📝 Validação de Campos

| Campo | Obrigatório | Comentário |
|-------|------------|------------|
| Tipo de inscrição | Sim | Individual, Dupla ou Equipe |
| Nome da equipe | Não para Individual / Sim para Dupla e Equipe | Texto |
| Modos de jogo | Sim | Pelo menos 1 modo selecionado |
| Nome do membro | Sim | Texto |
| Nick do Minecraft | Sim | Texto |
| Email | Sim | Email válido |
| Telefone | Sim | Pelo menos 10 dígitos |

---

## 🔒 Segurança

- O formulário não usa backend próprio.
- As chaves do EmailJS são necessárias apenas para o serviço do cliente.
- As configurações são armazenadas localmente em `localStorage` apenas para facilitar o admin.

---

## 🤝 Como Contribuir

1. Faça um fork do repositório
2. Crie uma branch com sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona <descrição>'`)
4. Envie para o repositório remoto (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é de código aberto e pode ser usado, modificado e distribuído livremente.

---

## 📞 Contato

Para dúvidas ou sugestões, envie email para **melkzedektech@gmail.com**

---

**Desenvolvido com 💚 para a comunidade Devs Conectados**
