/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      ApiRequest({ method, url, body, qs }: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; url: string; body?: object; qs?: object }): Chainable<any>;
    }

    interface cy {
      state: any;
    }
    interface Cypress {
      mocha: any;
    }

    interface ResolvedConfigOptions {
      baseUrl: string | null;
      usuario: string | null;
      senha: string | null;
      reporterZephyr: boolean | null;
      keyCycleZephyr: string | null;
      idProjectZephyr: number | null;
      idUserZephyr: string | null;
    }
  }
}

Cypress.Commands.add('ApiRequest', ({ method, url, body, qs }: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; url: string; body?: object; qs?: object }): any => {
  try {
    return cy.request({
      method,
      url,
      failOnStatusCode: false,
      encoding: method === 'POST' || method === 'PUT' ? 'binary' : undefined,
      gzip: method === 'GET' ? false : undefined,
      body,
      qs,
      headers: {
        Authorization: `Bearer ${Cypress.env('authToken')}`,
      },
    });
  } catch (error) {
    throw new Error(`Não foi possível executar a API ${url}. Erro: ${error}`);
  }
});
