export const Autenticacao = {
  Autenticar(usuario = Cypress.env('usuario'), senha = Cypress.env('senha')) {
    return cy
      .ApiRequest({
        method: 'POST',
        url: 'autenticacao/autenticar',
        body: {
          usuario: `${usuario}`,
          senha: `${senha}`,
        },
      })
      .then((resp) => {
        if (resp.status === 201) {
          const token = resp.body.tokenAutenticacao;
          Cypress.env('authToken', token);
        }
      });
  },
};
