import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMovieListComponent } from './update-movie-list.component';

describe('CreateMovieComponent', () => {
  let component: UpdateMovieListComponent;
  let fixture: ComponentFixture<UpdateMovieListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMovieListComponent]
    });
    fixture = TestBed.createComponent(UpdateMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
