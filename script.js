// ============================================
// DADOS DA EMPRESA
// ============================================
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

// ============================================
// DADOS INICIAIS
// ============================================
let produtos = [
    {
        id: 1,
        nome: "Processador Intel Core i7-13700K",
        descricao: "16 núcleos, 24 threads, 5.4GHz max",
        marca: "Intel",
        modelo: "i7-13700K",
        link: "https://www.intel.com.br",
        categoria: "PROCESSADOR",
    },
    {
        id: 2,
        nome: "Placa Mãe ASUS ROG Strix Z790-E",
        descricao: "ATX, LGA1700, DDR5, PCIe 5.0",
        marca: "ASUS",
        modelo: "ROG Strix Z790-E",
        link: "https://www.asus.com.br",
        categoria: "PLACA MÃE",
    },
    {
        id: 3,
        nome: "SSD NVMe Samsung 990 Pro 1TB",
        descricao: "Leitura 7450MB/s, Escrita 6900MB/s",
        marca: "Samsung",
        modelo: "990 Pro",
        link: "https://www.samsung.com.br",
        categoria: "ARMAZENAMENTO",
    },
];

let proximoId = 4;
let idParaRemover = null;

// ============================================
// DOM ELEMENTOS
// ============================================
const tabelaBody = document.getElementById("tabelaBody");
const totalPecas = document.getElementById("totalPecas");
const anoAtual = document.getElementById("anoAtual");

// Modal Adicionar
const modalAdicionar = document.getElementById("modalAdicionar");
const btnAdicionar = document.getElementById("btnAdicionar");
const btnCancelar = document.getElementById("btnCancelar");
const modalFechar = document.getElementById("modalFechar");
const formAdicionar = document.getElementById("formAdicionar");

// Modal Remover
const modalRemover = document.getElementById("modalRemover");
const modalRemoverFechar = document.getElementById("modalRemoverFechar");
const btnRemoverCancelar = document.getElementById("btnRemoverCancelar");
const btnRemoverConfirmar = document.getElementById("btnRemoverConfirmar");

// Inputs
const inputNome = document.getElementById("inputNome");
const inputDescricao = document.getElementById("inputDescricao");
const inputMarca = document.getElementById("inputMarca");
const inputModelo = document.getElementById("inputModelo");
const inputLink = document.getElementById("inputLink");
const inputCategoria = document.getElementById("inputCategoria");

// Toast
const toastContainer = document.getElementById("toastContainer");

// ============================================
// FUNÇÕES
// ============================================

// Renderizar tabela
function renderizarTabela() {
    if (produtos.length === 0) {
        tabelaBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted" style="padding: 2rem;">
                    Nenhuma peça cadastrada. Clique em "Adicionar Peça" para começar.
                </td>
            </tr>
        `;
        totalPecas.textContent = "0";
        return;
    }

    let html = "";
    produtos.forEach((produto, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${escapeHtml(produto.nome)}</strong></td>
                <td>${escapeHtml(produto.descricao || "-")}</td>
                <td>${escapeHtml(produto.marca || "-")}</td>
                <td>${escapeHtml(produto.modelo || "-")}</td>
                <td class="link-cell">
                    ${produto.link ? `<a href="${escapeHtml(produto.link)}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Ver</a>` : "-"}
                </td>
                <td class="text-center">
                    <button class="btn-icon" onclick="confirmarRemocao(${produto.id})" title="Remover peça">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tabelaBody.innerHTML = html;
    totalPecas.textContent = produtos.length;
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Abrir modal de adicionar
function abrirModalAdicionar() {
    modalAdicionar.classList.add("active");
    inputNome.focus();
    document.body.style.overflow = "hidden";
}

// Fechar modal de adicionar
function fecharModalAdicionar() {
    modalAdicionar.classList.remove("active");
    formAdicionar.reset();
    document.body.style.overflow = "";
}

// Confirmar remoção
function confirmarRemocao(id) {
    idParaRemover = id;
    modalRemover.classList.add("active");
    document.body.style.overflow = "hidden";
}

// Fechar modal de remoção
function fecharModalRemover() {
    modalRemover.classList.remove("active");
    idParaRemover = null;
    document.body.style.overflow = "";
}

// Remover produto
function removerProduto() {
    if (idParaRemover === null) return;
    
    const produto = produtos.find(p => p.id === idParaRemover);
    produtos = produtos.filter(p => p.id !== idParaRemover);
    idParaRemover = null;
    
    renderizarTabela();
    fecharModalRemover();
    
    if (produto) {
        mostrarToast(`"${produto.nome}" foi removido do catálogo`, "success");
    }
}

// Adicionar produto
function adicionarProduto(event) {
    event.preventDefault();
    
    const nome = inputNome.value.trim();
    if (!nome) {
        mostrarToast("O campo 'Produto/Serviço' é obrigatório", "error");
        inputNome.focus();
        return;
    }

    const novoProduto = {
        id: proximoId++,
        nome: nome,
        descricao: inputDescricao.value.trim(),
        marca: inputMarca.value.trim(),
        modelo: inputModelo.value.trim(),
        link: inputLink.value.trim(),
        categoria: inputCategoria.value,
    };

    produtos.push(novoProduto);
    renderizarTabela();
    fecharModalAdicionar();
    mostrarToast(`"${novoProduto.nome}" adicionado ao catálogo`, "success");
}

// Mostrar toast
function mostrarToast(mensagem, tipo = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo}`;
    
    const icones = {
        success: "fas fa-check-circle",
        error: "fas fa-exclamation-circle",
        info: "fas fa-info-circle",
    };
    
    toast.innerHTML = `
        <i class="${icones[tipo] || icones.info}"></i>
        <span>${mensagem}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = "slideOutRight 0.3s ease-out forwards";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Ano atual no footer
anoAtual.textContent = new Date().getFullYear();

// Botão adicionar
btnAdicionar.addEventListener("click", abrirModalAdicionar);

// Fechar modal adicionar
modalFechar.addEventListener("click", fecharModalAdicionar);
btnCancelar.addEventListener("click", fecharModalAdicionar);

// Fechar modal adicionar clicando fora
modalAdicionar.addEventListener("click", (e) => {
    if (e.target === modalAdicionar) fecharModalAdicionar();
});

// Form adicionar
formAdicionar.addEventListener("submit", adicionarProduto);

// Fechar modal remover
modalRemoverFechar.addEventListener("click", fecharModalRemover);
btnRemoverCancelar.addEventListener("click", fecharModalRemover);

// Fechar modal remover clicando fora
modalRemover.addEventListener("click", (e) => {
    if (e.target === modalRemover) fecharModalRemover();
});

// Confirmar remoção
btnRemoverConfirmar.addEventListener("click", removerProduto);

// Fechar modais com ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (modalRemover.classList.contains("active")) {
            fecharModalRemover();
        } else if (modalAdicionar.classList.contains("active")) {
            fecharModalAdicionar();
        }
    }
});

// ============================================
// INICIALIZAÇÃO
// ============================================
renderizarTabela();