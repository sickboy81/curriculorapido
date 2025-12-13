@echo off
chcp 65001 >nul
echo Navegando para o diretório do projeto...
cd /d "E:\Vibecode apps\currículo-rápido"
if errorlevel 1 (
    echo ERRO: Não foi possível navegar para o diretório do projeto
    pause
    exit /b 1
)

echo Diretório atual: %CD%
echo.

echo Verificando status do Git...
git status
echo.

echo Adicionando arquivos...
git add .
echo.

echo Fazendo commit...
git commit -m "feat: Otimização SEO completa - structured data, hreflang, lazy loading, conteúdo rico e correção robots.txt"
echo.

echo Enviando para GitHub...
git push -u origin master
echo.

echo Concluído!
pause

