/// <reference types="cypress" />
import { locators as loc } from './locators';
import { locators as loc_backend } from '../Back-end/locators.js';

describe('ServeRest - Validação de Dados', () => {

  // Limpa cookies e local storage antes de cada teste para evitar interferências]
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('FRONT-END - Verificação de Dados', () => {

    it('1. Deve validar as mensagens de campos obrigatórios no cadastro de usuários', () => {
      cy.visit(loc.WEB.serverest.url);
      cy.get(loc.WEB.serverest.login.btn_ir_para_cadastro, { timeout: 10000 })
        .click();

      // Validação usando a rota centralizada
      cy.url().should('include', loc.WEB.serverest.rotas.cadastro);

      cy.get(loc.WEB.serverest.cadastro.btn_finalizar_cadastro, { timeout: 10000 })
        .click();

      // Validações usando as mensagens centralizadas
      cy.get(loc.WEB.serverest.comum.alertas, { timeout: 10000 })
        .should('be.visible');

      cy.contains(loc.WEB.serverest.mensagens.erro.nome_obrigatorio, { timeout: 10000 })
        .should('be.visible');
      cy.contains(loc.WEB.serverest.mensagens.erro.email_obrigatorio, { timeout: 10000 })
        .should('be.visible');
      cy.contains(loc.WEB.serverest.mensagens.erro.senha_obrigatorio, { timeout: 10000 })
        .should('be.visible');
    });

    
   it('2. Deve validar mensagem de erro com senha inválida', () => {
      cy.visit(loc.WEB.serverest.url);
      
      // Lendo a massa de dados do locator
      cy.get(loc.WEB.serverest.login.email, { timeout: 10000 })
        .type(loc.WEB.serverest.massa.login_invalido.email);
        
      cy.get(loc.WEB.serverest.login.senha, { timeout: 10000 })
        .type(loc.WEB.serverest.massa.login_invalido.senha);
        
      cy.get(loc.WEB.serverest.login.btn_entrar, { timeout: 10000 })
        .click();

      cy.get(loc.WEB.serverest.comum.alertas, { timeout: 10000 })
        .should('be.visible')
        .and('contain', loc.WEB.serverest.mensagens.erro.login_invalido);
    });



    it('3. Deve validar que o usuário cadastrado via API consta na listagem do Front-end', () => {
      cy.gerarEmailUnico().then((email) => {
        // Usando o nome da massa de dados
        const nome = loc.WEB.serverest.massa.nome_padrao;
        const payload = { ...loc_backend.ServeRest.Usuario, nome: nome, email: email };

        cy.cadastrarUsuarioApi(payload).then((res) => {
          const idUsuario = res.body._id;

          cy.loginServeRest(email, loc_backend.ServeRest.Usuario.password);
          cy.get(loc.WEB.serverest.dashboard.btn_listar_usuarios, { timeout: 10000 })
            .click();

          cy.validaPresencaNaTabela(nome);

          cy.excluirUsuarioApi(idUsuario);
        });
      });
    });

  });

  describe('BACK-END - Exemplo de como reutilizar comandos relacionados ao Back-end', () => {

    it('0. Cadastrar e Validar listagem de usuario cadastrado', () => {

      cy.gerarEmailUnico().then((email) => {
        const payload = { ...loc_backend.ServeRest.Usuario, email: email };

        cy.cadastrarUsuarioApi(payload).then((resPost) => {
          const idParaVerificar = resPost.body._id;

          cy.listarUsuariosApi().then((resLista) => {
            const encontrado = resLista.body.usuarios.some(u => u._id === idParaVerificar);

            // Validação de segurança: Interrompe o teste com mensagem clara se o ID não existir
            expect(encontrado, `✅ SUCESSO: O ID ${idParaVerificar} foi localizado corretamente na listagem`).to.be.true;

            // Limpeza após o teste
            cy.excluirUsuarioApi(idParaVerificar);

          });
        });
      });
    });


  });

});