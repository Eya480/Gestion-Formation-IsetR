import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-trainers',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-trainers.component.html',
  styleUrl: './add-trainers.component.css'
})
export class AddTrainersComponent {
  AddTrainerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private adminService : AdminService
  ) {
    this.AddTrainerForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      telephone: [''],
      cin: [''],
      photo: [''],
      cv: [''],
      specialites: ['']
    });
  }

  onSubmit(): void {
    const trainerData = this.AddTrainerForm.value;

    trainerData.specialites =this.adminService.StringToArray(trainerData.specialites);
    
    this.adminService.getTrainerByEmail(trainerData.email).subscribe({
      next: (existingTrainers) => {
        if (existingTrainers.length > 0) {
          this.errorMessage = 'Un formateur avec cet email existe déjà.';
        } else {
          this.adminService.addTrainer(trainerData).subscribe({
            next: () => {
              alert(`Le formateur "${trainerData.nom} ${trainerData.prenom}" a été ajouté avec succès.`);
              this.router.navigate(['/admin-space/trainers']);
            },
            error: () => {
              this.errorMessage = "Une erreur est survenue lors de l'ajout. Veuillez réessayer.";
            }
          });
        }
      },
      error: () => {
        this.errorMessage = "Impossible de vérifier l'email du formateur. Veuillez réessayer.";
      }
    });
  }
}