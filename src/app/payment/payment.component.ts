import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [FooterComponent, SidebarComponent]
})
export class PaymentComponent {
  showDropdown1 = false;
  showDropdown2 = false;
  showDropdown3 = false;
}
