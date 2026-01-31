# 🚀 Cypress Automation Framework - Web & API

[**Português**](#português) | [**English**](#english)

---

<a name="português"></a>
## 🇧🇷 Português

Este repositório contém um framework de automação híbrido utilizando **Cypress**, focado em centralização de seletores (**Locators**) e a criação de ações reutilizáveis (**Custom Commands**).

------------------------------------------------------------------------------------

## 📍 Arquitetura e Estratégia

A arquitetura deste projeto foi desenhada para separar a **Lógica de Teste** da **Implementação Técnica**, utilizando padrões que facilitam a manutenção e a escala.

### 🛠️ Custom Commands
Em vez de repetir blocos de código complexos em todos os testes, utilizamos os `Cypress Commands` localizados dentro de cada contexto (Back-end/Front-end).

* **Encapsulamento:** Escondemos a complexidade de requisições API (headers, métodos, status codes) e interações repetitivas de UI.
* **Legibilidade:** O teste principal (`MAIN.cy.js`) torna-se muito mais limpo, focando apenas no fluxo de negócio.
* **Reutilização:** Um mesmo comando pode ser usado por múltiplos arquivos de teste, reduzindo a duplicidade de código.

### 📁 Locators & Data Factory (O "Onde" e "O quê")
O arquivo `locators.js` é a "única fonte" para dados e seletores.

* **Centralização:** Se um endpoint de API mudar ou um ID de um botão no site for alterado, a manutenção é feita em um único arquivo.
* **Dinamicidade:** Permite a manipulação de massas de dados de forma organizada (ex: uso de *Spread Operator* para e-mails dinâmicos).

------------------------------------------------------------------------------------

## 🏗️ Estrutura do Projeto

O projeto está dividido em duas frentes principais, organizadas por domínios conforme a estrutura de pastas:

### 1. Back-end (API)
Validação do ciclo de vida completo (CRUD) na API [ServeRest](https://serverest.dev/).
* **`locators.js`**: URLs, seletores e payloads (massa de dados).
* **`commands.js`**: Abstração da lógica técnica (Requests de API).
* **`MAIN.cy.js`**: Scripts de teste focados na regra de negócio e rastreabilidade de dados.

### 2. Front-end (WEB)
Validação de navegação e funcionalidade de busca no site da [Venturus](https://www.venturus.org.br/).
* **`locators.js`**: Seletores de elementos e URLs.
* **`commands.js`**: Comandos personalizados de interação com a interface.
* **`MAIN.cy.js`**: Fluxos de teste de ponta a ponta (E2E).

------------------------------------------------------------------------------------

## 🧪 Cobertura de Testes

### 📡 Back-end (API ServeRest)
Foco em rastreabilidade total do dado:
1. **Cadastro**: Criação com e-mail dinâmico para evitar duplicidade.
2. **Validação de Listagem**: Verificação da presença do ID na lista global.
3. **Consulta Detalhada**: Validação da integridade dos dados retornados.
4. **Edição (PUT)**: Validação de persistência após alteração.
5. **Exclusão (DELETE)**: Limpeza da base para garantir a idempotência e saúde do ambiente.

### 🖥️ Front-end (Web Venturus)
Foco em estabilidade e interface:
* **Navegação Segura**: Validação de acesso e consistência da URL institucional.
* **Busca Dinâmica**: Interação com o campo de pesquisa utilizando dados centralizados nos locators.
* **Gerenciamento de Estado**: Limpeza de `LocalStorage`, `SessionStorage` e `Cookies` via `beforeEach` para garantir execução isolada.

------------------------------------------------------------------------------------

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
Antes de começar, você vai precisar ter instalado:
* **Node.js** (Versão 18 ou superior recomendada).
* **NPM** ou **Yarn**.
* **Git**.

### 2. Instalação
```bash
# Instalar as dependências do projeto
npm install

3. Rodando os Testes
🖥️ Interface Gráfica (Interativo)
Bash
npx cypress open
⚡ Modo Terminal (Headless)
Bash
npx cypress run


<a name="english"></a>

🇺🇸 English
🚀 Cypress Automation Framework - Web & API
This repository contains a hybrid automation framework using Cypress, focused on selector centralization (Locators) and the creation of reusable actions (Custom Commands).

📍 Architecture and Strategy
The architecture of this project was designed to decouple Test Logic from Technical Implementation, using patterns that facilitate maintenance and scalability.

🛠️ Custom Commands
Instead of repeating complex code blocks in every test, we use Cypress Commands located within each context (Back-end/Front-end).

Encapsulation: We hide the complexity of API requests (headers, methods, status codes) and repetitive UI interactions.

Readability: The main test file (MAIN.cy.js) becomes much cleaner, focusing solely on the business logic.

Re Loftability: The same command can be used across multiple test files, reducing code duplication.

📁 Locators & Data Factory (The "Where" and the "What")
The locators.js file serves as the "single source of truth" for data and selectors.

Centralization: If an API endpoint changes or a button ID on the website is updated, maintenance is performed in a single file.

Dynamism: Allows for organized data mass manipulation (e.g., using the Spread Operator for dynamic emails).

🏗️ Project Structure
The project is divided into two main fronts, organized by domains according to the folder structure:

1. Back-end (API)
Full lifecycle validation (CRUD) on the ServeRest API.

locators.js: URLs, selectors, and payloads (data mass).

commands.js: Abstraction of technical logic (API Requests).

MAIN.cy.js: Test scripts focused on business rules and data traceability.

2. Front-end (WEB)
Validation of navigation and search functionality on the Venturus website.

locators.js: Element selectors and URLs.

commands.js: Custom commands for interface interaction.

MAIN.cy.js: End-to-end (E2E) test flows.

🧪 Test Coverage
📡 Back-end (API ServeRest)
Focused on full data traceability:

Registration: Creation with a dynamic email to avoid duplication errors.

Listing Validation: Verifying if the ID is present in the global list.

Detailed Search: Validating the integrity of the returned data.

Editing (PUT): Persistence validation after data modification.

Deletion (DELETE): Database cleanup to ensure idempotency and environment health.

🖥️ Front-end (Web Venturus)
Focused on stability and interface:

Secure Navigation: Access validation and institutional URL consistency.

Dynamic Search: Interaction with the search field using centralized data from locators.

State Management: Clearing LocalStorage, SessionStorage, and Cookies via beforeEach to ensure isolated execution.

🚀 How to Run the Project
1. Prerequisites
Node.js (Version 18 or higher recommended).

NPM or Yarn.

Git.

2. Installation
Bash
# Install project dependencies
npm install
3. Running the Tests
🖥️ Graphical Interface (Interactive)
Bash
npx cypress open
⚡ Terminal Mode (Headless)
Bash
npx cypress run