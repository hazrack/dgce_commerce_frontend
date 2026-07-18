<template>
  <div class="charts-container">
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script>
import { 
  Chart, 
  BarController, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Enregistre les composants nécessaires
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function formatMontant(value) {
  const num = Number(value);
  if (Math.abs(num) >= 1e9) {
    const milliards = (num / 1e9).toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false
    });
    return `${milliards} (milliard) FCFA`;
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " FCFA";
}

export default {
  name: 'BarChart',
  props: {
    labels: Array,
    datasets: Array
  },
  mounted() {
    const ctx = this.$refs.barChart.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#000'
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = formatMontant(context.parsed.y);
                return `${label}: ${value}`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: false,
            ticks: {
              color: '#000'
            }
          },
          y: {
            stacked: false,
            beginAtZero: true,
            ticks: {
              color: '#000',
              callback: function(value) {
                return formatMontant(value);
              }
            }
          }
        }
      }
    });
  }
};
</script>

<style scoped>
.charts-container {
  max-width: 100%;
}
</style>
