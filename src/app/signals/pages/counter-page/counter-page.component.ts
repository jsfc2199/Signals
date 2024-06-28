import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  public counter = signal(10)

  //señal computada de solo lectura. Queda entonces pendiente de los cambios de otra señal. Es de solo lectura
  public squareCounter = computed(() => this.counter() * this.counter())

  increaseBy(value: number){
    // this.counter.set(this.counter() + value)

    //forma "correcta" con signals
    this.counter.update(current => current + value)
  }


}
