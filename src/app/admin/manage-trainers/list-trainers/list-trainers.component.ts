import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Trainer } from '../../../models/trainer';
import { SharedServiceService } from '../../../shared/shared-service.service';
import { AdminModule } from '../../admin.module';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-list-trainers',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-trainers.component.html',
  styleUrls: ['./list-trainers.component.css']
})
export class ListTrainersComponent implements OnInit {
  trainers?: Trainer[];

  constructor(private adminservice: AdminService, private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.adminservice.getFormateurs().subscribe({
      next: (data) => this.trainers = data,
      error: (error) => console.error('Erreur lors du chargement des formateurs', error)
    });
  }

  deleteTrainer(id: string | undefined): void {
    if (id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce formateur ?')) {
        this.adminservice.deleteFormateur(id).subscribe({
          next: () => {
            this.trainers = this.trainers?.filter(trainer => trainer.id !== id);
          },
          error: (error) => console.error('Erreur lors de la suppression du formateur', error)
        });
      }
    } else {
      console.error('ID du formateur est undefined');
    }
  }
}
