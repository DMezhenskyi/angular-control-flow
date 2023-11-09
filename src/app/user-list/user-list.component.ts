import { Component, Input, computed, signal } from '@angular/core';
import { User } from '../model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: `
    <h3>Users</h3>
    <input (input)="handleInput($event)" placeholder="Start typing..." />
    @for(user of filtered(); track user.id) {
      <div class="card">
        <span>index: {{ $index }}</span> {{ user.name }}
      </div>
    } @empty {
      <div class="not-found">Nothing was found...</div>
    }
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
}
