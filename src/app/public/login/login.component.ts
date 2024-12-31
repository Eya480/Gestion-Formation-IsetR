import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { SharedServiceService } from '../../shared/shared-service.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login!: FormGroup;
  errorMessage: string = ''; 
  constructor(private fb:FormBuilder,
    private sharedService : SharedServiceService,private router: Router){
     // Initialisation du formulaire
     this.login = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  loginCandidate(login: FormGroup) {
    this.sharedService.getUserByEmail(login.value.email).subscribe({
      next: (candidates) => {
        const candidate = candidates[0];
        if (candidate) {
          if (candidate.motDePasse === login.value.password) {
            alert(`Connexion réussie ! Bienvenue, ${candidate.nom}!`);
            this.router.navigate(['/public/trainings']);
          } else {
            // Mot de passe incorrect
            this.errorMessage = 'Mot de passe incorrect.';
          }
        } else {
          // Email non trouvé, proposer l'inscription
          this.errorMessage = "Aucun utilisateur trouvé avec cet email. Veuillez vous inscrire svp !";
        }
      },
      error: () => {
        this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
      }
    });
  }
  
}
