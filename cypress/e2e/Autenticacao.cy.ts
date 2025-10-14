import { AutenticacaoDeUsuario } from 'cypress/support/logic/AutenticacaoDeUsuarioLogic';

describe('Autenticação de usuário', () => {
  it('Realizar autenticação com credenciais validas', () => {
    AutenticacaoDeUsuario.ValidaAutenticacao('validas');
  });

  it('Realizar autenticação com credenciais invalidas', () => {
    AutenticacaoDeUsuario.ValidaAutenticacao('invalidas', { usuario: 'admin', senha: 'adminerror' });
  });
});
