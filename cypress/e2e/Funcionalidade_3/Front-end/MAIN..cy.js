/// <reference types="cypress" />

//import './commands'
import { locators as loc } from './locators.js';


//import '../Back-end/commands.js';
import { locators as loc_backend } from '../Back-end/locators.js';

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

  describe('BACK-END', () => {

    describe('Cenários de teste - Exemplo de utilização dos comandos relacionados ao Back-end  ', () => {

      it('Teste 2 - Cadastrar e Validar listagem de usuario cadastrado', () => {

        cy.gerarEmailUnico().then((email) => {
          const payload = { ...loc_backend.ServeRest.Usuario, email: email };

          cy.cadastrarUsuarioApi(payload).then((resPost) => {
            const idParaVerificar = resPost.body._id;

            cy.listarUsuariosApi().then((resLista) => {
              const encontrado = resLista.body.usuarios.some(u => u._id === idParaVerificar);

              // Validação de segurança: Interrompe o teste com mensagem clara se o ID não existir
              expect(encontrado, `✅ SUCESSO: O ID ${idParaVerificar} foi localizado corretamente na listagem`).to.be.true;

              // Limpeza obrigatória após o teste
              cy.excluirUsuarioApi(idParaVerificar);
            });
          });
        });
      });
    });


  });


});

