@echo off
REM Passo 1: Obter o diretório atual (completo)
set "DiretorioAtual=%cd%"

REM Passo 2: Obter o nome da pasta atual
for %%F in ("%DiretorioAtual%") do set "NomeAtual=%%~nxF"

REM Passo 3: Perguntar o novo nome do projeto
set /p NovoNome="Digite o novo nome do projeto: "

REM Passo 4: Validar se o nome não está vazio
if "%NovoNome%"=="" (
    echo Nome do projeto não pode estar vazio. Tente novamente.
    pause
    exit /b
)

REM Perguntar link do repositorio remoto
set /p RepositorioRemoto="Digite o link do repositório remoto (preferencialmente em formato SSH) para vinculá-lo automaticamente, ou pressione Enter para pular: "

REM Passo 5: Mover para o diretório pai antes de criar a nova pasta
cd ..

REM Passo 6: Verificar se o diretório original (TAUT-CypressAPI-Template) existe
if not exist "%NomeAtual%" (
    echo O diretório "%NomeAtual%" não foi encontrado. Verifique o caminho e tente novamente.
    pause
    exit /b
)

REM Passo 7: Criar a nova pasta com o nome fornecido pelo usuário
mkdir "%NovoNome%"
if errorlevel 1 (
    echo Falha ao criar a nova pasta "%NovoNome%". Verifique as permissões.
    pause
    exit /b
)

REM Passo 8: Mover todos os arquivos e pastas da pasta original para a nova pasta, exceto o script setup.cmd
echo Movendo arquivos e pastas para a nova pasta "%NovoNome%"...
for /d %%D in ("%NomeAtual%\*") do (
    echo Movendo pasta %%D
    move "%%D" "%NovoNome%\" >nul
)

for %%F in ("%NomeAtual%\*") do (
    if /I not "%%~nxF"=="setup.cmd" (
        echo Movendo arquivo %%F
        move "%%F" "%NovoNome%\" >nul
    )
)

REM Passo 9: Acessar a nova pasta
cd "%NovoNome%"
if errorlevel 1 (
    echo Erro ao acessar a pasta %NovoNome%. Verifique se a pasta foi criada corretamente.
    pause
    exit /b
)

REM Passo 10: Verificar e remover a pasta .git
if exist .git (
    rmdir /s /q .git
    echo Pasta .git removida com sucesso.
) else (
    echo Nenhuma pasta .git encontrada.
)

REM Passo 11: Inicializar um novo repositório Git
git init
if errorlevel 1 (
    echo Erro ao inicializar o repositório Git.
    pause
)

REM Passo 12: Executar npm install em um comando separado e garantir que o script continue
echo Instalando dependências com npm install...
call npm install || echo Falha ao executar npm install. Verifique manualmente.

REM Passo 13: Criando branch do projeto
git checkout -b chore/InitProject_%NovoNome%
git branch -d master

REM Passo 14: Configurar o repositório remoto, se fornecido
if not "%RepositorioRemoto%"=="" (
    echo Vinculando ao repositório remoto: %RepositorioRemoto%...
    git remote add origin "%RepositorioRemoto%"
    if errorlevel 1 (
        echo Erro ao vincular o repositório remoto. Verifique manualmente.
    ) else (
        echo Repositório remoto vinculado com sucesso!
    )
)

REM Passo 15: Deletar o arquivo readme.md, se existir
if exist README.md (
    del README.md
    echo Arquivo readme.md excluído.
)

REM Passo 16: Renomear readme_template.md para readme.md
if exist readme_template.md (
    ren readme_template.md README.md
    echo Arquivo readme_template.md renomeado para readme.md.
) else (
    echo O arquivo readme_template.md não foi encontrado.
)

REM Passo 17: Voltar para o diretório pai
cd ..

REM Passo 18: Deletar a pasta original e o script setup.cmd
echo Deletando a pasta "%NomeAtual%"...
rmdir /s /q "%NomeAtual%"
if errorlevel 1 (
    echo Erro ao deletar a pasta original. Verifique manualmente.
)

echo Deletando o script setup.cmd...
del "%NovoNome%\setup.cmd"
if errorlevel 1 (
    echo Erro ao deletar o script setup.cmd. Verifique manualmente.
)

REM Finalizar
echo Setup do projeto concluído com sucesso!
pause
