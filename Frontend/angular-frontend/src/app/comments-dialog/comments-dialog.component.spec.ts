import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsDialogComponent } from './comments-dialog.component';

describe('CommentsDialogComponent', () => {
  let component: CommentsDialogComponent;
  let fixture: ComponentFixture<CommentsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsDialogComponent]
    });
    fixture = TestBed.createComponent(CommentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
