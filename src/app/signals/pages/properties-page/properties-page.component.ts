import { Component, computed, effect, signal } from '@angular/core';
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

  public counter = signal(10)

  public userChangeEffect = effect( () => {
    //en el cuerpo definimos las dependencias
    //cada vez que el usuario cambia disparamos el efecto de imprimir el nombre
    //se limpia de manera automática
    console.log(`${this.user().first_name} - ${this.counter()}`); //se dibuja solo si el usuario cambia o el contador

  })

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

  increaseBy(value: number){
    this.counter.update(current => current + value)
  }

  ngOnDestroy(): void {
    //podemos hacer la limpieza manual del efecto si estamos desconfiados
    // this.userChangeEffect.destroy()
  }
}
