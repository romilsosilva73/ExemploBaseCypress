/// <reference types="cypress" />

export const locators = {
  WEB: {
    serverest: {
      url: 'https://front.serverest.dev/login',
      login: {
        email: '[data-testid="email"]',
        senha: '[data-testid="senha"]',
        btn_entrar: '[data-testid="entrar"]',
        btn_ir_para_cadastro: '[data-testid="cadastrar"]' // Link na tela de login
      },
      cadastro: {
        nome: '[data-testid="nome"]',
        email: '[data-testid="email"]',
        senha: '[data-testid="password"]', // Note que no cadastro o id costuma ser password
        btn_finalizar_cadastro: '[data-testid="cadastrar"]'
      },
      dashboard: {
        btn_listar_usuarios: '[data-testid="listarUsuarios"]',
        btn_listar_produtos: '[data-testid="listarProdutos"]',
        tabela: '.table',
        btn_logout: '[data-testid="logout"]'
      },
      comum: {
        alertas: '.alert'
      }
    }
  }
};