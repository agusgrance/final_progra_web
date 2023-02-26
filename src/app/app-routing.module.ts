import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AuthguardGuard } from './authguard.guard';
import { BooksComponent } from './books/books.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UsersComponent },
    { path: 'registration', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard] },
    { path: 'books', component: BooksComponent, canActivate: [AuthguardGuard] },
    { path: 'bookDetail/:id', component: DetailComponent, canActivate: [AuthguardGuard] }


]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }