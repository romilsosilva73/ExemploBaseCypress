import { locators as loc } from './locators.js';

Cypress.Commands.add('loginServeRest', (email, senha) => {
  cy.visit(loc.WEB.serverest.url);
  cy.get(loc.WEB.serverest.login.email).type(email);
  cy.get(loc.WEB.serverest.login.senha).type(senha);
  cy.get(loc.WEB.serverest.login.btn_entrar).click();
});

Cypress.Commands.add('validaPresencaNaTabela', (valor) => {
  cy.get(loc.WEB.serverest.dashboard.tabela)
    .should('be.visible')
    .and('contain', valor);
});