import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidatComponent } from './edit-candidat.component';

describe('EditCandidatComponent', () => {
  let component: EditCandidatComponent;
  let fixture: ComponentFixture<EditCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
