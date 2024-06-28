import { Component, computed, signal } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css',
})
export class PropertiesPageComponent {
  user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  });

  fullName = computed<string>(() => `${this.user()?.first_name} ${this.user()?.last_name}`);

  onFieldUpdated(field: keyof User, value: string) {
    //! Ojo potencialmente inseguro porque en el field podemos enviar algo que no exista en relación al objeto que queremos crear
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // })

    this.user.update((current) => {

      let newUser = {...current}
      switch (field) {
        case 'email':
          newUser.email = value;
          break;

        case 'first_name':
          newUser.first_name = value;
          break;
        case 'last_name':
          newUser.last_name = value;
          break;
        case 'id':
          newUser.id = Number(value);
          break;
      }

      return newUser;
    });
  }
}
