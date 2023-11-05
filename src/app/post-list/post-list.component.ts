import { Component, Input, computed, signal } from '@angular/core';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Post } from '../model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe],
  template: `
    <h3>Posts</h3>
    <input (input)="handleInput($event)" placeholder="Start typing..." />
    <ng-container *ngIf="filtered().length > 0; else notFound">
      <div
        class="card"
        *ngFor="let post of filtered(); trackBy: trackByFn; let i = index"
      >
        <span>id: {{ post.id }}</span> {{ post.title | titlecase }}
      </div>
    </ng-container>

    <ng-template #notFound>
      <div class="not-found">Nothing was found...</div>
    </ng-template>
  `,
})
export class PostListComponent {
  @Input()
  posts: Post[] = [];

  query = signal('');

  filtered = computed(() =>
    this.posts.filter((p) => p.title.startsWith(this.query()))
  );

  protected trackByFn(index: number, item: Post) {
    return item.id;
  }

  handleInput(e: Event) {
    this.query.set((e.target as any).value);
  }
}
