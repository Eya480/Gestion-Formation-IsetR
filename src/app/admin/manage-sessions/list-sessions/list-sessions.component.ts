import { Component, OnInit } from '@angular/core';
import { Session } from '../../../models/session';
import { AdminService } from '../../services/admin.service';
import { SharedServiceService } from '../../../shared/shared-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-sessions',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-sessions.component.html',
  styleUrl: './list-sessions.component.css'
})
export class ListSessionsComponent implements OnInit{
  sessions?: any[]=[];

  constructor(private adminService: AdminService, private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    // Charger les sessions à l'initialisation du composant
    this.adminService.getSessions().subscribe({
      next: (data) => {
        this.sessions = data;

        // Parcourir chaque session pour charger les données associées
        this.sessions.forEach((session) => {
          // Charger les formateurs de la session
          const formateurIds = session.formateurIds;
          if (formateurIds && formateurIds.length > 0) {
            this.sharedService.getFormateursByIds(formateurIds).subscribe({
              next: (formateursData) => (session.formateurs = formateursData),
              error: (error) => console.error(error)
            });
          } else {
            session.formateurs = [];
          }

          // Charger les candidats de la session
          const candidatIds = session.candidatsInscrits;
          if (candidatIds && candidatIds.length > 0) {
            this.adminService.getCandidatsByIds(candidatIds).subscribe({
              next: (candidatsData) => (session.candidats = candidatsData),
              error: (error) => console.error(error),
            });
          } else {
            session.candidats = [];
          }

          // Charger les informations de la formation liée à la session
          if (session.formationId) {
            this.sharedService.getFormationById(session.formationId).subscribe({
              next: (formationData) => {session.formation = formationData;console.log(formationData);},
              error: (error) => console.error(error),
            });
          } else {
            session.formation = null;
          }
        });
      },
      error: (error) => console.error(error),
    });
  }

  deleteSession(id: string | undefined): void {
    if (id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette session ?')) {
        this.adminService.deleteSession(id).subscribe({
          next: () => {
            // Mettre à jour la liste des sessions après suppression
            this.sessions = this.sessions?.filter(session => session.id !== id);
          },
          error: (error) => console.error('Erreur lors de la suppression de la session', error)
        });
      }
    } else {
      console.error('ID de la session est undefined');
    }
  }
}

