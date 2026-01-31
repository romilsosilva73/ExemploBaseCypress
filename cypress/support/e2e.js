// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

/**
 * --- CONFIGURAÇÃO DE LIMPEZA DE LOG (VISUAL) ---
 *
 * PROBLEMA:
 * O Test Runner do Cypress exibe nativamente todas as requisições de rede (XHR/Fetch),
 * como chamadas de analytics, pixels e carregamento de recursos. Isso polui o log
 * visual ("lixo"), dificultando a visualização dos passos do teste e dos asserts.
 *
 * SOLUÇÃO:
 * O código abaixo injeta uma tag <style> no HTML do próprio Test Runner para ocultar
 * via CSS (display: none) as linhas referentes a requisições de rede.
 * Nota: As requisições continuam ocorrendo, apenas não são mostradas visualmente.
 */
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = `
    .command-name-request,
    .command-name-xhr {
      display: none;
    }
  `;
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}