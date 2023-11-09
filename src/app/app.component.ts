import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DataService } from './data/data.service';
import { UserListComponent } from './user-list/user-list.component';
import { PostListComponent } from './post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ PostListComponent, UserListComponent],
  template: `
    <div class="button-area">
      <button (click)="onFetch()">Re-Fetch Data</button>
    </div>
    <h1>List Of... 👇</h1>
    @if(data(); as item) {
      @switch(item.type) {
        @case('posts') {
          <app-post-list [posts]="item.payload" />
        }
        @case('users') {
          <app-user-list [users]="item.payload" />
        }
        @default {
          <div class="unknown">Unknown Data Type...</div>
        }
      }
    } @else {
      <p>No data or loading...</p>
    }
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  #dataProvider = inject(DataService);

  data = toSignal(this.#dataProvider.data$);

  onFetch() {
    this.#dataProvider.fetch();
  }
}
