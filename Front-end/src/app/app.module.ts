import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http'; 

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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };


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
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
