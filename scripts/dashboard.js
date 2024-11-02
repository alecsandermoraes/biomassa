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

const ctx2 = document.getElementById('energyPieChart').getContext('2d');
const energyPieChart = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: [
            'Petróleo e Derivados (35,7%)',
            'Biomassa da Cana (15,4%)',
            'Hidráulica (12,5%)',
            'Gás Natural (10,5%)',
            'Lenha e Carvão Vegetal (9%)',
            'Lixívia e Outras Renováveis (7%)',
            'Carvão Mineral (4,6%)',
            'Eólica (2,3%)',
            'Nuclear (1,3%)',
            'Solar (1,2%)',
            'Não Renováveis (0,6%)',
        ],

        datasets: [{
            label: 'Uso de Energia (%)',
            data: [35.7, 15.4, 12.5, 10.5, 9.0, 7.0, 4.6, 2.3, 1.3, 1.2, 0.6],
            backgroundColor: [
                '#4CAF50',
                '#66BB6A',
                '#81C784',
                '#A5D6A7',
                '#C8E6C9',
                '#388E3C',
                '#1B5E20',
                '#AEEEEE',
                '#B2DFDB',
                '#7CB342',
                '#9CCC65',
            ],

            borderWidth: 1,
            borderColor: '#000000',
        }]
    },

    options: {
        responsive: true,
        layout: {
            padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
        },

        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 25,
                    padding: 20,
                    font: {
                        size: 14,
                    }
                }
            },

            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(1)}%`;
                    }
                }
            }
        }
    }
});

const ctx3 = document.getElementById('energyPieChart2').getContext('2d');
const energyPieChart2 = new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: [
            'Hidráulica (61,9%)',
            'Eólica (11,8%)',
            'Biomassa (8%)',
            'Solar (4,4%)',
            'Não Renováveis (10%)',
            'Nuclear (2,1%)',
            'Importada (1,9%)',
        ],

        datasets: [{
            label: 'Uso de Energia (%)',
            data: [61.9, 11.8, 8.0, 4.4, 10.0, 2.1, 1.9],
            backgroundColor: [
                '#4CAF50',
                '#66BB6A',
                '#81C784',
                '#A5D6A7',
                '#C8E6C9',
                '#388E3C',
                '#1B5E20',
                '#AEEEEE',
                '#B2DFDB',
                '#7CB342',
                '#9CCC65',
            ],

            borderWidth: 1,
            borderColor: '#000000',
        }]
    },

    options: {
        responsive: true,
        layout: {
            padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
        },

        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 25,
                    padding: 20,
                    font: {
                        size: 14,
                    }
                }
            },

            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(1)}%`;
                    }
                }
            }
        }
    }
});