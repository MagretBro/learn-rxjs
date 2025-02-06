import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  
  ngOnInit(): void {
    this.promiseTest();
  }



  // в этом примере из-за промиса нет вывода с задержкой, т к промис
  getPromiseAsync(): Promise<number>
  {
    return new Promise<number>(resolve =>
      {
        console.log('Promise work');
        setTimeout(() => resolve(1), 2000);

       resolve(3);
      }
    );
  }

promiseTest(): void{
  const p = this.getPromiseAsync();

  p.then(_ =>
  { console.log(`Promise then ${_}`);
  });
  p.catch(_ =>
  {
    console.log('Promise catch');
  });
  console.log('Promise execute func end');
}
}



// simple exp Promise

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