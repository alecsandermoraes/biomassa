import { data } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    const result = document.getElementById('resultado');
    let chartInstance;

    function calcEnergy(materialSelect, massSelect) {
        const e = data[materialSelect].poder * massSelect;
        return e / 860.421;
    }

    function calcTime(energy) {
        return {
            lampada: {
                min: energy / 5,
                max: energy / 20,
            },

            casa: {
                min: energy / 145.77,
                max: energy / 490.8,
            },
        }
    }

    window.Calc = function() {
        const materialSelect = document.getElementById('material').value;
        const massSelect = parseFloat(document.getElementById('quantity').value);
        const ctx = document.getElementById('energyChart').getContext('2d');

        const energy = calcEnergy(materialSelect, massSelect);
        const times = calcTime(energy);

        const data2 = {
            labels: ['Grande Hotel', 'Empresa Média', 'Indústria de Grande Porte', `${massSelect} kg de ${data[materialSelect].nome}`],
            datasets: [{
                label: 'Consumo de Energia (kWh)',
                data: [300000, 500000, 5000000, energy],
                backgroundColor: ['#A8E6CF', '#56C596', '#37966F', '#006644'],
                borderRadius: 5,
            }],
        };

        const config = {
            type: 'bar',
            data: data2,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },

                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.raw.toLocaleString()} kWh`,
                        }
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => value.toLocaleString() + ' kWh',
                        }
                    }
                }
            }
        };

        if (materialSelect && !isNaN(massSelect)) {
            result.innerHTML = `
                <p>A energia gerada por ${massSelect} kg de ${data[materialSelect].nome} é de <strong>${energy.toFixed(2)} kWh</strong>.</p>
                <p>Com essa energia, é possível manter uma lâmpada de LED ligada entre <strong>${times.lampada.max.toFixed(2)}</strong> e <strong>${times.lampada.min.toFixed(2)}</strong> horas.</p>
                <p>Também é possível manter uma casa simples abastecida entre <strong>${times.casa.max.toFixed(2)}</strong> e <strong>${times.casa.min.toFixed(2)}</strong> horas.</p>

                <h1 style="margin-bottom: 20px;">Consumo de Energia (kWh)</h1>
            `;

            if (chartInstance) {
                chartInstance.destroy();
            }

            chartInstance = new Chart(ctx, config);
        } else {
            result.innerHTML = `<p style="color: red;"> Por favor, insira uma quantidade válida de biomassa.</p>`
        }
    }
});