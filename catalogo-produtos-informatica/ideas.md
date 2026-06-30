# Ideias de Design - Catálogo de Produtos Leonardo A Verza

## Três Abordagens Estilísticas

### 1. **Minimalismo Corporativo Moderno**
Estética limpa e profissional, com foco em legibilidade e funcionalidade. Design grid-based com muito espaço em branco, tipografia sans-serif clara, e acentos em azul corporativo. Transmite confiabilidade e eficiência.
**Probabilidade:** 0.08

### 2. **Brutalismo Digital com Acentos Quentes**
Design ousado e direto, com bordas retas, tipografia pesada, e contraste alto. Fundo escuro com acentos em laranja/dourado. Transmite força, modernidade e inovação tecnológica.
**Probabilidade:** 0.06

### 3. **Elegância Técnica com Padrões Sutis**
Combinação de refinamento visual com elementos técnicos. Fundo branco com padrões geométricos sutis, tipografia elegante, e paleta azul-cinza. Transmite profissionalismo e sofisticação.
**Probabilidade:** 0.07

---

## Abordagem Escolhida: **Minimalismo Corporativo Moderno**

### Design Movement
Modernismo corporativo contemporâneo com influências de design de sistemas (design systems thinking).

### Core Principles
1. **Clareza Total**: Cada elemento tem propósito claro; informação hierarquizada e fácil de escanear
2. **Funcionalidade Elegante**: Beleza emerge da eficiência, não da decoração
3. **Acessibilidade Integrada**: Contraste adequado, tipografia legível, navegação intuitiva
4. **Escalabilidade**: Design que funciona para 10 ou 1000 produtos sem perder coerência

### Color Philosophy
- **Primária**: Azul corporativo profundo (`#1e40af`) - confiança, estabilidade, tecnologia
- **Secundária**: Cinza neutro (`#6b7280`) - equilíbrio, profissionalismo
- **Acentos**: Verde suave (`#10b981`) para ações positivas (adicionar), Vermelho suave (`#ef4444`) para ações destrutivas (remover)
- **Fundo**: Branco puro com bordas cinza-claro para definição
- **Intenção Emocional**: Transmitir confiança, competência e modernidade

### Layout Paradigm
- **Cabeçalho**: Faixa horizontal com logo, nome da empresa e informações essenciais
- **Corpo Principal**: Tabela responsiva com colunas bem definidas, sem excesso de linhas
- **Rodapé**: Faixa com informações de contato, CNPJ, endereço - espelhando o cabeçalho
- **Ações**: Botões flutuantes ou integrados na tabela para adicionar/remover peças

### Signature Elements
1. **Bordas Limpas**: Linhas cinza-claro definindo seções, sem sombras pesadas
2. **Tipografia Hierárquica**: Títulos em peso 700, corpo em peso 400, subtítulos em 500
3. **Ícones Funcionais**: Ícones simples de lucide-react para ações (plus, trash, edit)

### Interaction Philosophy
- **Hover States**: Linhas de tabela com fundo cinza-claro ao passar o mouse
- **Feedback Imediato**: Toast notifications para ações (adicionado/removido com sucesso)
- **Transições Suaves**: 150-200ms para hover e mudanças de estado
- **Confirmação**: Diálogo simples antes de remover peças (prevenção de acidentes)

### Animation
- **Entrada**: Fade-in suave (200ms) para elementos ao carregar
- **Hover**: Mudança de cor de fundo (150ms ease-out) em linhas da tabela
- **Adição**: Slide-in da nova linha (200ms) com fade-in
- **Remoção**: Fade-out (150ms) antes de remover da DOM
- **Respeito**: Honrar `prefers-reduced-motion` para usuários que preferem menos movimento

### Typography System
- **Display/Títulos**: Poppins Bold 700 (32px para main title, 24px para seções)
- **Corpo**: Inter Regular 400 (16px para tabela, 14px para labels)
- **Subtítulos**: Inter Medium 500 (18px para cabeçalhos de coluna)
- **Hierarquia**: Títulos em azul escuro, corpo em cinza-escuro, labels em cinza-médio

### Brand Essence
**Positioning**: Solução profissional e confiável para gestão de catálogos de informática, feita para empresas que valorizam eficiência e clareza.
**Personalidade**: Confiável, Moderno, Eficiente

### Brand Voice
Comunicação direta, sem floreios. Foco em ação e clareza.
- **Exemplo 1**: "Adicionar Peça" (não "Clique para adicionar uma nova peça ao catálogo")
- **Exemplo 2**: "Remover" (não "Deseja realmente remover este item?", mas sim "Tem certeza? Esta ação não pode ser desfeita")

### Wordmark & Logo
Logo conceitual: Um símbolo geométrico representando um circuito ou chip de computador, em azul corporativo, sem texto. Será gerado como PNG com fundo transparente.

### Signature Brand Color
**Azul Corporativo**: `#1e40af` (oklch equivalente: `oklch(0.42 0.18 253)`) - cor que define toda a paleta e transmite confiabilidade tecnológica.

---

## Implementação
Este design será implementado com:
- **Framework**: React 19 + Tailwind CSS 4
- **Componentes**: shadcn/ui para consistência
- **Ícones**: lucide-react para ações
- **Tipografia**: Poppins (títulos) + Inter (corpo) via Google Fonts
- **Responsividade**: Mobile-first, com breakpoints para tablet e desktop
