import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-enable-location',
  standalone: true,
  templateUrl: './enable-location.component.html',
  styleUrls: ['./enable-location.component.css'],
  imports: [SidebarComponent, FooterComponent]
})
export class EnableLocationComponent {}
