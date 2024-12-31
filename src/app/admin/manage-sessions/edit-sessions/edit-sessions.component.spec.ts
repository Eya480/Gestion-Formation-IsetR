import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSessionsComponent } from './edit-sessions.component';

describe('EditSessionsComponent', () => {
  let component: EditSessionsComponent;
  let fixture: ComponentFixture<EditSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSessionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
