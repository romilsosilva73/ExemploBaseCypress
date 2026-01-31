/// <reference types="cypress" />
import { locators as loc } from './locators';
import './commands'


describe('ExemploBasicoCypress', () => {

  beforeEach(() => {

    cy.viewport(1366, 768)

    // Limpa os cookies
    cy.clearCookies();

    // Limpa o armazenamento local
    cy.clearLocalStorage();

    // Limpa o sessionStorage
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });

    // Recarrega a página para garantir um novo início
    cy.reload(true);

  });

  describe('FRONT-END', () => {

    describe('Cenários de teste ', () => {

      it('Teste 1 - Acessar o site Venturus e validar a URL', () => {

        // Faz login antes (se necessário)
        cy.AcessaSiteVenturus();

        cy.ValidaUrlSiteVenturus();

        //Clicar na opção 'Pesquisar' na tela inicial
        cy.get(loc.WEB.pagina_inicial.botoes.pesquisa).click();

        //Adiciona o dado a ser pesquisado
        cy.get(loc.WEB.pagina_inicial.botoes.input_pesquisa).type(loc.WEB.pagina_inicial.dados_de_pesquisa.MindMap)

      });


    });

  });

  describe('API', () => {

  });

});

