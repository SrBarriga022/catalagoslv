import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, AlertCircle, Edit2, Printer, Settings } from "lucide-react";
import { toast } from "sonner";

interface Produto {
  id: string;
  item: string;
  produto: string;
  descricao: string;
  marca: string;
  modelo: string;
  link: string;
}

interface DadosEmpresa {
  nome: string;
  cnpj: string;
  ie: string;
  endereco: string;
  cep: string;
  telefone: string;
  email1: string;
  email2?: string;
  logoUrl?: string;
}

interface CabecalhoTabela {
  item: string;
  produto: string;
  descricao: string;
  marca: string;
  modelo: string;
  link: string;
}

const EMPRESAS: Record<string, DadosEmpresa> = {
  "leonardo-ltda": {
    nome: "LEONARDO A VERZA - LTDA",
    cnpj: "07.460.912/0002-76",
    ie: "258.870.222",
    endereco: "Rua Pedro Mazurechen, 133",
    cep: "89.400-000 - Porto Uniao-SC",
    telefone: "(42) 3523-2535",
    email1: "lvinformaticafilial@gmail.com",
    email2: "lvlicitacaofilial@gmail.com",
    logoUrl: "https://ibb.co/kgw887qQ",
  },
  "leonardo": {
    nome: "LEONARDO A VERZA - LTDA",
    cnpj: "07.460.912.0001-95",
    ie: "90353529-69",
    endereco: "Rua Gabriel Ferreira, 11",
    cep: "85.170-000 - Pinhão-PR",
    telefone: "(42) 3677-1386",
    email1: "lvlicitacao@gmail.com",
    logoUrl: "https://ibb.co/kgw887qQ",
  },
  "rosemara": {
    nome: "ROSEMARA DOS SANTOS",
    cnpj: "26.947.090/0001-16",
    ie: "261606670",
    endereco: "Rua Pedro Mazurechen, 133, Sala 03, Bairro: São Pedro",
    cep: "89.400-000 - Porto União - SC",
    telefone: "(42) 3677-2737",
    email1: "rstecnolog@gmail.com",
    email2: "rslicitacao3@gmail.com",
    logoUrl: "/manus-storage/logo-chip_1985749c.png",
  },
};

const CATEGORIAS_PADRAO = [
  "PROCESSADOR",
  "PLACA MAE",
  "ARMAZENAMENTO",
  "MEMORIA",
  "FONTE",
  "GABINETE",
  "LICENCA",
  "MICROSOFT",
  "TECLADO",
  "MOUSE",
  "CAIXA DE SOM",
  "MONITOR",
];

const CABECALHO_PADRAO: CabecalhoTabela = {
  item: "ITEM",
  produto: "PRODUTO/SERVICO",
  descricao: "DESCRICAO TECNICA",
  marca: "MARCA",
  modelo: "MODELO",
  link: "LINK PARA CONFERENCIA",
};

