import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PublicService } from '../services/public/public.service';
import { Trainings } from '../../models/trainings';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-training-details',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './training-details.component.html',
  styleUrl: './training-details.component.css'
})
export class TrainingDetailsComponent implements OnInit {
  training!: Trainings;
  sessions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private trainingsService: PublicService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de la formation
    if (id) {
      this.trainingsService.getFormationById(id).subscribe((data) => {
        this.training = data;
        //console.log('Formation:', data);
  
        // Récupérer les sessions pour cette formation
        this.trainingsService.getSessionsByFormationId(id).subscribe((sessionsData) => {
          this.sessions = sessionsData;
  
          this.sessions.forEach((session) => {
            const formateurIds = session.formateurIds; // IDs des formateurs pour cette session
            console.log(formateurIds);
            if (formateurIds && formateurIds.length > 0) {
              this.trainingsService.getFormateursByIds(formateurIds).subscribe((formateursData) => {
                console.log(formateursData);
                // Ajouter les formateurs à la session correspondante
                session.formateurs = formateursData;
                console.log(`Formateurs pour la session ${session.id}:`, session.formateurs);
              });
            } else {
              // Si aucune ID de formateur n'est trouvée pour cette session
              session.formateurs = [];
            }
          });
        });
      });
    }}}  