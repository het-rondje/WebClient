import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { StreamComponent } from './components/profile/stream/stream.component';
import { ChatComponent } from './components/profile/chat/chat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OverviewItemComponent } from './components/overview/overview-item/overview-item.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ProfileComponent,
    LoginComponent,
    StreamComponent,
    ChatComponent,
    NavbarComponent,
    OverviewItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