export default function Home() {
  const [empresaSelecionada, setEmpresaSelecionada] = useState<string>("leonardo-ltda");
  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>(
    EMPRESAS["leonardo-ltda"]
  );
  const [dadosEmpresaEdicao, setDadosEmpresaEdicao] = useState<DadosEmpresa>(
    EMPRESAS["leonardo-ltda"]
  );

  const [produtos, setProdutos] = useState<Produto[]>(
    CATEGORIAS_PADRAO.map((cat, idx) => ({
      id: `${idx}`,
      item: `${idx + 1}`,
      produto: cat,
      descricao: "",
      marca: "",
      modelo: "",
      link: "",
    }))
  );

  const [tituloCatalogo, setTituloCatalogo] = useState("Pecas e Componentes");
  const [tituloEdicao, setTituloEdicao] = useState("Pecas e Componentes");

  const [cabecalhoTabela, setCabecalhoTabela] = useState<CabecalhoTabela>(CABECALHO_PADRAO);
  const [cabecalhoEdicao, setCabecalhoEdicao] = useState<CabecalhoTabela>(CABECALHO_PADRAO);

  const [novoItem, setNovoItem] = useState<Partial<Produto>>({
    produto: "",
    descricao: "",
    marca: "",
    modelo: "",
    link: "",
  });

  const [dialogAberto, setDialogAberto] = useState(false);
  const [itemParaRemover, setItemParaRemover] = useState<string | null>(null);
  const [dialogRemocaoAberto, setDialogRemocaoAberto] = useState(false);
  const [itemParaEditar, setItemParaEditar] = useState<Produto | null>(null);
  const [dialogEdicaoAberto, setDialogEdicaoAberto] = useState(false);
  const [dialogConfigAberto, setDialogConfigAberto] = useState(false);
  const [dialogTituloAberto, setDialogTituloAberto] = useState(false);
  const [dialogCabecalhoAberto, setDialogCabecalhoAberto] = useState(false);

  const mudarEmpresa = (empresaId: string) => {
    setEmpresaSelecionada(empresaId);
    const novaEmpresa = EMPRESAS[empresaId];
    setDadosEmpresa(novaEmpresa);
    setDadosEmpresaEdicao(novaEmpresa);
    toast.success(`Empresa alterada para ${novaEmpresa.nome}`);
  };

  const adicionarProduto = () => {
    if (!novoItem.produto?.trim()) {
      toast.error("Digite o nome do produto");
      return;
    }

    const novoProduto: Produto = {
      id: Date.now().toString(),
      item: (produtos.length + 1).toString(),
      produto: novoItem.produto || "",
      descricao: novoItem.descricao || "",
      marca: novoItem.marca || "",
      modelo: novoItem.modelo || "",
      link: novoItem.link || "",
    };

    setProdutos([...produtos, novoProduto]);
    setNovoItem({
      produto: "",
      descricao: "",
      marca: "",
      modelo: "",
      link: "",
    });
    setDialogAberto(false);
    toast.success("Peca adicionada com sucesso!");
  };

  const salvarEdicao = () => {
    if (!itemParaEditar) return;
    if (!itemParaEditar.produto?.trim()) {
      toast.error("Digite o nome do produto");
      return;
    }

    const novosProdutos = produtos.map((p) =>
      p.id === itemParaEditar.id ? itemParaEditar : p
    );
    setProdutos(novosProdutos);
    setDialogEdicaoAberto(false);
    setItemParaEditar(null);
    toast.success("Peca atualizada com sucesso!");
  };

  const salvarConfiguracao = () => {
    setDadosEmpresa(dadosEmpresaEdicao);
    setDialogConfigAberto(false);
    toast.success("Informacoes da empresa atualizadas!");
  };

  const salvarTitulo = () => {
    setTituloCatalogo(tituloEdicao);
    setDialogTituloAberto(false);
    toast.success("Titulo atualizado!");
  };

  const salvarCabecalho = () => {
    setCabecalhoTabela(cabecalhoEdicao);
    setDialogCabecalhoAberto(false);
    toast.success("Cabecalho da tabela atualizado!");
  };

  const removerProduto = (id: string) => {
    const novosProdutos = produtos
      .filter((p) => p.id !== id)
      .map((p, idx) => ({
        ...p,
        item: (idx + 1).toString(),
      }));
    setProdutos(novosProdutos);
    setDialogRemocaoAberto(false);
    setItemParaRemover(null);
    toast.success("Peca removida com sucesso!");
  };

  const abrirDialogRemocao = (id: string) => {
    setItemParaRemover(id);
    setDialogRemocaoAberto(true);
  };

  const abrirDialogEdicao = (produto: Produto) => {
    setItemParaEditar({ ...produto });
    setDialogEdicaoAberto(true);
  };

  const imprimirPagina = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* CABECALHO */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container py-6">
          {/* Seletor de Empresa */}
          <div className="mb-4 flex items-center gap-3 print:hidden">
            <label className="text-sm font-medium text-foreground">
              Selecione a Empresa:
            </label>
            <Select value={empresaSelecionada} onValueChange={mudarEmpresa}>
              <SelectTrigger className="w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leonardo-ltda">
                  Leonardo A Verza - LTDA (Porto União-SC)
                </SelectItem>
                <SelectItem value="leonardo">
                  Leonardo A Verza - LTDA (Pinhão-PR)
                </SelectItem>
                <SelectItem value="rosemara">
                  Rosemara dos Santos
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start justify-between gap-6 mb-4">
            <div className="flex-shrink-0">
              {dadosEmpresa.logoUrl ? (
                <img
                  src={dadosEmpresa.logoUrl}
                  alt="Logo da Empresa"
                  className="w-24 h-24 object-contain"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500 text-center p-2">
                  Sem Logo
                </div>
              )}
            </div>
            <div className="flex-1 text-right">
              <h1 className="text-2xl font-bold text-primary mb-1">
                {dadosEmpresa.nome}
              </h1>
              <div className="text-sm text-foreground space-y-0.5">
                <p><strong>CNPJ:</strong> {dadosEmpresa.cnpj}</p>
                <p><strong>Inscricao Estadual:</strong> {dadosEmpresa.ie}</p>
                <p><strong>Endereco:</strong> {dadosEmpresa.endereco}</p>
                <p><strong>CEP:</strong> {dadosEmpresa.cep}</p>
              </div>
              <div className="text-sm text-foreground mt-2 space-y-0.5">
                <p><strong>Tel:</strong> {dadosEmpresa.telefone}</p>
                <p><strong>Email:</strong> <a href={`mailto:${dadosEmpresa.email1}`} className="text-primary hover:underline">{dadosEmpresa.email1}</a></p>
                {dadosEmpresa.email2 && (
                  <p><strong>Email:</strong> <a href={`mailto:${dadosEmpresa.email2}`} className="text-primary hover:underline">{dadosEmpresa.email2}</a></p>
                )}
              </div>
            </div>
            <Dialog open={dialogConfigAberto} onOpenChange={setDialogConfigAberto}>
              <DialogTrigger asChild>
                <button
                  className="p-2 text-primary hover:bg-primary/10 rounded transition-colors duration-150"
                  title="Editar informacoes da empresa"
                >
                  <Settings size={20} />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Editar Informacoes da Empresa</DialogTitle>
                  <DialogDescription>
                    Atualize os dados que aparecerao no cabecalho e rodape
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Logo da Empresa
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      {dadosEmpresaEdicao.logoUrl ? (
                        <img
                          src={dadosEmpresaEdicao.logoUrl}
                          alt="Logo"
                          className="w-16 h-16 object-contain border border-border rounded p-1"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                          Sem Logo
                        </div>
                      )}
                      <Input
                        type="text"
                        placeholder="Cole a URL da logo aqui"
                        value={dadosEmpresaEdicao.logoUrl || ""}
                        onChange={(e) =>
                          setDadosEmpresaEdicao({
                            ...dadosEmpresaEdicao,
                            logoUrl: e.target.value,
                          })
                        }
                        className="mt-0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Nome da Empresa
                    </label>
                    <Input
                      value={dadosEmpresaEdicao.nome}
                      onChange={(e) =>
                        setDadosEmpresaEdicao({
                          ...dadosEmpresaEdicao,
                          nome: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        CNPJ
                      </label>
                      <Input
                        value={dadosEmpresaEdicao.cnpj}
                        onChange={(e) =>
                          setDadosEmpresaEdicao({
                            ...dadosEmpresaEdicao,
                            cnpj: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Inscricao Estadual
                      </label>
                      <Input
                        value={dadosEmpresaEdicao.ie}
                        onChange={(e) =>
                          setDadosEmpresaEdicao({
                            ...dadosEmpresaEdicao,
                            ie: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Endereco
                    </label>
                    <Input
                      value={dadosEmpresaEdicao.endereco}
                      onChange={(e) =>
                        setDadosEmpresaEdicao({
                          ...dadosEmpresaEdicao,
                          endereco: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      CEP
                    </label>
                    <Input
                      value={dadosEmpresaEdicao.cep}
                      onChange={(e) =>
                        setDadosEmpresaEdicao({
                          ...dadosEmpresaEdicao,
                          cep: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Telefone
                      </label>
                      <Input
                        value={dadosEmpresaEdicao.telefone}
                        onChange={(e) =>
                          setDadosEmpresaEdicao({
                            ...dadosEmpresaEdicao,
                            telefone: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Email 1
                    </label>
                    <Input
                      value={dadosEmpresaEdicao.email1}
                      onChange={(e) =>
                        setDadosEmpresaEdicao({
                          ...dadosEmpresaEdicao,
                          email1: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Email 2 (Opcional)
                    </label>
                    <Input
                      value={dadosEmpresaEdicao.email2 || ""}
                      onChange={(e) =>
                        setDadosEmpresaEdicao({
                          ...dadosEmpresaEdicao,
                          email2: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDadosEmpresaEdicao(dadosEmpresa);
                      setDialogConfigAberto(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={salvarConfiguracao}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>


        </div>
      </header>



      {/* CONTEUDO PRINCIPAL */}
      <main className="container flex-1 py-8">
        {/* Botoes de Acao */}
        <div className="mb-6 flex justify-between items-center flex-wrap gap-4 print:hidden">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">
              {tituloCatalogo}
            </h2>
            <Dialog open={dialogTituloAberto} onOpenChange={setDialogTituloAberto}>
              <DialogTrigger asChild>
                <button
                  className="p-1 text-primary hover:bg-primary/10 rounded transition-colors duration-150"
                  title="Editar titulo"
                >
                  <Edit2 size={16} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Titulo do Catalogo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Titulo
                    </label>
                    <Input
                      value={tituloEdicao}
                      onChange={(e) => setTituloEdicao(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setDialogTituloAberto(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={salvarTitulo}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={imprimirPagina}
              variant="outline"
              className="gap-2"
            >
              <Printer size={18} />
              Imprimir
            </Button>
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-accent hover:bg-accent/90">
                  <Plus size={18} />
                  Adicionar Peca
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Peca</DialogTitle>
                  <DialogDescription>
                    Preencha os dados da nova peca para adicionar ao catalogo
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Produto/Servico *
                    </label>
                    <Input
                      placeholder="Ex: PROCESSADOR"
                      value={novoItem.produto || ""}
                      onChange={(e) =>
                        setNovoItem({ ...novoItem, produto: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Descricao Tecnica
                    </label>
                    <Textarea
                      placeholder="Ex: Intel Core i7 12a Geracao&#10;Frequencia: 3.2 GHz&#10;Cache: 25 MB"
                      value={novoItem.descricao || ""}
                      onChange={(e) =>
                        setNovoItem({ ...novoItem, descricao: e.target.value })
                      }
                      className="mt-1 min-h-24"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Marca
                      </label>
                      <Input
                        placeholder="Ex: Intel"
                        value={novoItem.marca || ""}
                        onChange={(e) =>
                          setNovoItem({ ...novoItem, marca: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Modelo
                      </label>
                      <Input
                        placeholder="Ex: i7-12700K"
                        value={novoItem.modelo || ""}
                        onChange={(e) =>
                          setNovoItem({ ...novoItem, modelo: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Link para Conferencia
                    </label>
                    <Input
                      placeholder="https://..."
                      value={novoItem.link || ""}
                      onChange={(e) =>
                        setNovoItem({ ...novoItem, link: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setDialogAberto(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={adicionarProduto}
                    className="bg-accent hover:bg-accent/90"
                  >
                    Adicionar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* TITULO PARA IMPRESSAO */}
        <h2 className="hidden print:block text-2xl font-bold text-foreground mb-4">
          {tituloCatalogo}
        </h2>

        {/* TABELA */}
        <div className="border border-border rounded-xl overflow-hidden shadow-sm print:border-0 print:shadow-none print:rounded-none" style={{ borderWidth: '0.5px' }}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100 print:bg-blue-200">
                  <th className="border border-border font-bold text-foreground text-xs print:text-xs print:p-2 p-3 text-left">
                    <div className="flex items-center justify-between gap-2">
                      {cabecalhoTabela.item}
                      <Dialog open={dialogCabecalhoAberto} onOpenChange={setDialogCabecalhoAberto}>
                        <DialogTrigger asChild>
                          <button
                            className="p-1 text-primary hover:bg-white/50 rounded transition-colors duration-150 print:hidden"
                            title="Editar cabecalho"
                          >
                            <Edit2 size={14} />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Cabecalho da Tabela</DialogTitle>
                            <DialogDescription>
                              Customize os nomes das colunas
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="text-sm font-medium text-foreground">
                                ITEM
                              </label>
                              <Input
                                value={cabecalhoEdicao.item}
                                onChange={(e) =>
                                  setCabecalhoEdicao({
                                    ...cabecalhoEdicao,
                                    item: e.target.value,
                                  })
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">
                                PRODUTO/SERVICO
                              </label>
                              <Input
                                value={cabecalhoEdicao.produto}
                                onChange={(e) =>
                                  setCabecalhoEdicao({
                                    ...cabecalhoEdicao,
                                    produto: e.target.value,
                                  })
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">
                                DESCRICAO TECNICA
                              </label>
                              <Input
                                value={cabecalhoEdicao.descricao}
                                onChange={(e) =>
                                  setCabecalhoEdicao({
                                    ...cabecalhoEdicao,
                                    descricao: e.target.value,
                                  })
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">
                                MARCA
                              </label>
                              <Input
                                value={cabecalhoEdicao.marca}
                                onChange={(e) =>
                                  setCabecalhoEdicao({
                                    ...cabecalhoEdicao,
                                    marca: e.target.value,
                                  })
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">
                                MODELO
                              </label>
                              <Input
                                value={cabecalhoEdicao.modelo}
                                onChange={(e) =>
                                  setCabecalhoEdicao({
                                    ...cabecalhoEdicao,
                                    modelo: e.target.value,
                                  })
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">
                                LINK PARA CONFERENCIA
                              </label>
                              <Input
                                value={cabecalhoEdicao.link}
                                onChange={(e) =>
                                  setCabecalhoEdicao({
                                    ...cabecalhoEdicao,
                                    link: e.target.value,
                                  })
                                }
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setCabecalhoEdicao(cabecalhoTabela);
                                setDialogCabecalhoAberto(false);
                              }}
                            >
                              Cancelar
                            </Button>
                            <Button
                              onClick={salvarCabecalho}
                              className="bg-primary hover:bg-primary/90"
                            >
                              Salvar
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </th>
                  <th className="border border-border font-bold text-foreground text-xs print:text-xs print:p-2 p-3 text-left">
                    {cabecalhoTabela.produto}
                  </th>
                  <th className="border border-border font-bold text-foreground min-w-64 text-xs print:text-xs print:p-2 p-3 text-left">
                    {cabecalhoTabela.descricao}
                  </th>
                  <th className="border border-border font-bold text-foreground text-xs print:text-xs print:p-2 p-3 text-left">
                    {cabecalhoTabela.marca}
                  </th>
                  <th className="border border-border font-bold text-foreground text-xs print:text-xs print:p-2 p-3 text-left">
                    {cabecalhoTabela.modelo}
                  </th>
                  <th className="border border-border font-bold text-foreground text-xs print:text-xs print:p-2 p-3 text-left">
                    {cabecalhoTabela.link}
                  </th>
                  <th className="w-24 font-bold text-foreground text-center text-xs print:hidden p-3">
                    ACOES
                  </th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr
                    key={produto.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors duration-150 print:border-gray-300"
                  >
                    <td className="border border-border font-medium text-foreground text-xs print:text-xs print:p-2 p-3">
                      {produto.item}
                    </td>
                    <td className="border border-border font-medium text-foreground text-xs print:text-xs print:p-2 p-3">
                      {produto.produto}
                    </td>
                    <td className="border border-border text-foreground text-xs whitespace-pre-wrap break-words max-w-64 print:text-xs print:p-2 p-3">
                      {produto.descricao || "-"}
                    </td>
                    <td className="border border-border text-foreground text-xs print:text-xs print:p-2 p-3">
                      {produto.marca || "-"}
                    </td>
                    <td className="border border-border text-foreground text-xs print:text-xs print:p-2 p-3">
                      {produto.modelo || "-"}
                    </td>
                    <td className="border border-border text-xs print:text-xs print:p-2 p-3">
                      {produto.link ? (
                        <a
                          href={produto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                          title={produto.link}
                        >
                          (LINK)
                        </a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="text-center print:hidden p-3">
                      <div className="flex gap-1 justify-center">
                        <Dialog
                          open={
                            dialogEdicaoAberto &&
                            itemParaEditar?.id === produto.id
                          }
                          onOpenChange={(aberto) => {
                            if (!aberto) {
                              setDialogEdicaoAberto(false);
                              setItemParaEditar(null);
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <button
                              onClick={() => abrirDialogEdicao(produto)}
                              className="inline-flex items-center justify-center p-2 text-primary hover:bg-primary/10 rounded transition-colors duration-150"
                              title="Editar peca"
                            >
                              <Edit2 size={16} />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Peca</DialogTitle>
                              <DialogDescription>
                                Atualize os dados da peca
                              </DialogDescription>
                            </DialogHeader>
                            {itemParaEditar && (
                              <div className="space-y-4 py-4">
                                <div>
                                  <label className="text-sm font-medium text-foreground">
                                    Produto/Servico *
                                  </label>
                                  <Input
                                    placeholder="Ex: PROCESSADOR"
                                    value={itemParaEditar.produto || ""}
                                    onChange={(e) =>
                                      setItemParaEditar({
                                        ...itemParaEditar,
                                        produto: e.target.value,
                                      })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-foreground">
                                    Descricao Tecnica
                                  </label>
                                  <Textarea
                                    placeholder="Ex: Intel Core i7 12a Geracao&#10;Frequencia: 3.2 GHz"
                                    value={itemParaEditar.descricao || ""}
                                    onChange={(e) =>
                                      setItemParaEditar({
                                        ...itemParaEditar,
                                        descricao: e.target.value,
                                      })
                                    }
                                    className="mt-1 min-h-24"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-foreground">
                                      Marca
                                    </label>
                                    <Input
                                      placeholder="Ex: Intel"
                                      value={itemParaEditar.marca || ""}
                                      onChange={(e) =>
                                        setItemParaEditar({
                                          ...itemParaEditar,
                                          marca: e.target.value,
                                        })
                                      }
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-foreground">
                                      Modelo
                                    </label>
                                    <Input
                                      placeholder="Ex: i7-12700K"
                                      value={itemParaEditar.modelo || ""}
                                      onChange={(e) =>
                                        setItemParaEditar({
                                          ...itemParaEditar,
                                          modelo: e.target.value,
                                        })
                                      }
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-foreground">
                                    Link para Conferencia
                                  </label>
                                  <Input
                                    placeholder="https://..."
                                    value={itemParaEditar.link || ""}
                                    onChange={(e) =>
                                      setItemParaEditar({
                                        ...itemParaEditar,
                                        link: e.target.value,
                                      })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            )}
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setDialogEdicaoAberto(false);
                                  setItemParaEditar(null);
                                }}
                              >
                                Cancelar
                              </Button>
                              <Button
                                onClick={salvarEdicao}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Salvar
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog
                          open={
                            dialogRemocaoAberto &&
                            itemParaRemover === produto.id
                          }
                          onOpenChange={(aberto) => {
                            if (!aberto) {
                              setDialogRemocaoAberto(false);
                              setItemParaRemover(null);
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <button
                              onClick={() => abrirDialogRemocao(produto.id)}
                              className="inline-flex items-center justify-center p-2 text-destructive hover:bg-destructive/10 rounded transition-colors duration-150"
                              title="Remover peca"
                            >
                              <Trash2 size={16} />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2 text-destructive">
                                <AlertCircle size={20} />
                                Confirmar Remocao
                              </DialogTitle>
                              <DialogDescription>
                                Tem certeza que deseja remover{" "}
                                <strong>{produto.produto}</strong>? Esta acao
                                nao pode ser desfeita.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-2 justify-end pt-4">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setDialogRemocaoAberto(false);
                                  setItemParaRemover(null);
                                }}
                              >
                                Cancelar
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => removerProduto(produto.id)}
                              >
                                Remover
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {produtos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Nenhuma peca adicionada ainda
            </p>
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-accent hover:bg-accent/90">
                  <Plus size={18} />
                  Adicionar Primeira Peca
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </main>

      {/* RODAPE */}
      <footer className="border-t border-border bg-muted/20 mt-12 print:border-t print:border-gray-400 print:bg-white print:mt-8">
        <div className="container py-8 print:py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 print:gap-4 print:mb-4 print:text-xs">
            <div>
              <h3 className="font-bold text-foreground mb-2 print:mb-1">
                Empresa
              </h3>
              <p className="text-sm text-foreground print:text-xs">
                {dadosEmpresa.nome}
              </p>
              <p className="text-sm text-foreground print:text-xs">
                CNPJ: {dadosEmpresa.cnpj}
              </p>
              <p className="text-sm text-foreground print:text-xs">
                IE: {dadosEmpresa.ie}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2 print:mb-1">
                Endereco
              </h3>
              <p className="text-sm text-foreground print:text-xs">
                {dadosEmpresa.endereco}
              </p>
              <p className="text-sm text-foreground print:text-xs">
                CEP: {dadosEmpresa.cep}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2 print:mb-1">
                Contato
              </h3>
              <p className="text-sm text-foreground print:text-xs">
                Tel: {dadosEmpresa.telefone}
              </p>
              <p className="text-sm text-foreground print:text-xs">
                {dadosEmpresa.email1}
              </p>
              {dadosEmpresa.email2 && (
                <p className="text-sm text-foreground print:text-xs">
                  {dadosEmpresa.email2}
                </p>
              )}
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground print:border-t print:border-gray-400 print:pt-3 print:text-xs">
            <p>
              Copyright {new Date().getFullYear()} {dadosEmpresa.nome}. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ESTILOS PARA IMPRESSAO */}
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body {
            background: white;
            margin: 0;
            padding: 20px;
          }
          
          header {
            position: static !important;
            margin-bottom: 20px;
            page-break-after: avoid;
            text-align: center;
          }
          
          main {
            padding: 20px !important;
            max-width: 100%;
            margin: 0 auto;
          }
          
          .overflow-x-auto {
            overflow: visible !important;
          }
          
          .border.border-border.rounded-xl {
            border-radius: 12px !important;
            border: 2px solid #000 !important;
            overflow: hidden;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: auto;
            border-radius: 12px;
            overflow: hidden;
          }
          
          thead {
            display: table-header-group;
            page-break-after: avoid;
          }
          
          tbody tr {
            page-break-inside: auto;
            height: auto;
            border: 1px solid #999;
          }
          
          td, th {
            border: 0.5px solid #999 !important;
            padding: 18px 12px !important;
            text-align: left;
            font-size: 11px;
            line-height: 1.8;
            word-wrap: break-word;
            white-space: normal;
            vertical-align: top;
          }
          
          th {
            background-color: #ADD8E6 !important;
            font-weight: normal !important;
            color: #000 !important;
            padding: 15px 12px !important;
            border: 0.5px solid #999 !important;
          }
          
          tbody tr {
            border: 0.5px solid #999 !important;
            page-break-inside: avoid;
          }
          
          tr:nth-child(even) {
            background-color: #ffffff !important;
          }
          
          tr:nth-child(odd) {
            background-color: #ffffff !important;
          }
          
          footer {
            margin-top: 30px;
            page-break-before: avoid;
            border-top: 1px solid #999;
            padding-top: 20px;
            text-align: center;
          }
          
          a {
            color: #0066cc;
            text-decoration: underline;
          }
          
          @page {
            size: auto;
            margin: 10mm;
          }
        }
      `}</style>
    </div>
  );
}
