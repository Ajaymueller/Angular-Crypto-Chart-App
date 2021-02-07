import { Component, OnInit, HostListener } from '@angular/core';
import { ApidataService } from '../../services/apidata.service';
import { HistoricPrice } from '../../models/historic.price'
import { Source } from '../../models/source';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.css']
})
export class CryptoChartComponent implements OnInit {

  BITCOIN = Source.bitcoin;
  ETHEREUM = Source.ethereum;
  selectedType: string = 'both';
  historicBitcoinData: HistoricPrice[] = [];
  historicEthereumData: HistoricPrice[] = [];
  mergedData: HistoricPrice[] = [];

  private margin = { top: 20, right: 20, bottom: 30, left: 90};
  private width: any;
  private height: any;
  private x: any;
  private y: any;
  private svg: any;
  private line: any;

  constructor(private ApidataService: ApidataService,) {}

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      event.target.innerWidth;
      d3.selectAll("svg > *").remove();
      this.createChart();
    }
  
  
    ngOnInit() {
      this.fetchBitcoinData();
    }
  
    changeChart(type: string) {
      this.selectedType = type;
      this.redrawChart();
    }
  
    createChart() {
      this.buildSvg();
      this.addXandYAxis();
      this.drawLineAndPath();
    }
  
  
    redrawChart() {
      d3.selectAll("svg > *").remove();
      this.createChart();
    }
  
    fetchBitcoinData() {
      this.ApidataService.get(this.BITCOIN)
        .subscribe(res => {
          this.historicBitcoinData = res.Data.Data;
          this.fetchEthereumData();
        }, err => {
          console.error(err);
        })
    }

    fetchEthereumData() {
      this.ApidataService.get(this.ETHEREUM)
        .subscribe(res => {
          this.historicEthereumData = res.Data.Data;
          this.mergedData = [...this.historicBitcoinData, ...this.historicEthereumData];
          this.createChart();
        }, err => {
          console.error(err);
        })
    }
  
    private buildSvg() {
      this.svg = d3.select('svg')
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private addXandYAxis() {
      this.width = parseInt(d3.select("#chart").style("width")) - this.margin.left - this.margin.right - 50
      this.height = parseInt(d3.select("#chart").style("height")) - this.margin.top - this.margin.bottom 
      this.x = d3Scale.scaleTime().range([0, this.width]);
      this.y = d3Scale.scaleLinear().range([this.height, 0])
      this.x.domain(d3Array.extent(this.mergedData, (d) => new Date(d.time * 1000)));
      let data: HistoricPrice[] = [];
      if (this.selectedType === 'both') {
        data = this.mergedData;
      } else if (this.selectedType === 'ethereum') {
        data = this.historicEthereumData
      } else if (this.selectedType === 'bitcoin') {
        data = this.historicBitcoinData
      }
      this.y.domain(d3Array.extent(data, (d) => d.close));
      this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3Axis.axisBottom(this.x))
      this.svg.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y));
      this.svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - this.margin.left)
        .attr("x",0 - (this.height / 2))
        .attr("dy", "1em")
        .text("USD")
        .style("fill", "white")
    }
  
  
    private drawBitcoinLineGraph() {
      this.svg.append('path')
        .datum(this.historicBitcoinData)
        .attr('class', 'line')
        .attr("fill", "none")
        .attr('d', this.line)
        .attr("stroke", 'orange')
        .attr("stroke-width", 2)

      this.svg.append("text")
        .attr("transform", "translate(" + (this.width + 2) + "," + this.y(this.historicBitcoinData[this.historicBitcoinData.length - 1].close) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "orange")
        .text("BTC");
    }

  private drawEthereumLineGraph() {
      this.svg.append('path')
        .datum(this.historicEthereumData)
        .attr('class', 'line')
        .attr("fill", "none")
        .attr('d', this.line)
        .attr("stroke", 'Blue')
        .attr("stroke-width", 2);
  
      this.svg.append("text")
        .attr("transform", "translate(" + (this.width + 2) + "," + this.y(this.historicEthereumData[this.historicEthereumData.length - 1].close) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "steelBlue")
        .text("ETH");
    }
  
    private drawLineAndPath() {
      this.line = d3Shape.line()
        .x((d: any) => this.x(new Date(d.time * 1000)))
        .y((d: any) => this.y(d.close));
  
      if (this.selectedType === 'both') {
        this.drawBitcoinLineGraph();
        this.drawEthereumLineGraph();
      } else if (this.selectedType === 'ethereum') {
        this.drawEthereumLineGraph();
      } else if (this.selectedType === 'bitcoin') {
        this.drawBitcoinLineGraph();
      }
    }
}
