import { Component, Input, computed, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <h3>Users</h3>
    <input (input)="handleInput($event)" placeholder="Start typing..." />
    <ng-container *ngIf="filtered().length > 0; else notFound">
      <div
        class="card"
        *ngFor="let user of filtered(); trackBy: trackByFn; let i = index"
      >
        <span>index: {{ i }}</span> {{ user.name }}
      </div>
    </ng-container>

    <ng-template #notFound>
      <div class="not-found">Nothing was found...</div>
    </ng-template>
  `,
})
export class UserListComponent {
  @Input()
  users: User[] = [];

  query = signal('');

  filtered = computed(() =>
    this.users.filter((u) => u.name.startsWith(this.query()))
  );

  handleInput(e: Event) {
    this.query.set((e.target as any).value);
  }
  protected trackByFn(index: number, item: User) {
    return item.id;
  }
}
