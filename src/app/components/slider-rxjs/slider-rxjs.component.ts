import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '../../datas/models'; 
import { BehaviorSubject, timer, switchMap, from, concatMap, of, delayWhen, repeat, repeatWhen, retry, flatMap, mergeMap, interval, map, pipe } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider-rxjs',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './slider-rxjs.component.html',
  styleUrl: './slider-rxjs.component.scss'
})
export class SliderRxjsComponent {

  @Input() set items(value: Item[]) { this.items$.next(value); }

  paused$ = new BehaviorSubject(false);
  delay$ = this.paused$
  .pipe(switchMap(isPaused => timer(isPaused ? 200000 : 2000)));

  items$ = new BehaviorSubject<Item[]>([]);
  
  item$ = interval().pipe(
    switchMap(_ => this.items$),
    switchMap(items => from(items)),
    concatMap(item => of(item).pipe(delayWhen(() => this.delay$)))
  )
}
