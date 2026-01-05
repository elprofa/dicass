import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-add-card',
  standalone: true,
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
  imports: [SidebarComponent, FooterComponent]
})
export class AddCardComponent {}
