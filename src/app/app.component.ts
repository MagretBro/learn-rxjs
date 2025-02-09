import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef, inject, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { debounceTime, map, Observable, fromEvent, Subject } from 'rxjs';
import { TestService } from './test.service';
import { SliderRxjsComponent } from './components/slider-rxjs/slider-rxjs.component';
import { CommonModule, NgIf } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { AComponent } from './components/a/a.component';


@Component({
  selector: 'app-root',
  imports: [CommonModule, SliderRxjsComponent, SliderComponent, AComponent, NgIf], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  // region 
  showComponents = true;
  showSlider = true;
  showFromEvent = true;
  
  @ViewChild('button') private button!: ElementRef;
  @ViewChild('input') private input!: ElementRef;

  click$!: Observable<unknown>;

  tService = inject(TestService);
  httpClient = inject(HttpClient);

  @HostBinding('class.hide')
  get isHide(): boolean {return !this.showComponents;}

  // button
  isShowA1 = true;
  isShowA2 = true;


  ngAfterViewInit(): void {

    const o1$ = new Subject<number>();

    o1$.subscribe(_ =>
    {console.log(`1 ${_}`);}
    );

    o1$.subscribe(_ =>
      {console.log(`2 ${_}`);}
    );

    setTimeout(() => o1$.next(1), 3000);

    // this.promiseTest();
    // this.promiseAsyncTest();
    // this.promiseLikeTestAsync();

    // this.observableTest();
    // this.observablePipeTest();
    // this.observableMyPipeTest();
    // this.httpTest();
    this.fromEventExample();

  }

  // region fromEventExample line 351

  private fromEventExample() {
      if (!this.showComponents) return;

      this.click$ = fromEvent(this.button.nativeElement, 'click');
      this.click$.subscribe(_=> this.tService.next());

      fromEvent<InputEvent>(this.input.nativeElement, 'input')
      .pipe(
        map(_=> (_.target as HTMLInputElement).value),
        debounceTime(1000))
        .subscribe(text =>
        {console.log('Text input (rxjs): ', text);
        });
      this.debounceTimeWithoutRXJS();
    };

    debounceTimeWithoutRXJS() {
      let timeout: any = 0;
      (this.input.nativeElement as HTMLInputElement)
      .addEventListener('input', (ev: Event) => 
      {
        clearTimeout(timeout);
        const text = (ev.target as HTMLInputElement).value;
        timeout = setTimeout(() =>
        {
          console.log('Text input (without rxjs): ', text);
        }, 1000);
      });
    }
}



/////// 3 

//   getSmth(): Observable<number> {
//     return of(1, 2, 3);
//   }

//   // observableTest(): void
//   // {
//   //   const o$ = this.getObservable();

//   //   o$.subscribe({
//   //     next: _=> 
//   //     {
//   //       console.log(`Observable next1 ${_}`);
//   //       setTimeout(() => (console.log(`Observable next33 ${_}`)), 2000);

//   //     },
    
//   //     error: er =>
//   //     {
//   //       console.log('Observable error1');

//   //     },
//   //     complete: () =>
//   //     {
//   //       console.log('Observable complete1');
//   //     }
//   //   });


//   //   o$.subscribe({
//   //     next: _=> 
//   //     {
//   //       console.log(`Observable next2 ${_}`);
//   //     },
    
//   //     error: er =>
//   //     {
//   //       console.log('Observable error2');
//   //     },
//   //     complete: () =>
//   //     {
//   //       console.log('Observable complete2');
//   //     }
//   //   });

//   //   console.log('Observable execute func end')
//   // }
  

//   // observablePipeTest
//   observablePipeTest(): void {
//     const bs$ = this.getSmth();

//     const bs1$ = bs$.pipe(
//       map(id =>
//       ({ id, name: `Zeus ${id}`})
//     ),
//     filter(o => o.id !==2),
//     );

//     bs1$.subscribe({
//       next: _ => 
//       {
//         console.log('Observable next', _);
//       },
//       error: er =>
//         {
//           console.log('Observable error');
//         },
//         complete: () =>
//         {
//           console.log('Observable complete');
//         }

//     });
//     console.log('Observable execute function end');

//   }

// }

  
    // 2 в этом примере из-за логики промиса нет вывода с задержкой, т к это всего лишь промис

// ngOnInit(): void {
//   this.promiseTest();
// }
//   getPromiseAsync(): Promise<number>
//   {
//     return new Promise<number>(resolve =>
//       {
//         console.log('Promise work');
//         setTimeout(() => resolve(1), 2000);

//        resolve(3);
//       }
//     );
//   }

// promiseTest(): void{
//   const p = this.getPromiseAsync();

//   p.then(_ =>
//   { console.log(`Promise then ${_}`);
//   });
//   p.catch(_ =>
//   {
//     console.log('Promise catch');
//   });
//   console.log('Promise execute func end');
// }
// }



// 1 simple exp Promise

  // someObservable = new Observable((sub) => {
  //   console.log(':)');
  //   sub.next('Smth datas');
  // });

  // ngOnInit() {
  //   this.someObservable.subscribe(console.log);
  //   this.someObservable.subscribe((value) => console.log('2 next', value));
  //   this.someObservable.subscribe(
  //     {next: (value) => console.log('3 next', value),
  //     });
  //   this.someObservable.subscribe({
  //     next(value) {
  //       console.log('4 next:', value);
  //     },
  //   });
  // }

  //}