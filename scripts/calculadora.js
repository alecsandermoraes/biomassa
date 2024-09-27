import { data } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
    const result = document.getElementById('resultado');

    function calcEnergy(materialSelect, massSelect) {
        const e = data[materialSelect].poder * massSelect;
        return e / 860.4;
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

        if (materialSelect && !isNaN(massSelect)) {
            const energy = calcEnergy(materialSelect, massSelect);
            const times = calcTime(energy);

            result.innerHTML = `
                <p>A energia gerada por ${massSelect} kg de ${data[materialSelect].nome} é de <strong>${energy.toFixed(2)} kCal</strong>.</p>
                <p>Com essa energia, é possível manter uma lâmpada de LED ligada entre <strong>${times.lampada.max.toFixed(2)}</strong> e <strong>${times.lampada.min.toFixed(2)}</strong> horas.</p>
                <p>Também é possível manter uma casa simples abastecida entre <strong>${times.casa.max.toFixed(2)}</strong> e <strong>${times.casa.min.toFixed(2)}</strong> horas.</p>
            `;
        } else {
            result.innerHTML = `<p style="color: red;"> Por favor, insira uma quantidade válida de biomassa.</p>`
        }
    }
});