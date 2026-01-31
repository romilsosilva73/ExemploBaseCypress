# 🚀 Cypress Automation Framework - Web & API

Este repositório contém um framework de automação híbrido utilizando **Cypress**, focado em boas práticas de engenharia de software como a centralização de seletores (**Locators**) e a criação de ações reutilizáveis (**Custom Commands**).

------------------------------------------------------------------------------------

## 🏗️ Estrutura do Projeto

O projeto está dividido em duas frentes principais, utilizando uma arquitetura escalável:

1.  **Back-end (API):** 
Validação do ciclo de vida completo (CRUD) na API [ServeRest](https://serverest.dev/).

2.  **Front-end (WEB):** 
Validação de navegação e funcionalidade de busca no site da [Venturus](https://www.venturus.org.br/).

### 📁 Organização de Arquivos
* **`locators.js`**: Única fonte de verdade para URLs, seletores CSS e payloads (massa de dados).
* **`commands.js`**: Abstração da lógica técnica (Requests de API e interações Web customizadas).
* **`e2e/*.cy.js`**: Scripts de teste focados na regra de negócio e rastreabilidade de dados.

------------------------------------------------------------------------------------

## 🧪 Cobertura de Testes

### 📡 Back-end (API ServeRest)
Os testes de API foram desenvolvidos focando na **rastreabilidade total**. 
Cada ID gerado no cadastro é acompanhado até o fim do fluxo:

* **Fluxo CRUD Unificado**: 
    1. Cadastro com e-mail dinâmico.
    2. Validação da presença do ID na listagem global.
    3. Consulta detalhada para validar integridade dos dados.
    4. Edição (PUT) com validação de persistência.
    5. Exclusão (DELETE) para limpeza da base.

### 🖥️ Front-end (Web Venturus)
* **Navegação Segura**: Validação de acesso e URL institucional.
* **Busca Dinâmica**: Interação com o campo de pesquisa utilizando dados centralizados nos locators.
* **Gerenciamento de Estado**: Limpeza de `LocalStorage`, `SessionStorage` e `Cookies` antes de cada teste para garantir execução isolada.

------------------------------------------------------------------------------------

## 🚀 Como Executar o Projeto


### 1. Pré-requisitos
* Node.js instalado (versão 14 ou superior).
* NPM ou Yarn.

### 2. Instalação
No terminal, dentro da pasta do projeto:
```bash
npm install

## 3. Rodando os Testes
Para abrir o painel interativo do Cypress (Interface Gráfica):
```bash
npx cypress open

## 4.Para rodar todos os testes em modo terminal (Headless - ideal para CI/CD):
npx cypress run