import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Biblioteca do elemento Dialog (Modal) do Material

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dialogRef: MatDialog) {
    // Verificando se o device do usuário é mobile
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.lockingScreen();
    }
  }

  // Bloqueando tela em modo retrado
  async lockingScreen() {
    try {
      await screen.orientation.lock('portrait');
    } catch (err) {
      console.error(err);
    }
  }

  // Método para fechamento de todos os possíveis dialogs (modais) abertos
  // Usado quando há mudança de página e ao abrir a sidenav
  closeModals() {
    this.dialogRef.closeAll();
  }
}
