import { Component, computed, inject, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent {

  private userService = inject(UsersServiceService)
  public userId = signal(1)

  currentUser = signal<User | undefined>(undefined)
  userWsFound = signal(true)
  fullName = computed<string>(() => {
    if(!this.currentUser()) return 'Usuario no encontrado'

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  })

  ngOnInit(): void {
    this.loadUser(this.userId())

  }

  loadUser(id: number){
    if(id <= 0) return
    this.userId.set(id)

    this.userService.getUserById(id)
    // .subscribe( user => {
    //   this.currentUser.set(user)
    // })
    //usando subscribe que controla diferentes emisiones
    .subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWsFound.set(true)
      },
      error: () => {
        this.userWsFound.set(false)
        this.currentUser.set(undefined)
      }
    })
  }

}
