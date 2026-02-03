/// <reference types="cypress" />

//import './commands'
import { locators as loc } from './locators';


describe('ServeRest - Fluxo de Backend de Usuários', () => {

  // Limpa cookies e local storage antes de cada teste para evitar interferências
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Cenários de Teste - CRUD de Usuários', () => {

    it('1. Cadastrar, Listar, Buscar, Editar e Excluir usuario (CRUD)', () => {

      // Geração de e-mail dinâmico para evitar erro de duplicidade na API
      cy.gerarEmailUnico().then((email) => {

        // Montagem da massa de dados inicial usando o Spread Operator (...) para unir dados fixos e dinâmicos
        const payloadOriginal = {
          ...loc.ServeRest.Usuario,
          email: email
        };

        // ETAPA 1: Criar o usuário e capturar o ID gerado pelo sistema
        cy.cadastrarUsuarioApi(payloadOriginal).then((resPost) => {
          const idUsuario = resPost.body._id;
          cy.log(`✅ SUCESSO - Etapa 1: Usuário criado com ID ${idUsuario}`);

          // ETAPA 2: Verificar se o usuário recém-criado aparece na lista de todos os usuários
          cy.listarUsuariosApi().then((resLista) => {
            const encontrado = resLista.body.usuarios.some(u => u._id === idUsuario);

            expect(encontrado, 'Rastreabilidade: O ID criado deve estar presente na listagem').to.be.true;
            cy.log('✅ SUCESSO - Etapa 2: ID localizado na listagem global.');

            // ETAPA 3: Consultar os detalhes específicos deste usuário via ID
            cy.buscarUsuarioPorIdApi(idUsuario).then((resBusca) => {
              expect(resBusca.body._id, 'O ID retornado deve ser idêntico ao solicitado').to.eq(idUsuario);
              expect(resBusca.body.email, 'O e-mail deve corresponder ao e-mail dinâmico gerado').to.eq(email);
              cy.log('✅ SUCESSO - Etapa 3: Dados detalhados conferem com o cadastro.');

              // ETAPA 4: Alterar os dados do usuário (usando a massa de edição do locator)
              const payloadNovo = {
                ...loc.ServeRest.Usuario_Edicao,
                email: email // Mantemos o mesmo e-mail para identificar o registro
              };

              cy.editarUsuarioApi(idUsuario, payloadNovo).then(() => {
                cy.log('✅ SUCESSO - Etapa 4: Informações do usuário alteradas.');

                // Validar edição via busca por usuario 
                cy.buscarUsuarioPorIdApi(idUsuario).then((resValidarEdicao) => {
                  expect(resValidarEdicao.body.nome).to.eq(loc.ServeRest.Usuario_Edicao.nome);
                  cy.log('✅ Edição confirmada no banco de dados.');

                  // ETAPA 5: Remover o usuário para manter a base de dados limpa
                  cy.excluirUsuarioApi(idUsuario).then((resExcluir) => {
                    expect(resExcluir.body.message).to.eq('Registro excluído com sucesso');
                    cy.log(`✅ SUCESSO - Etapa 5: Usuário ${idUsuario} removido do sistema.`);
                  });
                });
              });
            });
          });
        });
      });
    });

    it('2. Cadastrar e Validar listagem de usuario cadastrado', () => {

      cy.gerarEmailUnico().then((email) => {
        const payload = { ...loc.ServeRest.Usuario, email: email };

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

    it('3. Buscar usuario', () => {

      cy.gerarEmailUnico().then((email) => {
        const payload = { ...loc.ServeRest.Usuario, email: email };

        cy.cadastrarUsuarioApi(payload).then((resPost) => {
          const idParaBuscar = resPost.body._id;

          cy.buscarUsuarioPorIdApi(idParaBuscar).then((resBusca) => {
            // Verifica se a API não retornou dados de outro usuário por engano
            expect(resBusca.body._id).to.eq(idParaBuscar);
            expect(resBusca.body.nome).to.eq(loc.ServeRest.Usuario.nome);
            cy.log('✅ Rastreabilidade: Nome e ID conferem na consulta individual.');
          });

          cy.excluirUsuarioApi(idParaBuscar);
        });
      });
    });

    it('4. Editar usuario ', () => {
      cy.gerarEmailUnico().then((email) => {
        const payloadOriginal = { ...loc.ServeRest.Usuario, email: email };

        cy.cadastrarUsuarioApi(payloadOriginal).then((resPost) => {
          const idParaEditar = resPost.body._id;
          const payloadNovo = { ...loc.ServeRest.Usuario_Edicao, email: email };

          // Executa a alteração e remove o dado logo em seguida
          cy.editarUsuarioApi(idParaEditar, payloadNovo).then(() => {

            // Validar edição via busca por usuario 
            cy.buscarUsuarioPorIdApi(idParaEditar).then((resValidarEdicao) => {
              expect(resValidarEdicao.body.nome).to.eq(loc.ServeRest.Usuario_Edicao.nome);
              cy.log('✅ Edição confirmada no banco de dados.');

              cy.excluirUsuarioApi(idParaEditar);
            });
          });
        });
      });
    });

  });
});