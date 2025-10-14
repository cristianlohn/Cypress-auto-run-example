<h1 align="center">TAUT_CypressAPI_Template</h1>

### Descrição do projeto

- Este é um template para projetos de automação de testes de API, desenvolvido para fornecer um modelo padronizado e eficiente para projetos similares.

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
- Base de dados do caso exista
- [Oracle Client](https://www.oracle.com/br/database/technologies/oracle19c-windows-downloads.html#license-lightbox) [Baixar a versão WINDOWS.X64_193000_client.zip]

### 🚀 Criando um novo projeto a partir deste template:

1. Clone esse template em sua maquina via terminado CMD
2. Entre na na pasta do template `cd TAUT-CypressAPI-template`
3. Execute o arquivo de setup `setup.cmd`

### O que o script de setup faz?
O script setup.cmd realizará as seguintes ações:

1. Perguntará o nome do novo projeto: forneça um nome válido.
2. Opcionalmente, pedirá o link do repositório remoto:
    * Caso tenha um repositório remoto, insira o link (formato SSH recomendado) para vinculação automática.
    * Caso contrário, pressione Enter para continuar sem vinculação.
3. Criará a estrutura do novo projeto com base no template.
4. Inicializará um novo repositório Git e vinculará ao repositório remoto, se fornecido.
5. nstalará automaticamente todas as dependências do projeto via npm.
Após a execução, o projeto estará pronto para uso.

### Próximos Passos

1. Verifique as variáveis de ambiente no arquivo Cypress.config.ts e ajuste, se necessário.
2. Configure as credenciais de banco de dados para sua aplicação.
3. Atualize este README para refletir os detalhes do novo projeto.

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

## Padrões de Desenvolvimento

Para garantir qualidade e consistência, adotamos ESLint e Prettier como ferramentas de linting e formatação.

### 📋  Boas Práticas a Seguir

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
