import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-support',
  standalone: true,
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
  ,
  imports: [SidebarComponent, FooterComponent]
})
export class SupportComponent {}
