# Catálogo de Produtos - Leonardo A Verza

Um catálogo web profissional e responsivo para gerenciar produtos de informática. Desenvolvido com React 19, Tailwind CSS 4 e componentes shadcn/ui.

## 🎯 Características

- **Tabela Editável**: Adicione e remova peças conforme necessário
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Interface Intuitiva**: Fácil de usar, sem necessidade de treinamento
- **Dados Persistentes**: Informações da empresa pré-configuradas
- **Categorias Pré-carregadas**: 12 categorias padrão (Processador, Placa Mãe, etc.)
- **Links de Referência**: Campo para adicionar links de conferência dos produtos
- **Cabeçalho e Rodapé**: Informações completas da empresa (CNPJ, IE, endereço, contatos)
- **Logo Personalizável**: Espaço para adicionar logo da empresa

## 📋 Estrutura da Tabela

| Campo | Descrição |
|-------|-----------|
| ITEM | Número sequencial do produto |
| PRODUTO/SERVIÇO | Nome do produto ou serviço |
| DESCRIÇÃO TÉCNICA | Especificações técnicas |
| MARCA | Fabricante ou marca |
| MODELO | Número ou identificação do modelo |
| LINK PARA CONFERÊNCIA | URL para consulta ou compra |
| AÇÕES | Botão para remover a peça |

## 🚀 Como Usar

### Adicionar uma Peça

1. Clique no botão verde **"Adicionar Peça"** no canto superior direito
2. Preencha os dados:
   - **Produto/Serviço** (obrigatório)
   - **Descrição Técnica** (opcional)
   - **Marca** (opcional)
   - **Modelo** (opcional)
   - **Link para Conferência** (opcional)
3. Clique em **"Adicionar"**

### Remover uma Peça

1. Localize a linha da peça que deseja remover
2. Clique no ícone de **lixeira** (vermelho) no final da linha
3. Confirme a remoção no diálogo que aparecerá

## 📱 Responsividade

- **Desktop**: Layout completo com todas as colunas visíveis
- **Tablet**: Tabela com scroll horizontal se necessário
- **Mobile**: Interface otimizada com scroll horizontal da tabela

## 🛠️ Instalação Local

### Pré-requisitos
- Node.js 18+ instalado
- npm ou pnpm

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/catalogo-produtos-informatica.git
cd catalogo-produtos-informatica

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev

# Abra no navegador
# http://localhost:3000
```

## 📦 Build para Produção

```bash
# Crie a versão otimizada
pnpm build

# Visualize a versão de produção
pnpm preview
```

## 🔧 Personalizações

### Alterar Informações da Empresa

Edite o arquivo `client/src/pages/Home.tsx` e procure por `DADOS_EMPRESA`:

```typescript
const DADOS_EMPRESA = {
  nome: "LEONARDO A VERZA - LTDA",
  cnpj: "07.460.912/0002-76",
  ie: "258.870.222",
  endereco: "Rua Pedro Mazurechen, 133",
  cep: "89.400-000 – Porto União-SC",
  telefone: "(42) 3523-2535",
  email1: "lvinformaticafilial@gmail.com",
  email2: "lvlicitacaofilial@gmail.com",
};
```

### Alterar Categorias Padrão

Edite o array `CATEGORIAS_PADRAO` no mesmo arquivo:

```typescript
const CATEGORIAS_PADRAO = [
  "PROCESSADOR",
  "PLACA MÃE",
  "ARMAZENAMENTO",
  // ... adicione mais categorias
];
```

### Adicionar Logo da Empresa

1. Prepare uma imagem PNG com fundo transparente
2. Substitua a URL em `client/src/pages/Home.tsx`:
```typescript
<img
  src="/manus-storage/logo-chip_1985749c.png"
  alt="Logo Leonardo A Verza"
  className="w-12 h-12 object-contain"
/>
```

## 🎨 Design

- **Paleta de Cores**: Azul corporativo profundo (#1e40af)
- **Tipografia**: Poppins (títulos) + Inter (corpo)
- **Tema**: Minimalismo corporativo moderno
- **Acessibilidade**: Contraste adequado, navegação intuitiva

## 📂 Estrutura do Projeto

```
catalogo-produtos-informatica/
├── client/
│   ├── public/           # Arquivos estáticos
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas (Home.tsx)
│   │   ├── App.tsx       # Componente raiz
│   │   ├── index.css     # Estilos globais
│   │   └── main.tsx      # Entrada React
│   └── index.html        # HTML principal
├── package.json          # Dependências
└── README.md             # Este arquivo
```

## 🌐 Publicar no GitHub

### 1. Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New"** para criar um novo repositório
3. Nome: `catalogo-produtos-informatica`
4. Descrição: "Catálogo web de produtos de informática"
5. Selecione **"Public"** para compartilhar publicamente
6. Clique em **"Create repository"**

### 2. Fazer Push do Código

```bash
# Navegue até o diretório do projeto
cd catalogo-produtos-informatica

# Inicialize o git (se não estiver já)
git init

# Adicione o repositório remoto
git remote add origin https://github.com/seu-usuario/catalogo-produtos-informatica.git

# Adicione todos os arquivos
git add .

# Crie o primeiro commit
git commit -m "Inicial: Catálogo de produtos de informática"

# Faça o push para o GitHub
git branch -M main
git push -u origin main
```

### 3. Habilitar GitHub Pages (Opcional)

Para publicar o site automaticamente:

1. Vá para **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Crie um arquivo `.github/workflows/deploy.yml`:

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

## 📝 Licença

MIT - Sinta-se livre para usar e modificar este projeto

## 👥 Autor

Desenvolvido para **Leonardo A Verza - LTDA**

## 🤝 Suporte

Para dúvidas ou sugestões, abra uma **Issue** no repositório GitHub.

---

**Versão**: 1.0.0  
**Última atualização**: Junho 2026
