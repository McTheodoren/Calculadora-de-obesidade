function formatarAltura(input) {
    let altura = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (altura.length > 1) {
        altura = altura[0] + ',' + altura.slice(1);
    }
    input.value = altura;
}

function calcular() {
    const altura = parseFloat(document.getElementById('altura').value.replace(',', '.'));
    const pesoInicial = parseFloat(document.getElementById('pesoInicial').value);
    const pesoAtual = parseFloat(document.getElementById('pesoAtual').value);
    const pesoCirurgia = parseFloat(document.getElementById('pesoCirurgia').value);

    const pesoIdeal = 25 * (altura ** 2);
    const perdaTotal = pesoInicial - pesoAtual;
    const perdaCirurgia = pesoCirurgia - pesoAtual;
    const imcInicial = pesoInicial / (altura ** 2);
    const imcAtual = pesoAtual / (altura ** 2);
    const excessoPesoInicial = pesoInicial - pesoIdeal;
    const excessoPesoAtual = pesoAtual - pesoIdeal;
    const percentualExcessoPesoInicial = (excessoPesoInicial / pesoIdeal) * 100;
    const percentualExcessoPesoAtual = (excessoPesoAtual / pesoIdeal) * 100;
    const percentualExcessoPesoPerdido = ((excessoPesoInicial - excessoPesoAtual) / excessoPesoInicial) * 100;

    document.getElementById('resultado').innerHTML = `
        <p>Peso Ideal: ${pesoIdeal.toFixed(2)} kg</p>
        <p>Perda Total: ${perdaTotal.toFixed(2)} kg</p>
        <p>Perda da Cirurgia: ${perdaCirurgia.toFixed(2)} kg</p>
        <p>IMC Inicial: ${imcInicial.toFixed(2)}</p>
        <p>IMC Atual: ${imcAtual.toFixed(2)}</p>
        <p>% Excesso de Peso Inicial: ${percentualExcessoPesoInicial.toFixed(2)}%</p>
        <p>% Excesso de Peso Atual: ${percentualExcessoPesoAtual.toFixed(2)}%</p>
        <p>% Excesso de Peso Perdido: ${percentualExcessoPesoPerdido.toFixed(2)}%</p>
    `;
}

function copiarResultados() {
    const altura = document.getElementById('altura').value;
    const pesoInicial = document.getElementById('pesoInicial').value;
    const pesoAtual = document.getElementById('pesoAtual').value;
    const resultadosCalculados = document.getElementById('resultado').innerText;
    const textoCopiar =
        `Altura: ${altura} m\n` +
        `Peso Inicial: ${pesoInicial} kg\n` +
        `Peso Atual: ${pesoAtual} kg\n` +
        resultadosCalculados;

    navigator.clipboard.writeText(textoCopiar).then(() => {
        alert('Resultados copiados para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar para a área de transferência: ', err);
    });
}

function adicionarEventoEnter() {
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calcular();
        }
    });
}

// Adiciona o evento ao carregar a página
window.onload = adicionarEventoEnter;
