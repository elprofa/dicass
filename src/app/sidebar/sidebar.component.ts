import { Component, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive]
})
export class SidebarComponent implements OnDestroy {
  ngOnDestroy(): void {
    // Ne rien faire côté serveur (SSR)
    if (typeof document !== 'undefined') {
      // Supprime tout backdrop offcanvas Bootstrap restant
      const backdrops = document.querySelectorAll('.offcanvas-backdrop');
      backdrops.forEach(bd => bd.parentNode?.removeChild(bd));
      // Supprime la classe 'modal-open' du body si présente
      document.body.classList.remove('modal-open');
    }
  }
}
