import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCandidatComponent } from './list-candidat.component';

describe('ListCandidatComponent', () => {
  let component: ListCandidatComponent;
  let fixture: ComponentFixture<ListCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
