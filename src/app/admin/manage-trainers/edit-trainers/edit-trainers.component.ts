import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { SharedServiceService } from '../../../shared/shared-service.service';
import { Trainer } from '../../../models/trainer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-trainings',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-trainers.component.html',
  styleUrl: './edit-trainers.component.css'
})
export class EditTrainersComponent implements OnInit {
  trainer: Trainer = {} as Trainer;
  errorMessage: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private adminService: AdminService,
    private sharedSer: SharedServiceService,
    private router: Router
  ) {}
  
  editTrainer(f: NgForm) {
    if (f.valid) {
      this.adminService.updateFormateur(this.trainer.id!, this.trainer)
        .subscribe({
          next: () => this.router.navigate(['/admin-space/trainers']),
          error: () => {
            this.errorMessage = 'An error occurred while updating the trainer';
          }
        });
    }
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params['id']; // Récupérer l'ID depuis l'URL
      if (id) {
        this.adminService.getTrainerById(id).subscribe({
          next: (trainerData) => {
            this.trainer= trainerData;
          },
          error: () => {
            this.errorMessage = 'Failed to fetch trainer data';
          }
        });
      } else {
        console.log('No trainer ID provided in the URL.');
      }
    });
  }

  //************************************* */
  // Fonction pour ajouter une spécialité
  addSpecialite(event: Event) {
    event.preventDefault(); // Empêche le comportement par défaut (par exemple, une redirection ou un rechargement)
    const newSpecialite = prompt("Entrez la spécialité à ajouter:");
  
    if (newSpecialite && newSpecialite.trim() !== "") {
      const normalizedSpecialite = newSpecialite.trim().toLowerCase();
      const isAlreadyAdded = this.trainer.specialites.some(spec => spec.toLowerCase() === normalizedSpecialite);
  
      if (!isAlreadyAdded) {
        this.trainer.specialites.push(newSpecialite.trim());
      } }
  }
  
    // Fonctions pour supprimer une spécialité
    removeSpecialite(index: number) {this.trainer.specialites.splice(index, 1);}
  
   //************************************* */
}
