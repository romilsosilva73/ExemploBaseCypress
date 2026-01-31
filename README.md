# 🚀 Cypress Automation Framework - Web & API

Este repositório contém um framework de automação híbrido utilizando **Cypress**, focado em centralização de seletores (**Locators**) e a criação de ações reutilizáveis (**Custom Commands**).

------------------------------------------------------------------------------------

## 📍 Arquitetura e Estratégia

A arquitetura deste projeto foi desenhada para separar a **Lógica de Teste** da **Implementação Técnica**, utilizando padrões que facilitam a manutenção e a escala.

### 🛠️ Custom Commands
Em vez de repetir blocos de código complexos em todos os testes, utilizamos os `Cypress Commands` localizados dentro de cada contexto (Back-end/Front-end).

* **Encapsulamento:** Escondemos a complexidade de requisições API (headers, métodos, status codes) e interações repetitivas de UI.
* **Legibilidade:** O teste principal (`MAIN.cy.js`) torna-se muito mais limpo, focando apenas no fluxo de negócio.
* **Reutilização:** Um mesmo comando pode ser usado por múltiplos arquivos de teste, reduzindo a duplicidade de código.

### 📍 Locators & Data Factory (O "Onde" e "O quê")
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
* **NPM** (Já vem instalado com o Node) ou **Yarn**.
* **Git** (Para clonar o repositório).

### 2. Instalação
```bash
# Instalar as dependências do projeto
npm install

### 3. Rodando os Testes

#### 🖥️ Interface Gráfica (Interativo)
Para abrir o painel do Cypress, onde você pode escolher qual teste rodar e visualizar a execução em tempo real:

npx cypress open

⚡ Modo Terminal (Headless)
Para rodar todos os testes em segundo plano (ideal para integração contínua - CI/CD):

npx cypress run