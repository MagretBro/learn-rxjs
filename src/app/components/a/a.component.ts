import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TestService } from '../../test.service';
import { AppComponent } from '../../app.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-a',
  imports: [CommonModule],
  templateUrl: './a.component.html',
  styleUrl: './a.component.scss'
})
export class AComponent implements OnInit, OnDestroy {
  static countA = 0;
  index = ++AComponent.countA;

  tService = inject(TestService);
  appComponent = inject(AppComponent);

  tServiceCount?: number;
  private _subs?: Subscription;

  ngOnInit() {
    console.log(`Создаётся AComponent${this.index}`);

    if (!this.appComponent.showFromEvent || !this.appComponent.showComponents) return;

    // добавляет двойную подписку
  //   this._subs = this.tService.myObservable$
  //   .subscribe(_ =>
  //   { this.tServiceCount = _;
  //       //  console.log('tService.myObservable$', `AComponent${this.index}`);
  // }
  //   )

    console.log('tService.myObservable$: ', this.tService.myObservable$)
    // console.log('index: ', this.index)
  }

  ngOnDestroy(): void {
    console.log("Component A уничтожен")
    this._subs?.unsubscribe();
  }

}
