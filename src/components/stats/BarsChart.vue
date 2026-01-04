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
                const value = context.parsed.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " FCFA";
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
