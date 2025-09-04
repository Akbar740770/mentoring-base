import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Component,inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { DataPipe } from "../pipes/data.pipe";
import { HoverColorDirective } from "../directives/highlight.directive";
import { AuthService } from "../auth.service";



const AboutCompanyFunction = (text: string) => text;
const AboutCompany = AboutCompanyFunction('О Компании');

const NavItems = [
  'Каталог',
  'Стройматериалы',
  'Инструменты',
  'Электрика',
  'Интерьер и одежда',
];



const upperCaseMenuItems = NavItems.map((items) => {
  return items.toLowerCase();
});

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, DataPipe, HoverColorDirective,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  today: number = Date.now();

   authService = inject(AuthService);
  router = inject(Router);

  user$ = this.authService.user$;


  loginAsAdmin() {
    this.authService.loginAsAdmin();
    this.router.navigate(['/admin-user']);
  }

  loginAsUser() {
    this.authService.loginAsUser();
  }

  logout() {
    this.authService.logout();
  }

  changeMenuText() {
    this.NavItems2 = upperCaseMenuItems.map((NavItem) =>
      this.isUpperCase ? NavItem.toLowerCase() : NavItem.toUpperCase()
    );
    this.isUpperCase = !this.isUpperCase;
  }
  isShowCatalog = true;
  readonly AboutCompany1 = AboutCompany;
  readonly hiderItem1 = 'Главная';
  readonly hiderItem2 = 'О Компании';
  readonly hiderItem3 = 'Каталог';

  NavItems2 = upperCaseMenuItems;

  isUpperCase = true;
  readonly NavItems1 = NavItems;
}
