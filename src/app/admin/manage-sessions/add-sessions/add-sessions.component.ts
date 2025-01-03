import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Trainer } from '../../../shared/models/trainer';
import { Trainings } from '../../../shared/models/trainings';
import { Candidate } from '../../../shared/models/candidate';
import { SharedServiceService } from '../../../shared/shared-service.service';

@Component({
  selector: 'app-add-session',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-sessions.component.html',
  styleUrls: ['./add-sessions.component.css']
})
export class AddSessionsComponent implements OnInit{
  AddSessionForm!: FormGroup;
  errorMessage: string = '';
  formateurs: Trainer[] = [];
  formations: Trainings[] = [];
  candidats: Candidate[] = [];
  selectedFormateurs : string[]=[];
  selectedCandidats : string[]=[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private adminService: AdminService,
    private sharedS: SharedServiceService
  ) {
    this.AddSessionForm = this.fb.group({
      formationId: [''],
      formateurIds: [[]],
      dateDebut: [''],
      dateFin: [''],
      description: [''],
      candidatsInscrits: [[]]
    });
  }
  ngOnInit(): void {
    this.adminService.getFormateurs().subscribe({
      next: (data) => {
        this.formateurs = data;
      },
      error: () => {
        this.errorMessage = "Erreur lors de la récupération des formateurs.";
      }
    });
    // Récupérer la liste des candidats
    this.adminService.getCandidats().subscribe({
      next: (data) => {
        this.candidats = data;
      },
      error: () => {
        this.errorMessage = "Erreur lors de la récupération des candidats.";
      }
    });
    //
    this.sharedS.getFormations().subscribe({
      next: (data) => {
        this.formations = data;
      },
      error: () => {
        this.errorMessage = "Erreur lors de la récupération des formations.";
      }
    });
  }

  onSubmit(): void {
    const sessionData = this.AddSessionForm.value;
    // Ajouter les formateurs sélectionnés au formulaire avant soumission
    sessionData.formateurIds = this.selectedFormateurs;
    sessionData.candidatsInscrits = this.selectedCandidats;

    this.adminService.addSession(sessionData).subscribe({
      next: () => {
        alert('La session a été ajoutée avec succès.');
        this.router.navigate(['/admin-space/sessions']);
      },
      error: () => {
        this.errorMessage = "Une erreur est survenue lors de l'ajout. Veuillez réessayer.";
      }
    });
  }

  //***************************************** */
  // Gestion du changement de sélection des formateurs
  onFormateurChange(event: any): void {
    const formateurId = event.target.value;
    if (event.target.checked) {
      this.selectedFormateurs.push(formateurId);
    } else {
      this.selectedFormateurs = this.selectedFormateurs.filter(id => id !== formateurId);
    }
  }
  // Gestion du changement de sélection des formateurs
  onCandidatChange(event: any): void {
    const candidatId = event.target.value;
    if (event.target.checked) {
      this.selectedCandidats.push(candidatId);
    } else {
      this.selectedCandidats = this.selectedCandidats.filter(id => id !== candidatId);
    }
  }
}
