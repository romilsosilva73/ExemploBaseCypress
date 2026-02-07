import { locators as loc } from './locators.js';

Cypress.Commands.add('gerarEmailUnico', () => {
  return cy.wrap(`teste${Date.now()}@qa.com.br`);
});

Cypress.Commands.add('cadastrarUsuarioApi', (usuario) => {
  return cy.request({
    method: 'POST',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.usuarios}`,
    body: usuario,
  }).then((res) => {
    expect(res.status).to.eq(201);
    expect(res.body.message).to.eq('Cadastro realizado com sucesso');
    return res;
  });
});

Cypress.Commands.add('listarUsuariosApi', () => {
  return cy.request({
    method: 'GET',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.usuarios}`
  }).then((res) => {
    expect(res.status).to.eq(200);
    return res;
  });
});

Cypress.Commands.add('buscarUsuarioPorIdApi', (id) => {
  return cy.request({
    method: 'GET',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.usuarios}/${id}`,
  }).then((res) => {
    expect(res.status).to.eq(200);
    return res;
  });
});

Cypress.Commands.add('editarUsuarioApi', (id, usuario) => {
  return cy.request({
    method: 'PUT',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.usuarios}/${id}`,
    body: usuario,
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.message).to.eq('Registro alterado com sucesso');
    return res;
  });
});

Cypress.Commands.add('excluirUsuarioApi', (id) => {
  return cy.request({
    method: 'DELETE',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.usuarios}/${id}`,
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.message).to.eq('Registro excluído com sucesso');
    return res;
  });
});

Cypress.Commands.add('loginApi', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.login}`,
    body: { email, password }
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.message).to.eq('Login realizado com sucesso');
    return res.body.authorization; // Retorna o token Bearer
  });
});


Cypress.Commands.add('cadastrarProdutoApi', (token, produto) => {
  return cy.request({
    method: 'POST',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}`,
    headers: { authorization: token },
    body: produto
  }).then((res) => {
    expect(res.status).to.eq(201);
    return res;
  });
});

Cypress.Commands.add('buscarProdutoPorIdApi', (id) => {
  return cy.request({
    method: 'GET',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}/${id}`
  }).then((res) => {
    expect(res.status).to.eq(200);
    return res;
  });
});

Cypress.Commands.add('editarProdutoApi', (token, id, produto) => {
  return cy.request({
    method: 'PUT',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}/${id}`,
    headers: { authorization: token },
    body: produto
  }).then((res) => {
    expect(res.status).to.eq(200);
    return res;
  });
});

Cypress.Commands.add('excluirProdutoApi', (token, id) => {
  return cy.request({
    method: 'DELETE',
    url: `${loc.ServeRest.URLs.serverest}${loc.ServeRest.URLs.produtos}/${id}`,
    headers: { authorization: token }
  }).then((res) => {
    expect(res.status).to.eq(200);
    return res;
  });
});

Cypress.Commands.add('obterTokenAdmin', () => {
  return cy.gerarEmailUnico().then((email) => {
    const payloadAdmin = {
      ...loc.ServeRest.Usuario,
      email: email,
      administrador: 'true'
    };

    return cy.cadastrarUsuarioApi(payloadAdmin).then((res) => {
      // Guardamos o ID 
      const idUsuario = res.body._id;

      return cy.loginApi(email, loc.ServeRest.Usuario.password).then((token) => {
        // Retornamos um objeto com o token e o id 
        return { token, idUsuario };
      });
    });
  });
});

