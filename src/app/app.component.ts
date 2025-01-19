import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemTableComponent } from './components/item-table/item-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ItemTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud-table';
}
