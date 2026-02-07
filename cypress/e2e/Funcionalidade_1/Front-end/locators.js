/// <reference types="cypress" />

export const locators = {
  WEB: {
    serverest: {
      url: 'https://front.serverest.dev/login',
      rotas: {
        cadastro: '/cadastrarusuarios',
        dashboard: '/admin/home'
      },
      login: {
        email: '[data-testid="email"]',
        senha: '[data-testid="senha"]',
        btn_entrar: '[data-testid="entrar"]',
        btn_ir_para_cadastro: '[data-testid="cadastrar"]'
      },
      cadastro: {
        nome: '[data-testid="nome"]',
        email: '[data-testid="email"]',
        senha: '[data-testid="password"]',
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
      },
      // --- NOVIDADE: MENSAGENS DO SISTEMA ---
      mensagens: {
        erro: {
          nome_obrigatorio: 'Nome é obrigatório',
          email_obrigatorio: 'Email é obrigatório',
          senha_obrigatorio: 'Password é obrigatório',
          login_invalido: 'Email e/ou senha inválidos'
        }
      },
      // --- NOVIDADE: MASSA DE DADOS FIXA ---
      massa: {
        nome_padrao: 'Usuario Teste Front'
      }
    }
  }
};