/// <reference types="cypress" />
import { locators as loc } from './locators';
import { locators as loc_backend } from '../Back-end/locators.js';

describe('ServeRest - Validação de Dados', () => {

  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('FRONT-END - Verificação de Dados', () => {

    it('1. Deve validar as mensagens de campos obrigatórios no cadastro de usuários', () => {
      // 1. Acessa a página de login e vai para o link de cadastro usando locator
      cy.visit(loc.WEB.serverest.url);
      cy.get(loc.WEB.serverest.login.btn_ir_para_cadastro).click();

      // Validação de segurança
      cy.url().should('include', '/cadastrarusuarios');

      // 2. Clica no botão de cadastrar sem preencher nada usando locator
      cy.get(loc.WEB.serverest.cadastro.btn_finalizar_cadastro).click();

      // 3. Valida as mensagens de erro usando locator comum
      cy.get(loc.WEB.serverest.comum.alertas).should('be.visible');

      // Validações de texto
      cy.contains('Nome é obrigatório').should('be.visible');
      cy.contains('Email é obrigatório').should('be.visible');
      cy.contains('Password é obrigatório').should('be.visible');
    });

    it('2. Deve validar mensagem de erro com senha inválida', () => {
      cy.visit(loc.WEB.serverest.url);
      cy.get(loc.WEB.serverest.login.email).type('usuario_inexistente@teste.com');
      cy.get(loc.WEB.serverest.login.senha).type('123456');
      cy.get(loc.WEB.serverest.login.btn_entrar).click();

      cy.get(loc.WEB.serverest.comum.alertas)
        .should('be.visible')
        .and('contain', 'Email e/ou senha inválidos');
    });

    it('3. Deve validar que o usuário cadastrado via API consta na listagem do Front-end', () => {
      cy.gerarEmailUnico().then((email) => {
        const nome = "Usuario Teste Front";
        const payload = { ...loc_backend.ServeRest.Usuario, nome: nome, email: email };

        cy.cadastrarUsuarioApi(payload).then((res) => {
          const idUsuario = res.body._id;

          // Login e navegação usando locators
          cy.loginServeRest(email, loc_backend.ServeRest.Usuario.password);
          cy.get(loc.WEB.serverest.dashboard.btn_listar_usuarios).click();

          // Validação final
          cy.validaPresencaNaTabela(nome);

          // Teardown
          cy.excluirUsuarioApi(idUsuario);
        });
      });
    });

  });

  describe('BACK-END - Exemplo de como reutilizar comandos relacionados ao Back-end', () => {

    it('Teste 0 - Cadastrar e Validar listagem de usuario cadastrado', () => {

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