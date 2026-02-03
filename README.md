
# 🚀 Cypress Automation Framework - Web & API

[**Português**](#português) | [**English**](#english)

<a name="português"></a>
# 🇧🇷 Português

Este repositório contém uma estrutura de automação híbrida utilizando Cypress, abrangendo testes de Front-end (Web) e Back-end (API), com foco na reutilização de comandos por meio de Custom Commands, na centralização de elementos e dados (Locator Repository) e na integração entre camadas.

```md
ExemploBaseCypress/
├── cypress/
│   ├── e2e/
│   │   ├── Back-end/
│   │   │   ├── commands.js
│   │   │   ├── locators.js
│   │   │   └── MAIN.cy.js
│   │   └── Front-end/
│   │       ├── commands.js
│   │       ├── locators.js
│   │       └── MAIN.cy.js
│   └── support/
│           └── commands.js
├── node_modules/
├── .gitignore
├── cypress.config.js
└── README.md

```
## 📍 Arquitetura e Estratégia

A arquitetura deste projeto foi desenhada para separar a **Lógica de Teste** da **Implementação Técnica**, utilizando padrões que facilitam a manutenção e a escala.

### 🛠️ Custom Commands
Em vez de repetir blocos de código complexos em todos os testes, utilizamos os `Cypress Commands` localizados dentro de cada contexto (Back-end/Front-end):

* **Encapsulamento:** Escondemos a complexidade de requisições API (headers, métodos, status codes) e interações repetitivas de UI.
* **Legibilidade:** O teste principal (`MAIN.cy.js`) torna-se muito mais limpo, focando apenas no fluxo de negócio.
* **Reutilização:** Um mesmo comando pode ser usado por múltiplos arquivos de teste, reduzindo a duplicidade de código.

### 📁 Locators Repository

O arquivo `locators.js` centraliza os **selectors de UI**, **endpoints de API** e **dados de teste** utilizados nos cenários automatizados:

* **Centralização:** Caso um endpoint de API ou um selector da interface seja alterado, a manutenção é realizada em um único arquivo, reduzindo impacto e esforço de manutenção.
* **Dinamicidade:** Permite a organização e geração de massas de dados de forma estruturada, incluindo o uso de técnicas como *Spread Operator* para criação de dados dinâmicos (ex.: e-mails únicos).

### 🔗 Integração Front-end + Back-end

Além da separação por domínio (Web e API), o projeto permite a integração de comandos e dados de Back-end diretamente em testes de Front-end. Essa abordagem possibilita:
* **Reutilização de comandos de API em diferentes contextos
* **Criação e limpeza de massa de dados via API antes ou durante testes Web
* **Demonstração prática de testes híbridos (UI + API)

### 🎯 Execução Isolada por Camada

A separação entre Back-end (API) e Front-end (Web) foi pensada, desde o início, para permitir a **execução isolada de suítes de teste**, conforme a necessidade do contexto. Com essa abordagem, é possível:
* **Executar uma suíte focada exclusivamente em **validações de API**, sem dependência de interface
* **Validar regras de negócio, contratos e persistência de dados de forma mais rápida
* **Utilizar os testes de Back-end como base para testes de regressão e smoke tests
* **Reduzir o custo de execução quando o objetivo for validar apenas as APIs
* **Essa estratégia oferece maior flexibilidade na execução dos testes e facilita a adaptação do framework a diferentes pipelines e cenários de validação.

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
* **Cadastro**: Criação com e-mail dinâmico para evitar duplicidade.
* **Validação de Listagem**: Verificação da presença do ID na lista global.
* **Consulta Detalhada**: Validação da integridade dos dados retornados.
* **Edição (PUT)**: Validação de persistência após alteração.
* **Exclusão (DELETE)**: Limpeza da base para garantir a idempotência e saúde do ambiente.

### 🖥️ Front-end (Web Venturus)
Foco em estabilidade e interface:
* **Navegação Segura**: Validação de acesso e consistência da URL institucional.
* **Busca Dinâmica**: Interação com o campo de pesquisa utilizando dados centralizados nos locators.
* **Gerenciamento de Estado**: Limpeza de `LocalStorage`, `SessionStorage` e `Cookies` via `beforeEach` para garantir execução isolada.
* **Integração com API**: Utilização de comandos de Back-end em cenários Web.

------------------------------------------------------------------------------------

## 🧪 Como Executar o Projeto

### 1. Pré-requisitos

Antes de começar, você vai precisar ter instalado:

![Node](https://img.shields.io/badge/node-v22.17.1-339933?logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-v10.9.2-CB3837?logo=npm&logoColor=white)
![Cypress](https://img.shields.io/badge/cypress-v15.9.0-17202C?logo=cypress&logoColor=white)

### 2. Instalação e Configuração

1. Clone o repositório:
```bash
git clone https://github.com/romilsosilva73/ExemploBaseCypress.git
```

2. Abrir o CMD na pasta do projeto:
Navegue até o diretório onde o projeto foi clonado e abra o terminal (CMD ou PowerShell).


3. Instalar as dependências:
```bash
npm install
```


4. Abrir o Cypress (Interface Visual): Para escolher os testes e acompanhar a execução em tempo real, use o comando:
```bash
npx cypress open
```

------------------------------------------------------------------------------------

## ▶️ Como executar os testes

Opção 1 — rodar tudo de uma vez (mais simples):
```bash
npx cypress run --spec "cypress/e2e/**/*.cy.js"
```

Opção 2 - Executar apenas o Back-end 
```bash
npx cypress run --spec "cypress/e2e/Back-end/**/*.cy.js"
```

Opção 3 — Executar apenas o Front-end
```bash
npx cypress run --spec "cypress/e2e/Front-end/**/*.cy.js"
```

## 📚 Referências

- 🛠️ [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- 📡 [API Automation](https://docs.cypress.io/api/commands/request)
- 🎯 [Selecting Elements](https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements)


<a id="english"></a>
# English

This repository contains a hybrid automation framework using Cypress, covering both front-end (web) and back-end (API) testing, focusing on command reuse through custom commands, centralization of elements and data (Locator Repository), and integration between layers.

## 📍 Architecture and Strategy

The architecture of this project was designed to decouple **Test Logic** from **Technical Implementation**, using patterns that facilitate maintenance and scalability.

### 🛠️ Custom Commands

Instead of repeating complex code blocks in every test, we use **Cypress Commands** located within each context (Back-end / Front-end).

- **Encapsulation:** We hide the complexity of API requests (headers, methods, status codes) and repetitive UI interactions.
- **Readability:** The main test file (`MAIN.cy.js`) becomes much cleaner, focusing solely on business logic.
- **Reusability:** The same command can be used across multiple test files, reducing code duplication.

### 📁 Locators 

The `locators.js` file centralizes the **UI selectors**, **API endpoints**, and **test data** used in automated scenarios.

* **Centralization:** If an API endpoint or interface selector is changed, maintenance is performed in a single file, reducing impact and maintenance effort.

* **Dynamism:** Allows the organization and generation of data sets in a structured way, including the use of techniques such as *Spread Operator* for creating dynamic data (e.g., unique emails).

### 🔗 Front-end + Back-end Integration
In addition to domain separation, this framework allows the integration of Back-end commands and data directly into Front-end tests. This enables:

- Reuse of API commands across different testing contexts.
- Fast Data Management: Creation and cleanup of test data via API during Web test execution.
- Hybrid Testing (UI + API): Validating that UI actions are correctly reflected in the database/API in real-time.

### 🎯 Isolated Execution by Layer
The architecture supports the isolated execution of test suites. Depending on the context, you can:

- Run suites focused exclusively on API validation, with no UI overhead.
- Rapidly validate business rules, contracts, and data persistence.
- Use Back-end tests as a reliable foundation for CI/CD pipelines and smoke tests.

---

## 🏗️ Project Structure

The project is divided into two main fronts, organized by domains according to the folder structure.

### Back-end (API)

Full lifecycle validation (CRUD) on the ServeRest API.

- `locators.js`: URLs, selectors, and payloads (data mass).
- `commands.js`: Abstraction of technical logic (API requests).
- `MAIN.cy.js`: Test scripts focused on business rules and data traceability.

### Front-end (WEB)

Validation of navigation and search functionality on the Venturus website.

- `locators.js`: Element selectors and URLs.
- `commands.js`: Custom commands for interface interaction.
- `MAIN.cy.js`: End-to-end (E2E) test flows.

---

## 🧪 Test Coverage

### 📡 Back-end (API ServeRest)

- Registration with a dynamic email to avoid duplication.
- Listing validation with ID verification.
- Detailed search to validate returned data integrity.
- Editing (PUT) with persistence validation.
- Deletion (DELETE) to ensure idempotency and environment health.

### 🖥️ Front-end (Web Venturus)

- Secure navigation and URL consistency validation.
- Dynamic search using centralized locator data.
- LocalStorage, SessionStorage, and Cookies cleanup via `beforeEach`.
- API Integration: Leveraging Back-end commands within Web scenarios for end-to-end validation.

---

## 🧪 How to Run the Project

### 1. Requirements

Before you begin, you will need to have the following installed:

![Node](https://img.shields.io/badge/node-v22.17.1-339933?logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-v10.9.2-CB3837?logo=npm&logoColor=white)
![Cypress](https://img.shields.io/badge/cypress-v15.9.0-17202C?logo=cypress&logoColor=white)

### 2. Installation:
npm install

### 3. Running the Tests

🖥️ Interactive mode:
npx cypress open

⚡ Headless mode:
npx cypress run

## 📚 References

- 🛠️ [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- 📡 [API Automation](https://docs.cypress.io/api/commands/request)
- 🎯 [Selecting Elements](https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements)
