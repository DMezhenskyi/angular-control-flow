import { Component, inject } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { DataService } from './data/data.service';
import { UserListComponent } from './user-list/user-list.component';
import { PostListComponent } from './post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PostListComponent,
    UserListComponent,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
  ],
  template: `
    <div class="button-area">
      <button (click)="onFetch()">Re-Fetch Data</button>
    </div>
    <h1>List Of... 👇</h1>
    <ng-container *ngIf="data() as item; else noData">
      <ng-container [ngSwitch]="item.type">
        <app-post-list *ngSwitchCase="'posts'" [posts]="item.payload" />
        <app-user-list *ngSwitchCase="'users'" [users]="item.payload" />
        <div *ngSwitchDefault class="unknown">Unknown Data Type...</div>
      </ng-container>
    </ng-container>
    <ng-template #noData>
      <p>No data or loading...</p>
    </ng-template>
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
