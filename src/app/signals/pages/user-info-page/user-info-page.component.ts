import { Component, inject, signal } from '@angular/core';
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

  ngOnInit(): void {
    this.loadUser(this.userId())

  }

  loadUser(id: number){
    if(id <= 0) return
    this.userId.set(id)

    this.userService.getUserById(id)
    .subscribe( user => {
      this.currentUser.set(user)
    })
  }

}
