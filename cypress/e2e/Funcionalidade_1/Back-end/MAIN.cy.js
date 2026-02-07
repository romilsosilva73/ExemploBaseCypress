/// <reference types="cypress" />

//import './commands'
import { locators as loc } from './locators';

describe('ServeRest - Back-end', () => {

  // Limpa cookies e local storage antes de cada teste para evitar interferências
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('CRUD de Usuário', () => {

    it('0. Cadastrar, Listar, Buscar, Editar e Excluir usuario - CRUD (Fluxo completo - Menos indicado)', () => {

      // Geração de e-mail dinâmico para evitar erro de duplicidade na API
      cy.gerarEmailUnico().then((email) => {

        // Montagem da massa de dados inicial usando o Spread Operator (...) para unir dados fixos e dinâmicos
        const payload = {
          ...loc.ServeRest.Usuario,
          email: email
        };

        // ETAPA 1: Criar o usuário e capturar o ID gerado pelo sistema
        cy.cadastrarUsuarioApi(payload).then((resPost) => {
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

              // ETAPA 4: Alterar os dados do usuário (usando locators.js)
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

    it('1. Cadastrar e Validar listagem de usuario cadastrado (Fluxo independente - Mais indicado)', () => {

      cy.gerarEmailUnico().then((email) => {
        const payload = { ...loc.ServeRest.Usuario, email: email };

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

    it('2. Buscar usuario (Fluxo independente - Mais indicado)', () => {

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

    it('3. Editar usuario (Fluxo independente - Mais indicado)', () => {
      cy.gerarEmailUnico().then((email) => {
        const payload = { ...loc.ServeRest.Usuario, email: email };

        cy.cadastrarUsuarioApi(payload).then((resPost) => {
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

    it('4. Deve cadastrar um usuário, realizar login e excluir usuário (Fluxo independente - Mais indicado)', () => {

      // Geração de e-mail dinâmico para evitar erro de duplicidade na API
      cy.gerarEmailUnico().then((email) => {

        // Montagem da massa de dados inicial usando o Spread Operator (...) para unir dados fixos e dinâmicos
        const payload = {
          ...loc.ServeRest.Usuario,
          email: email
        };

        // ETAPA 1: Criar o usuário e capturar o ID gerado pelo sistema
        cy.cadastrarUsuarioApi(payload).then((resPost) => {

          const idUsuario = resPost.body._id;

          cy.log(`✅ Usuário cadastrado: ${email}`);

          // ETAPA 2: Realizar login com o usuario criado 
          cy.loginApi(email, loc.ServeRest.Usuario.password).then((token) => {

            expect(token).to.be.a('string');

            // LIMPEZA: Excluir o usuário criado para manter a base limpa
            cy.excluirUsuarioApi(idUsuario);

          });
        });
      });
    });
  });

  describe('CRUD de Produto', () => {

    it('0. Obtem token de usuário, Cadastra, Busca, Edita e Exclui Produto - CRUD (Fluxo completo - Menos indicado)', () => {
      // 0. Pré-condição: Obter Token de Admin (via Custom Command)
      cy.obterTokenAdmin().then((auth) => {
        const authToken = auth.token;
        const idAdmin = auth.idUsuario;

        // 1. CADASTRAR PRODUTO (POST)
        const nomeProdutoUnico = `${loc.ServeRest.Produto.nome} ${Date.now()}`;
        const payloadProduto = { ...loc.ServeRest.Produto, nome: nomeProdutoUnico };

        cy.cadastrarProdutoApi(authToken, payloadProduto).then((resPost) => {

          const idProduto = resPost.body._id;

          cy.log(`✅ SUCESSO - Etapa 1: Produto criado com ID ${idProduto}`);

          // 2. BUSCAR PRODUTO POR ID (GET)
          cy.buscarProdutoPorIdApi(idProduto).then((resBusca) => {
            expect(resBusca.body.nome, 'O nome deve ser o que foi enviado no POST').to.eq(nomeProdutoUnico);
            cy.log('✅ SUCESSO - Etapa 2: Produto localizado e validado.');

            // 3. EDITAR PRODUTO (PUT)
            const payloadEditado = {
              ...loc.ServeRest.Produto_Edicao,
              nome: `${nomeProdutoUnico} Editado`
            };

            cy.editarProdutoApi(authToken, idProduto, payloadEditado).then((resPut) => {

              cy.log('✅ SUCESSO - Etapa 3: Informações do produto alteradas.');

              // Validar edição via nova busca
              cy.buscarProdutoPorIdApi(idProduto).then((resValidar) => {
                expect(resValidar.body.nome).to.contains('Editado');
                cy.log('✅ Edição confirmada no banco de dados.');

                // 4. EXCLUIR PRODUTO (DELETE)
                cy.excluirProdutoApi(authToken, idProduto).then((resDelete) => {

                  cy.log(`✅ SUCESSO - Etapa 4: Produto ${idProduto} removido.`);

                  // 5. LIMPEZA FINAL: Remover o usuário admin para manter a base limpa
                  cy.excluirUsuarioApi(idAdmin).then((resExcluirAdmin) => {
                    cy.log(`✅ SUCESSO - Etapa 5: Admin ${idAdmin} removido.`);
                  });
                });
              });
            });
          });
        });
      });
    });


    it('1. Cadastrar e Validar listagem de produto cadastrado (Fluxo independente - Mais indicado)', () => {
      cy.obterTokenAdmin().then((auth) => {
        const { token, idUsuario } = auth;
        const nomeProduto = `Produto Lista ${Date.now()}`;
        const payload = { ...loc.ServeRest.Produto, nome: nomeProduto };

        // Cadastra o produto
        cy.cadastrarProdutoApi(token, payload).then((resPost) => {
          const idProduto = resPost.body._id;

          // Valida se aparece na listagem geral (Simulação do seu teste de usuário)
          cy.request('GET', `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}`).then((resLista) => {
            const encontrado = resLista.body.produtos.some(p => p._id === idProduto);
            expect(encontrado, `✅ SUCESSO: O Produto ${idProduto} está na lista`).to.be.true;

            // Limpeza: Remove produto e usuário admin
            cy.excluirProdutoApi(token, idProduto);
            cy.excluirUsuarioApi(idUsuario);
          });
        });
      });
    });

    it('2. Buscar produto por ID (Fluxo independente - Mais indicado)', () => {
      cy.obterTokenAdmin().then((auth) => {
        const { token, idUsuario } = auth;
        const nomeProduto = `Produto Busca ${Date.now()}`;
        const payload = { ...loc.ServeRest.Produto, nome: nomeProduto };

        cy.cadastrarProdutoApi(token, payload).then((resPost) => {
          const idProduto = resPost.body._id;

          cy.buscarProdutoPorIdApi(idProduto).then((resBusca) => {
            expect(resBusca.body._id).to.eq(idProduto);
            expect(resBusca.body.nome).to.eq(nomeProduto);
            cy.log('✅ Rastreabilidade: Dados do produto conferem na consulta individual.');

            // Limpeza
            cy.excluirProdutoApi(token, idProduto);
            cy.excluirUsuarioApi(idUsuario);
          });
        });
      });
    });

    it('3. Editar produto existente (Fluxo independente - Mais indicado)', () => {
      cy.obterTokenAdmin().then((auth) => {
        const { token, idUsuario } = auth;
        const nomeOriginal = `Produto Original ${Date.now()}`;
        const payload = { ...loc.ServeRest.Produto, nome: nomeOriginal };

        cy.cadastrarProdutoApi(token, payload).then((resPost) => {
          const idProduto = resPost.body._id;
          const payloadNovo = { ...loc.ServeRest.Produto_Edicao, nome: `${nomeOriginal} EDITADO` };

          cy.editarProdutoApi(token, idProduto, payloadNovo).then(() => {
            // Validar alteração
            cy.buscarProdutoPorIdApi(idProduto).then((resValidar) => {
              expect(resValidar.body.nome).to.eq(payloadNovo.nome);
              cy.log('✅ Edição de produto confirmada.');

              // Limpeza
              cy.excluirProdutoApi(token, idProduto);
              cy.excluirUsuarioApi(idUsuario);
            });
          });
        });
      });
    });


    it('4. Excluir produto e validar remoção (Fluxo independente)', () => {

      cy.obterTokenAdmin().then((auth) => {
        const { token, idUsuario } = auth;
        const payload = { ...loc.ServeRest.Produto, nome: `Produto Delete ${Date.now()}` };

        cy.cadastrarProdutoApi(token, payload).then((resPost) => {
          const idProduto = resPost.body._id;

          // 1. Exclui o produto
          cy.excluirProdutoApi(token, idProduto).then((resDel) => {
            expect(resDel.body.message).to.eq('Registro excluído com sucesso');

            // 2. Validação de retorno de status 400
            cy.buscarProdutoPorIdApiErro400(idProduto).then(() => {

              // Limpeza do usuário
              cy.excluirUsuarioApi(idUsuario);
            });
          });
        });
      });
    });


  });

});