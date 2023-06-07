const clientes = [];
const produtos = [];
const taxaServico = {};

function adicionarCliente() {
  const clienteInput = document.getElementById("clienteInput");
  const cliente = clienteInput.value.trim();

  if (cliente !== "") {
    clientes.push(cliente);
    clienteInput.value = "";

    const clientesTable = document.getElementById("clientesTable");
    const newRow = clientesTable.insertRow(clientesTable.rows.length - 1);
    const cell = newRow.insertCell(0);
    cell.innerHTML = cliente;

    // Atualizar a lista de seleção de clientes para taxa de serviço
    const clienteSelect = document.getElementById("clienteSelect");
    const option = document.createElement("option");
    option.value = cliente;
    option.text = cliente;
    clienteSelect.add(option);
  }
}

function adicionarProduto() {
  const produtoInput = document.getElementById("produtoInput");
  const valorInput = document.getElementById("valorInput");
  const consumidoresInput = document.getElementById("consumidoresInput");

  const produto = produtoInput.value.trim();
  const valor = parseFloat(valorInput.value);
  const consumidores = consumidoresInput.value
    .trim()
    .split(",")
    .map(function (item) {
      return item.trim();
    });

  if (produto !== "" && !isNaN(valor) && consumidores.length > 0) {
    produtos.push({ consumidores, valor });
    produtoInput.value = "";
    valorInput.value = "";
    consumidoresInput.value = "";

    const produtosTable = document.getElementById("produtosTable");
    const newRow = produtosTable.insertRow(produtosTable.rows.length - 1);

    const produtoCell = newRow.insertCell(0);
    produtoCell.innerHTML = produto;

    const valorCell = newRow.insertCell(1);
    const valorFormatado = valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    valorCell.innerHTML = valorFormatado;

    const consumidoresCell = newRow.insertCell(2);
    consumidoresCell.innerHTML = consumidores.join(", ");
  }
}

function adicionarTaxaServico() {
  const clienteSelect = document.getElementById("clienteSelect");
  const taxaInput = document.getElementById("taxaInput");

  const cliente = clienteSelect.value;
  const taxa = parseFloat(taxaInput.value);

  if (cliente !== "" && !isNaN(taxa)) {
    taxaServico[cliente] = taxa;
    clienteSelect.value = "";
    taxaInput.value = "";

    const taxaServicoTable = document.getElementById("taxaServicoTable");
    const newRow = taxaServicoTable.insertRow(taxaServicoTable.rows.length - 1);

    const clienteCell = newRow.insertCell(0);
    clienteCell.innerHTML = cliente;

    const taxaCell = newRow.insertCell(1);
    taxaCell.innerHTML = taxa.toFixed(2);
  }
}
function calcularDivisao() {
  const resultadoTable = document.getElementById("resultadoTable");

  // Limpa a tabela de resultado
  while (resultadoTable.rows.length > 1) {
    resultadoTable.deleteRow(1);
  }

  const clienteSelect = document.getElementById("clienteSelect");
  const clientePagadorTaxa = clienteSelect.value;

  for (const cliente of clientes) {
    let valorTotal = 0;
    let taxaCliente = 0;

    for (const produto of produtos) {
      const { consumidores, valor } = produto;
      const numConsumidores = consumidores.length;

      if (consumidores.includes(cliente)) {
        const valorIndividual = valor / numConsumidores;
        valorTotal += valorIndividual;
      }
    }

    if (cliente in taxaServico) {
      taxaCliente = taxaServico[cliente];
    }

    const valorFinal = valorTotal + valorTotal * (taxaCliente / 100);

    const newRow = resultadoTable.insertRow(resultadoTable.rows.length);

    const clienteCell = newRow.insertCell(0);
    clienteCell.innerHTML = cliente;

    const valorFinalCell = newRow.insertCell(1);
    valorFinalCell.innerHTML = valorFinal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}
 