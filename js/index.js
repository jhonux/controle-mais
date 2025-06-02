document.getElementById("form-transacao").addEventListener("submit", function (e) {
  e.preventDefault();

  const valorBruto = document.getElementById("valor").value;
  const valor = parseFloat(valorBruto.replace("R$", "").replace(",", "."));

  const dataInput = document.getElementById("data").value;
  const dataFormatada = dataInput.split("/").reverse().join("-"); // Converte de dd/mm/aaaa para aaaa-mm-dd

  const categoria = document.getElementById("categoria").value;
  const formaPagamento = document.getElementById("forma-pagamento").value;
  const descricao = document.getElementById("descricao").value;

  const payload = {
    valor: valor,
    data: dataFormatada, // Enviar como YYYY-MM-DD
    categoria: categoria,
    forma_pagamento: formaPagamento,
    descricao: descricao
  };

  fetch("https://apex.oracle.com/pls/apex/tb_produtos/transacoes/transacao", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ items: [payload] }) // Enviar com 'items'
  })
  .then(async response => {
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Detalhe do erro:", response.status, errorText);
      throw new Error("Erro ao enviar transação");
    }
    return response.json();
  })
  .then(data => {
    alert("Transação enviada com sucesso!");
    document.getElementById("form-transacao").reset();
  })
  .catch(error => {
    console.error("Erro ao enviar:", error);
    alert("Erro ao salvar transação. Verifique os dados e tente novamente.");
  });
});
