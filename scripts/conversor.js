const data = {
    quilowatt: (e) => [e * 1000 + ' Wh', e * 860.421 + ' Cal', e * 860421 + ' cal', e * 3600000 + ' J', e * 3600 + ' kJ', e * 3.6 + ' MJ'],
    watt: (e) => [e / 1000 + ' kWh', e / 1.16221 + ' Cal', e * 860.421 + ' cal', e * 3600 + ' J', e * 3.6 + ' kJ', e / 277.8 + ' MJ'],
    caloria: (e) => [e / 860.421 + ' Wh', e / 860421 + ' kWh', e / 1000 + ' Cal', e * 4.184 + ' J', e / 239 + ' kJ', e / 239000 + ' MJ'],
    quilocaloria: (e) => [e * 1.16221 + ' Wh', e / 860.421 + ' kWh', e * 1000 + ' cal', e * 4184 + ' J', e * 4.184 + ' kJ', e / 239 + ' MJ'],
    joule: (e) => [e / 3600 + ' Wh', e / 3600000 + ' kWh', e / 4184 + ' Cal', e / 4.184 + ' cal', e / 1000 + ' kJ', 1 / 1000000 + ' MJ'],
    quilojoule: (e) => [e / 3.6 + ' Wh', e / 3600 + ' kWh', e / 4.184 + ' Cal', e * 239 + ' cal', e * 1000 + ' J', e / 1000 + ' MJ'],
    megajoule: (e) => [e * 277.8 + ' Wh', e / 3.6 + ' kWh', e * 239 + ' Cal', e * 239000 + ' cal', e * 1000000 + ' J', e * 1000 + ' kJ'],
}

document.addEventListener('DOMContentLoaded', function() {
    const result = document.getElementById('resultado');

    window.Convert = function() {
        const quantity = document.getElementById('quantity').value;
        const energy = document.getElementById('energy').value;

        if (energy !== 'Unidade' && !isNaN(quantity)) {
            const e = data[energy](quantity);
            result.innerHTML = `
                <p>O valor inserido equivale a <strong>${e[0]}</strong>, <strong>${e[1]}</strong>, <strong>${e[2]}</strong>, <strong>${e[3]}</strong>, <strong>${e[4]}</strong> e <strong>${e[5]}</strong>
            `;
        } else {
            result.innerHTML = `<p style="color: red;">Por favor, insira uma quantidade válida de energia e selecione uma unidade de energia.</p>`;
        }
    }
});