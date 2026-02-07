/// <reference types="cypress" />

export const locators = {
  ServeRest: {
    URLs: {
      serverest: 'https://serverest.dev',
      usuarios: '/usuarios',
      login: '/login',
      produtos: '/produtos'
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
    },
    Produto: {
      nome: 'Teclado Mecânico RGB',
      preco: 250,
      descricao: 'Switch Blue',
      quantidade: 50
    },
    Produto_Edicao: {
      nome: 'Teclado Mecânico Wireless',
      preco: 350,
      descricao: 'Switch Brown',
      quantidade: 30
    }
  },
};