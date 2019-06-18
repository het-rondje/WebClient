import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { StreamComponent } from './stream/stream.component';
import { ChatComponent } from './chat/chat.component';
import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,ProfileComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
