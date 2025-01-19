import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [
    { id: 1, name: 'Item 1', quantity: 10, price: 100 },
    { id: 2, name: 'Item 2', quantity: 15, price: 200 },
    { id: 3, name: 'Item 3', quantity: 20, price: 150 }
  ];

  private itemsSubject = new BehaviorSubject<Item[]>(this.items);

  getItems(): Observable<Item[]> {
    return this.itemsSubject.asObservable();
  }

  addItem(item: Item): void {
    const newId = Math.max(...this.items.map(i => i.id), 0) + 1;
    const newItem = { ...item, id: newId };
    this.items.push(newItem);
    this.itemsSubject.next([...this.items]);
  }

  updateItem(updatedItem: Item): void {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
      this.itemsSubject.next([...this.items]);
    }
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.itemsSubject.next([...this.items]);
  }
}
