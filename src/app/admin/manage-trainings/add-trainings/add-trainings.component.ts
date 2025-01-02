import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-trainings',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-trainings.component.html',
  styleUrls: ['./add-trainings.component.css']
})
export class AddTrainingsComponent{
  AddTrainingForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private adminService : AdminService
  ) {
    this.AddTrainingForm = this.fb.group({
      titre: [''],
      description: [''],
      chargeHoraire: [''],
      niveau: [''],
      programme: [''],
      categories: [''],
      tags: ['']
    });
  }

  onSubmit(): void {
    const trainingData = this.AddTrainingForm.value;

    trainingData.categories = this.adminService.StringToArray(trainingData.categories);
    trainingData.tags = this.adminService.StringToArray(trainingData.tags);
    
    this.adminService.getTrainingByTitre(trainingData.titre).subscribe({
      next: (existingTrainings) => {
        if (existingTrainings.length > 0) {
          this.errorMessage = 'Un programme avec ce titre existe déjà.';
        } else {
          // Continuer l'enregistrement
          this.adminService.addTraining(trainingData).subscribe({
            next: () => {
              alert(`La formation "${trainingData.titre}" a été ajoutée avec succès.`);
              this.router.navigate(['/admin-space/trainings']);
            },
            error: () => {
              this.errorMessage = "Une erreur est survenue lors de l'ajout. Veuillez réessayer.";
            }
          });
        }
      },
      error: () => {
        console.log(this.adminService.getTrainingByTitre(trainingData.titre));
        this.errorMessage = "Impossible de vérifier le titre de la formation. Veuillez réessayer.";
      }
    });
  }
}
