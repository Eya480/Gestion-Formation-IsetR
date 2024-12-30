import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../services/public/public.service';

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
  photo!: File;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private candidateService: PublicService
  ) {
    this.registerForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      cin: [''],
      motDePasse: [''],
      photo: [''] 
    });
  }
  
  ngOnInit(): void {
    // Vous pouvez y ajouter des logiques d'initialisation si nécessaire
  }

  onSubmit(): void {
    const candidateData = this.registerForm.value;
    this.candidateService.getUserByEmail(candidateData.email).subscribe({
      next: (existingCandidates) => {
        if (existingCandidates.length > 0) {
          // Email déjà utilisé
          this.errorMessage = 'Cet email est déjà utilisé';
        } else {
          // Email non utilisé, continuer l'enregistrement
          this.candidateService.addcandidate(candidateData).subscribe({
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
      error: (err) => {
        this.errorMessage = 'Impossible de vérifier l\'email. Veuillez réessayer.';
        //console.error(err);
      }
    });
  
  }
}