let itens = [];

function adicionarItem() {

    const produto = document.getElementById("produto").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (produto === "") {
        alert("Digite o nome do produto ou serviço.");
        return;
    }

    if (quantidade <= 0) {
        alert("Digite uma quantidade válida.");
        return;
    }

    if (valor <= 0) {
        alert("Digite um valor válido.");
        return;
    }

    const item = {
        produto: produto,
        quantidade: quantidade,
        valor: valor
    };

    itens.push(item);

    atualizarTabela();

    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = 1;
    document.getElementById("valor").value = "";

    document.getElementById("produto").focus();
}


function atualizarTabela() {

    const lista = document.getElementById("listaItens");

    lista.innerHTML = "";

    itens.forEach(function(item, index) {

        const subtotal = item.quantidade * item.valor;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${item.produto}</td>

            <td>${item.quantidade}</td>

            <td>${formatarMoeda(item.valor)}</td>

            <td>${formatarMoeda(subtotal)}</td>

            <td>
                <button 
                    class="botao-excluir"
                    onclick="excluirItem(${index})">
                    Excluir
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });

    calcularTotal();
}


function excluirItem(index) {

    itens.splice(index, 1);

    atualizarTabela();
}


function calcularTotal() {

    let subtotal = 0;

    itens.forEach(function(item) {

        subtotal += item.quantidade * item.valor;

    });

    let porcentagemDesconto =
        Number(document.getElementById("desconto").value);

    if (porcentagemDesconto < 0) {
        porcentagemDesconto = 0;
    }

    if (porcentagemDesconto > 100) {
        porcentagemDesconto = 100;
    }

    const valorDesconto =
        subtotal * (porcentagemDesconto / 100);

    const total =
        subtotal - valorDesconto;

    document.getElementById("subtotal").textContent =
        formatarMoeda(subtotal);

    document.getElementById("valorDesconto").textContent =
        formatarMoeda(valorDesconto);

    document.getElementById("total").textContent =
        formatarMoeda(total);
}


function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}