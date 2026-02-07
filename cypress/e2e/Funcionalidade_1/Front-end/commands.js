import { locators as loc } from './locators.js';

Cypress.Commands.add('loginServeRest', (email, senha) => {
  cy.visit(loc.WEB.serverest.url);
  cy.get(loc.WEB.serverest.login.email)
    .should('be.visible')
    .type(email);
  cy.get(loc.WEB.serverest.login.senha)
    .should('be.visible')
    .type(senha);
  
  return cy.get(loc.WEB.serverest.login.btn_entrar)
    .click()
    .as('Acao_Login_WEB');
});

Cypress.Commands.add('validaPresencaNaTabela', (valor) => {
  return cy.get(loc.WEB.serverest.dashboard.tabela)
    .should('be.visible')
    .and('contain', valor)
    .as('Validar_Registro_Tabela');
});