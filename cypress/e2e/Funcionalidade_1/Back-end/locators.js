/// <reference types="cypress" />

export const locators = {
  ServeRest: {
    URLs: {
      serverest: 'https://serverest.dev',
      usuarios: '/usuarios',
    },
    Usuario: {
      nome: 'TesteQABaseCypress',
      password: 'passwordtTesteQABaseCypress',
      administrador: 'true'
    },
    Usuario_Edicao: {
      nome: 'TesteQABaseCypress Editado',
      password: 'newpassword123',
      administrador: 'false'
    }
  },
};