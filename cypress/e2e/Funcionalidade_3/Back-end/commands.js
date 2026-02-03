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