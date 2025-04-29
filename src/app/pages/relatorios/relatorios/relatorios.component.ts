import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';

import { Entrada } from '../../entradas/shared/entrada.model'
import { EntradaService } from '../../entradas/shared/entrada.service'

import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;
  
  categorias: Categoria[] = [];
  entradas: Entrada[] = [];

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  }

  constructor(
    private categoriaService: CategoriaService,
    private entradaService: EntradaService
  ) { }

  ngOnInit() {
    this.categoriaService.getAll().subscribe( categorias => this.categorias = categorias);
  }

  gerarRelatorios() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if(!month || !year) {
      alert('Selecione o mês e o ano para gerar o relatório');
    }
    else {
      this.entradaService.getByMonthAndYear(month, year).subscribe( this.setValues.bind(this))
    }
  }

  private setValues(entrada: Entrada[]) {
    this.entradas = entrada;
    this.calcularBanlanco();
    this.setChartData();
  }

  private calcularBanlanco() {
    let  expenseTotal = 0;
    let revenueTotal = 0;

    this.entradas.forEach(entrada => {
      if(entrada.tipo == 'expense') {
        expenseTotal += currencyFormatter.unformat(entrada.valor, { code: 'BRL' });
      } else {
        revenueTotal += currencyFormatter.unformat(entrada.valor, { code: 'BRL' });;
      }
    });

    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, { code: 'BRL' });
  }

  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Grafico de Despesas', '#E03131');
  }

  private getChartData(tipoEntrada: string, title: string, color: string) {
    const chartData = [];

    this.categorias.forEach(categoria => {
      const filtrarEntradas = this.entradas.filter(entrada => entrada.categoriaId === categoria.id && (entrada.tipo === tipoEntrada));

      if(filtrarEntradas.length > 0) {
        const valorTotal = filtrarEntradas.reduce(
          (total, entrada) => total + currencyFormatter.unformat(entrada.valor, { code: 'BRL' }), 0 
        )

        chartData.push({
          nomeCategoria: categoria.nome,
          valorTotal: valorTotal
        })
      }
    });

    return {
      labels: chartData.map( item => item.nomeCategoria),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map( item => item.valorTotal)
      }]
    }

  }

}
