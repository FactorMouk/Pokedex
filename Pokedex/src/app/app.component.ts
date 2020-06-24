import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Biblioteca do elemento Dialog (Modal) do Material

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dialogRef: MatDialog) {
    screen.orientation.lock('portrait');
  }

  // Método para fechamento de todos os possíveis dialogs (modais) abertos
  // Usado quando há mudança de página e ao abrir a sidenav
  closeModals() {
    this.dialogRef.closeAll();
  }
}
