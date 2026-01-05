import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-coupons',
  standalone: true,
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css'],
  imports: [SidebarComponent, FooterComponent]
})
export class CouponsComponent {}
