import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-add-address',
  standalone: true,
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
  ,
  imports: [SidebarComponent, FooterComponent]
})
export class AddAddressComponent {}
