import { locators as loc } from './locators.js';

// --- UTILITÁRIOS ---
Cypress.Commands.add('gerarEmailUnico', () => {
  return cy.wrap(`teste${Date.now()}@qa.com.br`).as('EmailDinamico');
});

// --- USUÁRIOS ---
Cypress.Commands.add('cadastrarUsuarioApi', (usuario) => {
  return cy.request({
    method: 'POST',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.usuarios}`,
    body: usuario,
  }).then((res) => {
    expect(res.status, 'Status Code deve ser 201').to.eq(201);
    expect(res.body.message, 'Mensagem de sucesso no cadastro').to.eq('Cadastro realizado com sucesso');
    return res;
  }).as('POST_CadastrarUsuario');
});

Cypress.Commands.add('listarUsuariosApi', () => {
  return cy.request({
    method: 'GET',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.usuarios}`
  }).then((res) => {
    expect(res.status, 'Status Code deve ser 200').to.eq(200);
    return res;
  }).as('GET_ListarUsuarios');
});

Cypress.Commands.add('buscarUsuarioPorIdApi', (id) => {
  return cy.request({
    method: 'GET',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.usuarios}/${id}`,
  }).then((res) => {
    expect(res.status, 'Status Code deve ser 200').to.eq(200);
    return res;
  }).as('GET_BuscarUsuarioPorID');
});

Cypress.Commands.add('editarUsuarioApi', (id, usuario) => {
  return cy.request({
    method: 'PUT',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.usuarios}/${id}`,
    body: usuario,
  }).then((res) => {
    expect(res.status, 'Status Code deve ser 200').to.eq(200);
    expect(res.body.message, 'Mensagem de sucesso na edição').to.eq('Registro alterado com sucesso');
    return res;
  }).as('PUT_EditarUsuario');
});

Cypress.Commands.add('excluirUsuarioApi', (id) => {
  return cy.request({
    method: 'DELETE',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.usuarios}/${id}`,
  }).then((res) => {
    expect(res.status, 'Status Code deve ser 200').to.eq(200);
    expect(res.body.message, 'Mensagem de sucesso na exclusão').to.eq('Registro excluído com sucesso');
    return res;
  }).as('DELETE_ExcluirUsuario');
});

// --- AUTH ---
Cypress.Commands.add('loginApi', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.login}`,
    body: { email, password }
  }).then((res) => {
    expect(res.status, 'Status Code deve ser 200').to.eq(200);
    expect(res.body.message, 'Login realizado com sucesso').to.eq('Login realizado com sucesso');
    return res.body.authorization; 
  }).as('POST_Login');
});

Cypress.Commands.add('obterTokenAdmin', () => {
  return cy.gerarEmailUnico().then((email) => {
    const payloadAdmin = {
      ...loc.ServeRest.Usuario,
      email: email,
      administrador: 'true'
    };

    return cy.cadastrarUsuarioApi(payloadAdmin).then((res) => {
      const idUsuario = res.body._id;

      return cy.loginApi(email, loc.ServeRest.Usuario.password).then((token) => {
        return { token, idUsuario };
      });
    });
  });
});

// --- PRODUTOS ---
Cypress.Commands.add('cadastrarProdutoApi', (token, produto) => {
  return cy.request({
    method: 'POST',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}`,
    headers: { authorization: token },
    body: produto
  }).then((res) => {
    expect(res.status).to.eq(201);
    expect(res.body.message).to.eq('Cadastro realizado com sucesso');
    return res;
  }).as('POST_CadastrarProduto');
});

Cypress.Commands.add('buscarProdutoPorIdApi', (id) => {
  return cy.request({
    method: 'GET',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}/${id}`
  }).then((res) => {
    expect(res.status).to.eq(200);
    return res;
  }).as('GET_BuscarProdutoPorID');
});

Cypress.Commands.add('editarProdutoApi', (token, id, produto) => {
  return cy.request({
    method: 'PUT',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}/${id}`,
    headers: { authorization: token },
    body: produto
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.message).to.eq('Registro alterado com sucesso');
    return res;
  }).as('PUT_EditarProduto');
});

Cypress.Commands.add('excluirProdutoApi', (token, id) => {
  return cy.request({
    method: 'DELETE',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}/${id}`,
    headers: { authorization: token }
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.message).to.eq('Registro excluído com sucesso');
    return res;
  }).as('DELETE_ExcluirProduto');
});

// Busca de Produto - Cenário de Sucesso (200)
Cypress.Commands.add('buscarProdutoPorIdApiSucesso', (id) => {
  return cy.request({
    method: 'GET',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}/${id}`
  }).then((res) => {
    expect(res.status, 'Status Code deve ser 200 (Sucesso)').to.eq(200);
    expect(res.body, 'Corpo da resposta deve conter o ID do produto').to.have.property('_id', id);
    return res;
  }).as('GET_BuscarProduto_Sucesso');
});

// Busca de Produto - Cenário de Erro (400)
Cypress.Commands.add('buscarProdutoPorIdApiErro400', (id) => {
  return cy.request({
    method: 'GET',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}/${id}`,
    failOnStatusCode: false
  }).then((res) => {
    expect(res.status, 'Status Code deve ser 400 (Bad Request)').to.eq(400);
    expect(res.body.message, 'Mensagem de erro deve ser "Produto não encontrado"').to.eq('Produto não encontrado');
    return res;
  }).as('GET_BuscarProduto_Negativo');
});