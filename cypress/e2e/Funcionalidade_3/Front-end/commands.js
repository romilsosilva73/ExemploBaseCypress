import { locators as loc } from './locators.js';

Cypress.Commands.add('AcessaSiteVenturus', () => {

  // Visita a tela de login
  cy.visit(loc.WEB.pagina_inicial.url.venturus);

});

Cypress.Commands.add('ValidaUrlSiteVenturus', () => {

  //Validar se a ULR do site atual é a esperada

  cy.url().should('eq', loc.WEB.pagina_inicial.url.venturus)

});