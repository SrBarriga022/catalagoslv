# 📖 Instruções: Publicar no GitHub

Este documento contém o passo a passo para publicar o catálogo de produtos no GitHub.

## ✅ Pré-requisitos

- Conta no GitHub (crie em [github.com](https://github.com) se não tiver)
- Git instalado no seu computador
- O projeto baixado ou clonado localmente

## 🚀 Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login na sua conta
2. Clique no ícone **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha os dados:
   - **Repository name**: `catalogo-produtos-informatica`
   - **Description**: "Catálogo web de produtos de informática - Leonardo A Verza"
   - **Visibility**: Selecione **"Public"** (para ser acessível publicamente)
   - **Initialize this repository with**: Deixe desmarcado
5. Clique em **"Create repository"**

## 🔧 Passo 2: Configurar Git Localmente

Abra o terminal/prompt de comando no diretório do projeto e execute:

```bash
# Navegue até o diretório do projeto
cd catalogo-produtos-informatica

# Inicialize o repositório git (se não estiver já inicializado)
git init

# Configure seu nome e email (use os mesmos do GitHub)
git config user.name "Seu Nome"
git config user.email "seu.email@github.com"

# Adicione o repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/catalogo-produtos-informatica.git

# Verifique se foi adicionado corretamente
git remote -v
```

## 📤 Passo 3: Fazer o Primeiro Commit

```bash
# Adicione todos os arquivos do projeto
git add .

# Crie o primeiro commit
git commit -m "Inicial: Catálogo de produtos de informática - Leonardo A Verza"

# Renomeie a branch para 'main' (padrão do GitHub)
git branch -M main

# Faça o push para o GitHub
git push -u origin main
```

## ✨ Pronto!

Seu projeto está agora no GitHub! Acesse:
```
https://github.com/SEU_USUARIO/catalogo-produtos-informatica
```

## 📝 Próximos Passos (Opcional)

### Adicionar Descrição e Tópicos

1. Na página do repositório, clique em **"Edit"** (ícone de engrenagem)
2. Adicione:
   - **Description**: "Catálogo web de produtos de informática"
   - **Topics**: `catalogo`, `produtos`, `informatica`, `react`, `tailwind`
3. Clique em **"Save changes"**

### Publicar com GitHub Pages

Para publicar o site automaticamente:

1. Na página do repositório, vá para **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Crie um arquivo `.github/workflows/deploy.yml` no seu projeto:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. Faça commit e push:
```bash
git add .github/workflows/deploy.yml
git commit -m "Adicionar workflow de deploy"
git push
```

5. Após alguns minutos, seu site estará disponível em:
```
https://SEU_USUARIO.github.io/catalogo-produtos-informatica
```

## 🔄 Atualizar o Repositório

Sempre que fizer mudanças no projeto:

```bash
# Adicione os arquivos modificados
git add .

# Crie um commit com uma mensagem descritiva
git commit -m "Descrição das mudanças"

# Faça o push para o GitHub
git push
```

## 🆘 Dúvidas Comuns

### "Permission denied (publickey)"

Você precisa configurar uma chave SSH. Veja: [GitHub SSH Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### "fatal: remote origin already exists"

Execute:
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/catalogo-produtos-informatica.git
```

### "fatal: The current branch main has no upstream branch"

Execute:
```bash
git push -u origin main
```

## 📚 Recursos Úteis

- [Documentação Git](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [GitHub Pages](https://pages.github.com)

---

**Sucesso! Seu catálogo está agora no GitHub! 🎉**
