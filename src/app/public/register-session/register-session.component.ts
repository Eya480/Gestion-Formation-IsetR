import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Session } from '../../models/session';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../services/trainings/public.service';

@Component({
  selector: 'app-register-session',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-session.component.html',
  styleUrls: ['./register-session.component.css']
})
export class RegisterSessionComponent {
  errorMessage: string = '';
  session!: Session;
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private publicService: PublicService
  ) {
    this.registerForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('id');
    if (sessionId) {
      this.publicService.getSessionById(sessionId).subscribe((sessionData) => {
        this.session = sessionData;
      });
    }
  }

  onSubmit(): void {
    const email = this.registerForm.value.email;

    // Check if the session is already full
    if (this.session.candidatsInscrits.length >= 15) {
      this.errorMessage = "La session est déjà complète.";
      return;
    }

    // Check if the candidate is already registered
    this.publicService.getUserByEmail(email).subscribe({
      next: (candidates) => {
        if (candidates.length === 0) {
          alert("Aucun candidat trouvé avec cet email. Veuillez vous inscrire d'abord.");
          this.router.navigate(['public/register']);
        } else {
          const candidate = candidates[0]; // Assuming one candidate with that email
          // Check if candidate.id is defined
         if (!candidate.id) {
          this.errorMessage = "Identifiant de candidat manquant.";
          return;
      }

      const candidateId: string = candidate.id;  // Now safe to assign since we checked for undefined


          // If the candidate is already registered, show an error
          if (this.session.candidatsInscrits.includes(candidateId)) {
            this.errorMessage = "Vous êtes déjà inscrit à cette session.";
          } else {
            // Add the candidate to the session
            this.session.candidatsInscrits.push(candidateId);
            this.publicService.updateSession(this.session).subscribe({
              next: () => {
                alert("Candidat inscrit avec succès.");
                this.router.navigate(["/public/trainingDetails"]);
              },
              error: (err) => {
                console.error(err);
              }
            });
          }
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
