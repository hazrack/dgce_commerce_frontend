<template>
  <div class="donut-wrapper">
    <div ref="donutContainer" class="donut-container"></div>
  </div>
</template>
  
  <script>
import * as d3 from "d3";

export default {
  name: "DonutInteractive",
  props: {
    dataParsed: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localData: [] // Stockage interne des données
    }
  },
  
  // watch: {
  //   dataParsed: {
  //     immediate: true,
  //     handler(newData) {
  //       if (newData && newData.length) {
  //         // Copie profonde immuable
  //         this.localData = newData;
  //         this.drawDonutChart()
  //       }
  //     },
  //   },
  // },
  methods: {
    drawDonutChart() {
      // Nettoyer le précédent graphique
      d3.select(this.$refs.donutContainer).selectAll("*").remove();

      const data = this.localData.sort((a, b) => b.value - a.value);
      const width = 600;
      const height = 400;
      const thickness = 40;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal().range(data.map((d) => d.color));

      const svg = d3
        .select(this.$refs.donutContainer)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width + 300} ${height + 100}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      const g = svg
        .append("g")
        .attr(
          "transform",
          `translate(${(width + 50) / 2 - 50}, ${(height + 100) / 2})`
        );

      const arc = d3
        .arc()
        .innerRadius(radius - thickness)
        .outerRadius(radius);

      const arcHover = d3
        .arc()
        .innerRadius(radius - (thickness + 5))
        .outerRadius(radius + 8);

      const pie = d3
        .pie()
        .value((d) => d.value)
        .sort(null);

      let activeSegment = null;

      const group = g.selectAll("path").data(pie(data)).enter().append("g");

      group
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.name))
        .attr("class", "data-path")
        .style("cursor", "pointer")
        .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))")
        .on("mouseover", function (event, d) {
          if (this !== activeSegment) {
            d3.select(this).transition().duration(200).attr("d", arcHover);
          }
          // Afficher la valeur et le nom au survol
          d3.select(".data-value").text(d.data.value);
          d3.select(".data-label").text(d.data.name);
        })
        .on("mouseout", function () {
          if (this !== activeSegment) {
            d3.select(this).transition().duration(200).attr("d", arc);
          }
        })
        .on("click", function (event, d) {
          d3.selectAll(".data-path").transition().duration(200).attr("d", arc);
          d3.select(this).transition().duration(250).attr("d", arcHover);
          activeSegment = this;

          d3.select(".data-value").text(d.data.value);
          d3.select(".data-label").text(d.data.name);
        });

      // Texte au centre
      g.append("text")
        .attr("class", "data-value data-text")
        .attr("text-anchor", "middle")
        .attr("dy", "-0.2em")
        .text("")
        .style("font-weight", "bold")
        .style("fill", "#000")
        .style("text-shadow", "1px 1px 3px rgba(0,0,0,0.6)");

      g.append("text")
        .attr("class", "data-label data-text")
        .attr("text-anchor", "middle")
        .attr("dy", "1.2em")
        .text("")
        .style("font-weight", "bold")
        .style("fill", "#000")
        .style("text-shadow", "1px 1px 3px rgba(0,0,0,0.6)");

      // Légende à droite
      const legend = svg
        .selectAll(".legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => {
          const itemHeight = 22;
          const x = radius * 2 + 80;
          const y = 50 + i * itemHeight;
          return `translate(${x}, ${y})`;
        });

      legend.append("circle").attr("r", 6).style("fill", color);

      legend
        .append("text")
        .attr("x", 12)
        .attr("y", 5)
        .attr("class", "legend-text")
        .text((d) => d)
        .style("fill", "#000")
        .style("font-weight", "bold")
        .style("text-shadow", "1px 1px 3px rgba(0,0,0,0.6)");
    },
  },

  mounted() {
    this.localData = [...this.dataParsed];
    this.drawDonutChart();
  }
};
</script>
  
  <style scoped>
.donut-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: auto;
}

.donut-container {
  width: 100%;
  max-width: 1000px;
}

.data-text {
  font-size: 1.8rem;
}

.legend text {
  cursor: pointer;
}

.data-path:hover {
  cursor: pointer;
}
</style>
  