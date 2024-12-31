import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../models/candidate';
import { AdminService } from '../../services/admin.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-candidat',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-candidat.component.html',
  styleUrl: './list-candidat.component.css'
})
export class ListCandidatComponent implements OnInit {
  candidats? : Candidate[];

  constructor(private adminService : AdminService,){}

  ngOnInit(): void {
    this.adminService.getCandidats().subscribe({
      next: (data) => this.candidats = data,
      error: (error) => console.error('Erreur lors du chargement des candidats', error)
    });
  }

  deleteCandidat(id: string | undefined): void {
    if (id) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce candidat ?")) {
        this.adminService.deleteCandidate(id).subscribe({
          next: () => {
            this.candidats = this.candidats?.filter(c => c.id !== id);
          },
          error: (error) => console.error('Erreur lors de la suppression du candidat', error)
        });
      }
    } else {
      console.error('ID du candidat est undefined');
    }
  }
  
}