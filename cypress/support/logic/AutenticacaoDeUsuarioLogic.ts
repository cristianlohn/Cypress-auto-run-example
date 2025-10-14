import { Autenticacao } from 'cypress/support/services/AutenticacaoService';

type credenciais = 'validas' | 'invalidas';

interface bodyRequest {
  usuario: string;
  senha: string;
}

export const AutenticacaoDeUsuario = {
  ValidaAutenticacao(validacao: credenciais, credenciais?: bodyRequest) {
    switch (validacao) {
      case 'validas':
        Autenticacao.Autenticar().then((resp) => {
          expect(resp.status).to.be.equal(201);
          expect(resp.body.tokenAutenticacao).not.to.be.null;
          expect(resp.body.tokenAutenticacao).not.to.be.undefined;
          expect(resp.headers).to.be.property('date');
        });
        break;

      case 'invalidas':
        Autenticacao.Autenticar(credenciais?.usuario, credenciais?.senha).then((resp) => {
          expect(resp.status).to.be.equal(403);
          expect(resp.body).to.be.property('code');
          expect(resp.body).to.be.property('message');
          expect(resp.body).to.be.property('detailedMessage');
          expect(resp.body).to.be.property('helpUrl');
          expect(resp.body.details[0]).to.be.property('code');
          expect(resp.body.details[0]).to.be.property('detailedMessage');
          expect(resp.body.details[0].message).to.be.equal('Usuário e/ou senha errada');
        });
        break;
    }
  },
};
