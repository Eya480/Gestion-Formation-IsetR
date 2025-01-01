import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../shared/shared-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sharedService: SharedServiceService
  ) {
    this.registerForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      cin: ['',],
      motDePasse: [''],
      photo: ['']
    });
          }
      
    onSubmit(): void {
        if (this.registerForm.invalid) {
          this.errorMessage = 'Veuillez remplir tous les champs obligatoires correctement.';
          return;
      }
    const candidateData = this.registerForm.value;
    this.sharedService.getUserByEmail(candidateData.email).subscribe({
      next: (existingCandidates) => {
        if (existingCandidates.length > 0) {
          // Email déjà utilisé
          this.errorMessage = 'Cet email est déjà utilisé';
        } else {
          // Email non utilisé, continuer l'enregistrement
          this.sharedService.addcandidate(candidateData).subscribe({
            next: () => {
              alert('Inscription réussie !');
              this.router.navigate(['/public/login']); 
            },
            error: (err) => {
              this.errorMessage = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
              //console.error(err);
            }
          });
        }
      },
      error: () => {
        this.errorMessage = 'Impossible de vérifier l\'email. Veuillez réessayer.';
        //console.error(err);
      }
    });
  
  }
}