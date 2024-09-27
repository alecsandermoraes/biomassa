const ctx = document.getElementById('myChart').getContext('2d');
const productivityChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
        datasets: [{
            label: 'kWh por Tonelada de Cana',
            data: [36.05, 39.77, 42.59, 45.86, 51.36, 51.23, 54.06, 55.62],
            backgroundColor: '#A4EA4F',
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                min: 30,
                max: 60,
                ticks: {
                    stepSize: 5
                }
            }
        },
        responsive: true
    }
});