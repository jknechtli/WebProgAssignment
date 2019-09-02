import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { AccountComponent } from './account/account.component';
import { GroupsComponent } from './groups/groups.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatHubComponent } from './chat-hub/chat-hub.component';
import { ChatGroupComponent } from './chat-group/chat-group.component';
import { UserCreateComponent } from './user-create/user-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    GroupsComponent,
    UsersComponent,
    UserEditComponent,
    ChatRoomComponent,
    ChatHubComponent,
    ChatGroupComponent,
    UserCreateComponent,
    // DataService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
