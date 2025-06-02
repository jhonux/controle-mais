const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Gastos ao longo do ano',
                    data: [500, 600, 700, 600, 800, 1000, 5000, 1500, 1000, 800, 600, 500],
                    borderColor: '#1a7c7a',
                    backgroundColor: 'rgba(26, 124, 122, 0.2)',
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 6000,
                        ticks: {
                            stepSize: 1500
                        }
                    }
                }
            }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://apex.oracle.com/pls/apex/tb_produtos/transacoes/transacao")
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector("#tabela-transacoes tbody");

      data.items.forEach(item => {
        const tr = document.createElement("tr");

        // Formatar data
        const dataFormatada = new Date(item.data).toLocaleDateString("pt-BR");

        // Formatar valor
        const valorFormatado = item.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        });

        tr.innerHTML = `
        <td>${dataFormatada}</td>
        <td>${item.descricao}</td>
        <td>${item.categoria}</td>
        <td>${valorFormatado}</td>
        `;

        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar dados:", error);
    });
});

