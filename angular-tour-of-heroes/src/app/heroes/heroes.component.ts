import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService : HeroService) { }

  ngOnInit(): void {
    // this.heroes = this.heroService.getHeroes()
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes)
  }

  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  //   this.messageService.add('HeroesComponent: Selected hero id=$(hero.id)')
  // }

  add(name: string) {
    name = name.trim();

    if(!name){
      return;
    }

    this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(currentHero => currentHero !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
