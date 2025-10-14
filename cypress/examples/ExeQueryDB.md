## Exemplo de como reqalizar uma query aqui no projeto

Sempre utilize o `cy.task('sqlQuery', '')` como segundo parâmetro passe a query que será executada no formato de string a mesma também pode ser definida em uma variável a parte ou ser passada direto.

Para obter a resposta na query é necessário utilizar o `.then((resp: any) ....)` posteriormente fazer as validações. Como no exemplo abaixo:

```sh

describe('Teste de conexão com OracleDB', () => {
  it('Deve consultar dados do OracleDB', () => {
    cy.task('sqlQuery', `SELECT * FROM table WHERE table.colunm = 'S'`).then((resp: any) => {
      expect(resp).to.have.property('rows');
      expect(resp).to.have.property('metaData');
      expect(resp.rows[0][0]).to.be.equal(1172);
    });
  });
});

```

Para validação os dados da query ficaram dentro da propriedade `rows` para pegar o valor, basta `rows[<numero da linha>][<numero da coluna>]`.
