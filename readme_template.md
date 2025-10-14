<h1 align="center">NOME DO MEU PROJETO</h1>

### Descrição do projeto

- Esse projeto é destinado a automações dos testes de API / integração.

### 🛠️ Ferramentas utilizadas

- Cypress
- Typescript
- Mochawesome
- JUnit-Reporter
- Eslint + prettier
- CypressReportZephyr

### ⚡ Pré-requisitos

- [Git](https://git-scm.com) [baixar última versão estável e configurar a chave SSH]
- [Nodejs](https://nodejs.org/en/) [baixar última versão estável]
- Base de dados caso exista
- [Oracle Client](https://www.oracle.com/br/database/technologies/oracle19c-windows-downloads.html#license-lightbox) [Baixar a versão WINDOWS.X64_193000_client.zip]

## Executando o projeto:

**Instalando todas as dependencias**

- `npm install`

**Rodando os testes**

Existem 2 formas diferentes de rodar os testes no cypress. São elas:

| Modo de execução   | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `npx cypress open` | Apresenta a interface do cypress para rodar os testes          |
| `npx cypress run`  | Executa toda a suíte de testes em modo headless, sem interface*|

*OBS*: O modo headless permite vários parametros para sua execução, como escolha do browser, spec file e etc. [Aqui](https://docs.cypress.io/guides/guides/command-line#cypress-run) você encontra a documentação do cypress e suas opções de parâmetros.

## ⚙️ Arquitetura do Projeto:

### Estrutura de pastas:

```sh
cypress
├─ e2e            # Arquivos de testes com extensão ".cy.ts", seguindo padrões 'describe' e 'it'
├─ fixtures       # Dados de teste, como objetos JSON, imagens, etc.
└─ support        # Configurações e comandos auxiliares
   ├── database   # Querys de banco de dados
   ├── logic      # Lógica e scripts principais dos testes
   ├── services   # Comunicação com serviços de API e requisições aos endpoints
```

## 📋 Padrões de Desenvolvimento

Para garantir qualidade e consistência, adotamos ESLint e Prettier como ferramentas de linting e formatação.

### Boas Práticas a Seguir

* Nomeação:
  * Arquivos devem ter o mesmo nome do método principal.
  * Use camelCase para nomes de variáveis.
  * Use PascalCase para métodos e classes.
* Código Limpo:
  * Não insira lógica de testes nos arquivos .cy.ts.
  * Reaproveite código criando métodos utilitários para ações repetidas.
  * Evite passos desnecessários para melhorar a performance dos testes.
* Dados:
  * Garanta a integridade da base de dados durante os testes.
  * Evite dependências de ações manuais ou dados específicos.
* Testes:
  * Use nomes descritivos para describe e it.
  * Prefira comentários explicativos a logs desnecessários.
