import { Component } from '@angular/core';


@Component({
  selector: 'app',
  template: `
    <h1>{{title}}</h1>
    
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <router-outlet></router-outlet>
    </nav>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
