import { onMount } from 'solid-js'
import { Chart, Title, Tooltip, Legend, Colors, LinearScale, CategoryScale, BarElement } from 'chart.js'
import { Bar, Line } from 'solid-chartjs'
import { CATEGORIES } from '../../constants/categories'
import { getTotalCategoriesValues } from '../../functions/getTotalCategories'

const GeneralChart = (props: any) => {

    onMount(() => {
        Chart.register(Title, Tooltip, Legend, Colors, LinearScale, CategoryScale, BarElement)
    })

    const totalValues = getTotalCategoriesValues(props.list());

    const chartData = {
        labels: CATEGORIES.map((category) => category.name),
        datasets: [
            {
                data: totalValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
            },
        ],
    }
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Grafico geral',
                color: '#333',
                font: {
                    size: 20,
                    weight: 'bold',
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#dadada'
                }
            },
            y: {
                grid: {
                    color: '#dadada'
                }
            }
        }
    }

    return (
        <div>
            <Bar data={chartData} options={chartOptions} width={500} height={500} fallbackText="Carregando..." />
        </div>
    )
}

export default GeneralChart;