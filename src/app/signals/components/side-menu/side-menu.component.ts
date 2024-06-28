import { Component } from '@angular/core';

interface MenuItem {
  title:string,
  route: String
}
@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  //Todo Transformar en una señal
  //!Nota se puede considerar las señales como programación reactiva
  public menuItems: MenuItem[] = [
    {title: 'Contador', route: 'counter'},
    {title: 'Usuario', route: 'user-info'},
    {title: 'Mutaciones', route: 'properties'},
  ]
}
