import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    NgChartsModule
  ],
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css']
})
export class ItemTableComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'actions'];
  dataSource = new MatTableDataSource<Item>();
  editingItem: Item | null = null;

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Quantity',
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',   // Pink
          'rgba(54, 162, 235, 0.6)',   // Blue
          'rgba(255, 206, 86, 0.6)',   // Yellow
          'rgba(75, 192, 192, 0.6)',   // Teal
          'rgba(153, 102, 255, 0.6)',  // Purple
          'rgba(255, 159, 64, 0.6)',   // Orange
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
        borderWidth: 2
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#666'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#666'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#666',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Item Quantities',
        color: '#333',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      }
    }
  };

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.dataSource.data = items;
      this.updateChart();
    });
  }

  updateChart(): void {
    this.barChartData.labels = this.dataSource.data.map(item => item.name);
    this.barChartData.datasets[0].data = this.dataSource.data.map(item => item.quantity);
    
    if (this.chart) {
      this.chart.update();
    }
  }

  startEdit(item: Item): void {
    this.editingItem = { ...item };
  }

  cancelEdit(): void {
    this.editingItem = null;
  }

  saveItem(): void {
    if (this.editingItem) {
      this.itemService.updateItem(this.editingItem);
      this.editingItem = null;
    }
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(id);
    }
  }

  addNewItem(): void {
    const newItem: Item = {
      id: 0,
      name: '',
      quantity: 0,
      price: 0
    };
    this.editingItem = newItem;
  }

  submitNewItem(): void {
    if (this.editingItem) {
      this.itemService.addItem(this.editingItem);
      this.editingItem = null;
    }
  }
}
