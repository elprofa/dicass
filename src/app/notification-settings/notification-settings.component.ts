import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.css'],
  imports: [SidebarComponent, FooterComponent]
})
export class NotificationSettingsComponent {}
