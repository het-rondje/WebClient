import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicKeysComponent } from './public-keys.component';

describe('PublicKeysComponent', () => {
  let component: PublicKeysComponent;
  let fixture: ComponentFixture<PublicKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
