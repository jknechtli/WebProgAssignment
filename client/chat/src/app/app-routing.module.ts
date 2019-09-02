import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatGroupComponent } from './chat-group/chat-group.component';
import { ChatHubComponent } from './chat-hub/chat-hub.component';
import { UserCreateComponent } from './user-create/user-create.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'users/:id/edit', component: UserEditComponent },
  { path: 'chat', component: ChatHubComponent },
  { path: 'chat/:group', component: ChatGroupComponent },
  { path: 'chat/:group/:channel', component: ChatRoomComponent },
  { path: 'groups', component: GroupsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
