import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { RouterModule } from '@angular/router';
import { Trainings } from '../../../shared/models/trainings';
import { SharedServiceService } from '../../../shared/shared-service.service';

@Component({
  selector: 'app-list-candidat',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-trainings.component.html',
  styleUrl: './list-trainings.component.css'
})
export class ListTrainingsComponent implements OnInit {
  formations? : Trainings[];
  

  constructor(private adminService : AdminService,private sharedService : SharedServiceService){}

  ngOnInit(): void {
    this.sharedService.getFormations().subscribe({
      next: (data) => this.formations = data,
      error: (error) => console.error('Erreur lors du chargement des formations', error)
    });
  }

  deleteFormation(id: string | undefined): void {
    if (id) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
        this.adminService.deleteFormation(id).subscribe({
          next: () => {
            this.formations = this.formations?.filter(c => c.id !== id);
          },
          error: (error) => console.error('Erreur lors de la suppression du formation', error)
        });
      }
    } else {
      console.error('ID de formation est undefined');
    }
  }
  
}