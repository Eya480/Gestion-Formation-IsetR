import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Session } from '../../shared/models/session';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from '../../shared/shared-service.service';

@Component({
  selector: 'app-register-session',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-session.component.html',
  styleUrls: ['./register-session.component.css']
})
export class RegisterSessionComponent implements OnInit {
  errorMessage: string = '';
  session!: Session;
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sharedService: SharedServiceService
  ) {
    this.registerForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    // Utilisation de this.route.params pour écouter les changements des paramètres
    this.route.params.subscribe(params => {
      const sessionId = params['id']; // Récupérer l'ID depuis l'URL
      if (sessionId) {
        this.sharedService.getSessionById(sessionId).subscribe((sessionData) => {
          this.session = sessionData;
        });
      } else {
        console.log('Aucun ID de session fourni dans l’URL.');
      }
    });
  }

  onSubmit(): void {
    const email = this.registerForm.value.email;

    // Vérifier si la session est déjà complète
    if (this.session.candidatsInscrits.length >= 15) {
      this.errorMessage = "La session est déjà complète.";
      return;
    }

    // Vérifier si le candidat est déjà inscrit
    this.sharedService.getUserByEmail(email).subscribe({
      next: (candidates) => {
        if (candidates.length === 0) {
          alert("Aucun candidat trouvé avec cet email. Veuillez vous inscrire d'abord.");
          this.router.navigate(['public/register']);
        } else {
          const candidate = candidates[0]; // Supposons qu'il y ait un seul candidat avec cet email

          // Vérification si `candidate.id` est défini
          if (!candidate.id) {
            this.errorMessage = "Identifiant de candidat manquant.";
            return;
          }

          const candidateId: string = candidate.id; // Maintenant sûr d'assigner

          // Si le candidat est déjà inscrit, afficher une erreur
          if (this.session.candidatsInscrits.includes(candidateId)) {
            this.errorMessage = "Vous êtes déjà inscrit à cette session.";
          } else {
            // Ajouter le candidat à la session
            this.session.candidatsInscrits.push(candidateId);
            this.sharedService.updateSession(this.session).subscribe({
              next: () => {
                alert("Candidat inscrit avec succès.");
                this.router.navigate(["/public/trainings"]);
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
