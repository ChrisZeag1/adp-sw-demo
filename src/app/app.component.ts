import { Component, OnInit } from '@angular/core';
import { Subject, Observable} from 'rxjs'
import { debounceTime, map } from 'rxjs/operators';
import { StarWarsService } from './starwars.service';
import { IPeopleApiResponse } from './people.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public searchSub$: Subject<string>= new Subject<string>();
  public results$: Observable<IPeopleApiResponse>;

  constructor(private swService: StarWarsService) {}

  ngOnInit(): void {
    this.results$ = this.swService.getPeople('');
    this.searchSub$.pipe(
      debounceTime(550),
    )
    .subscribe(searchString => {
      this.results$ = this.swService.getPeople(searchString);
    });
  }

  public search(event: string): void {
    this.searchSub$.next(event);
  }
}