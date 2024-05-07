<template>
    <div>
      <apexchart type="pie" :options="chartOptions" :series="series" :labels="labels"></apexchart>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  
  export default {
    props: {
      labels: {
        type: Array,
        required: false
      },
      series: Array, 
    },
    components: {
      apexchart: VueApexCharts
    },
    setup(props) {
      const chartOptions = ref({
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: props.labels
      });
  
      return {
        chartOptions
      };
    }
  };
  </script>
  