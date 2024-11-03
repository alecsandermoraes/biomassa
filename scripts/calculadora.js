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

    function formatCO2(valueInKg) {
        if (valueInKg >= 1000) {
            return (valueInKg / 1000).toFixed(2) + ' toneladas';
        } else {
            return valueInKg.toFixed(2) + ' kg';
        }
    }

    function calcCO2Reduction(energyGenerated) {
        const emissionFactors = {
            coal: 820,
            gas: 490,
            diesel: 720,
        };

        const reduction = {
            coal: (emissionFactors.coal * energyGenerated) / 1000,
            gas: (emissionFactors.gas * energyGenerated) / 1000,
            diesel: (emissionFactors.diesel * energyGenerated) / 1000,
        };

        return {
            coal: formatCO2(reduction.coal),
            gas: formatCO2(reduction.gas),
            diesel: formatCO2(reduction.diesel),
        }
    }

    function formatEnergy(valueInKWh) {
        if (valueInKWh >= 1_000_000) {
            return (valueInKWh / 1_000_000).toFixed(2) + ' GWh';
        } else if (valueInKWh >= 1000) {
            return (valueInKWh / 1000).toFixed(2) + ' MWh';
        } else {
            return valueInKWh.toFixed(2) + ' kWh';
        }
    }

    function formatTime(valueInHours) {
        if (valueInHours >= 87600) {
            return (valueInHours / 87600).toFixed(2) + ' séculos';
        } else if (valueInHours >= 8760) {
            return (valueInHours / 8760).toFixed(2) + ' décadas';
        } else if (valueInHours >= 730) {
            return (valueInHours / 730).toFixed(2) + ' anos';
        } else if (valueInHours >= 24) {
            return (valueInHours / 24).toFixed(2) + ' meses';
        } else {
            return valueInHours.toFixed(2) + ' horas';
        }
    }

    window.Calc = function() {
        const materialSelect = document.getElementById('material').value;
        const massSelect = parseFloat(document.getElementById('quantity').value);
        const ctx = document.getElementById('energyChart').getContext('2d');

        const energy = calcEnergy(materialSelect, massSelect);
        const times = calcTime(energy);
        const reduction = calcCO2Reduction(energy);

        const formattedEnergy = formatEnergy(energy);
        const formattedLampMin = formatTime(times.lampada.min);
        const formattedLampMax = formatTime(times.lampada.max);
        const formattedCasaMin = formatTime(times.casa.min);
        const formattedCasaMax = formatTime(times.casa.max);

        const data2 = {
            labels: ['Grande Hotel', 'Empresa Média', 'Indústria de Grande Porte', `Energia de ${massSelect} kg de ${data[materialSelect].nome}`],
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
                            label: (context) => `${formatEnergy(context.raw)}`,
                        }
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => formatEnergy(value),
                        }
                    }
                }
            }
        };

        if (materialSelect && !isNaN(massSelect)) {
            result.innerHTML = `
                A energia gerada por ${massSelect} kg de ${data[materialSelect].nome} é de <strong>${formattedEnergy}</strong><br>
                Com essa energia, é possível manter uma lâmpada de LED ligada entre <strong>${formattedLampMin}</strong> e <strong>${formattedLampMax}</strong><br>
                Também é possível manter uma casa simples abastecida entre <strong>${formattedCasaMax}</strong> e <strong>${formattedCasaMin}</strong><br>

                <h1 style="margin-bottom: 20px; margin-top: 20px">Redução de Gases Poluentes</h1>
                Terá uma redução de <strong>${reduction.coal}</strong> de CO₂ na atmosfera, substituindo o uso do <strong>carvão</strong><br>
                Terá uma redução de <strong>${reduction.gas}</strong> de CO₂ na atmosfera, substituindo o uso do <strong>gás natural</strong><br>
                Terá uma redução de <strong>${reduction.diesel}</strong> de CO₂ na atmosfera, substituindo o uso do <strong>diesel</strong><br>

                <h1 style="margin-bottom: 20px; margin-top: 20px;">Consumo de Energia (kWh)</h1>
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