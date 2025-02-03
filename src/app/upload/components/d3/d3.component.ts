import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core'
import * as d3 from 'd3'
import {select, Store} from '@ngrx/store'
import {Subscription} from 'rxjs'
import {ChartData} from '../../types/data.interface'           // Интерфейс для элемента данных диаграммы (например, { category: string; value: number })
import {selectChartData} from '../../store/selector-chart' // Селекторы для получения данных из стора
import {isPlatformBrowser} from '@angular/common'

@Component({
  selector: 'app-d3',
  imports: [],
  templateUrl: './d3.component.html',
  styleUrl: './d3.component.scss'
})
export class D3Component implements OnInit, OnDestroy {

  @ViewChild('pieChart', { static: true }) pieChartRef!: ElementRef;
  @ViewChild('tooltip', { static: true }) tooltipRef!: ElementRef;
  @Output() dataChart: EventEmitter<ChartData[]> = new EventEmitter<ChartData[]>()

  private dataSubscription!: Subscription
  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>
  private colorScale!: d3.ScaleOrdinal<string, string>
  private margin = 50
  private radius!: number

  constructor(private store: Store,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.store.select(selectChartData).subscribe(data => {
      this.dataChart.next(data)
    });
  }

  private initChart(): void {
    const container = this.pieChartRef.nativeElement
    const width = container.parentElement.offsetWidth
    const height = container.parentElement.offsetHeight
    this.radius = Math.min(width, height) / 2 - this.margin

    this.svg = d3.select(container)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)

    this.colorScale = d3.scaleOrdinal(d3.schemeCategory10)
  }

  // private updateChart(data: ChartData[]): void {
  //   // Очищаем предыдущую диаграмму
  //   this.svg.selectAll('*').remove()
  //
  //   // Создаем генераторы
  //   const pie = d3.pie<ChartData>().value(d => d.value)
  //   const arc = d3.arc<any, d3.PieArcDatum<ChartData>>()
  //     .innerRadius(0)
  //     .outerRadius(this.radius)
  //
  //   // Рисуем сегменты
  //   const arcs = this.svg.selectAll('arc')
  //     .data(pie(data))
  //     .enter()
  //     .append('g')
  //     .attr('class', 'arc')
  //
  //   arcs.append('path')
  //     .attr('d', arc)
  //     .attr('fill', (d, i) => this.colorScale(i.toString()))
  //     .on('mouseover', (event, d) => this.showTooltip(event, d.data))
  //     .on('mouseout', () => this.hideTooltip())
  //
  //   // Добавляем подписи
  //   arcs.append('text')
  //     .attr('transform', d => `translate(${arc.centroid(d)})`)
  //     .attr('text-anchor', 'middle')
  //     .text(d => d.data.category)
  // }

  // private showTooltip(event: MouseEvent, data: ChartData): void {
  //   d3.select(this.tooltipRef.nativeElement)
  //     .style('opacity', 1)
  //     .style('left', `${event.pageX + 10}px`)
  //     .style('top', `${event.pageY + 10}px`)
  //     .html(`<strong>${data.category}</strong><br>Value: ${data.value}`)
  // }

  private hideTooltip(): void {
    d3.select(this.tooltipRef.nativeElement)
      .style('opacity', 0)
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe()
    }
  }
}
