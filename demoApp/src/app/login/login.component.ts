import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { SVGIcon, eyeIcon } from '@progress/kendo-svg-icons';
import { Router} from "@angular/router";
import { UserModel } from '../model/userModel';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']  
})
export class LoginComponent implements AfterViewInit{
  @ViewChild('password') public textbox: TextBoxComponent;
  public eye: SVGIcon = eyeIcon;
  user: UserModel = {
    Username: 'kullaniciadi',
    Password: 'kullaniciadi'
  };
  returnUrl: string = "";
  constructor(private authService:AuthenticationService, private router: Router) {
  

  }
  public ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = 'password';
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
  }

  public form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    loggedin: new FormControl(),
  });

  public login(): void {
    this.form.markAllAsTouched(); // Formdaki tüm alanları dokunulmuş olarak işaretle

    if (this.form.valid) {
      this.user.Username=this.form.get('username')?.value;
      this.user.Password=this.form.get('password').value;
      this.authService.login(this.user).subscribe(
        data => {
          console.log(data);
          console.log(data.data.token);
           localStorage.setItem('token',data.data.token);
           localStorage.setItem('roleName',data.data.roleName)
          //  this.menuRoleService.prepareMenuItems();
          this.router.navigate(['/dashboard']).then(() => {
            console.log('Navigated to HomeComponent successfully');
          }).catch((error) => {
            console.error('Navigation failed:', error);
          }); 
        },
        error => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.log('Form geçerli değil!');
    }
  }

  public clearForm(): void {
    this.form.reset();
  }
}
