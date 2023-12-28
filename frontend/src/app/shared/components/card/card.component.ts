import {Component, Input} from '@angular/core';
import {Movies} from "../../../core/models/movies";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() public movie: Movies;


  constructor(private readonly router: Router) {}


  public navigate(movie: Movies): void {
    this.router.navigate(['/movies/update-movie-list'], { state: movie })
  }

}
