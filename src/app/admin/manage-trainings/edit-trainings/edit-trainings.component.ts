import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainings } from '../../../models/trainings';
import { AdminService } from '../../services/admin.service';
import { SharedServiceService } from '../../../shared/shared-service.service';

@Component({
  selector: 'app-edit-trainings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-trainings.component.html',
  styleUrl: './edit-trainings.component.css'
})
export class EditTrainingsComponent implements OnInit {
  training: Trainings = {} as Trainings;
  errorMessage: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private adminService: AdminService,
    private sharedSer: SharedServiceService,
    private router: Router
  ) {}

  editTraining(f: NgForm) {
    if (f.valid) {
      this.adminService.updateFormation(this.training.id!, this.training)
        .subscribe({
          next: () => this.router.navigate(['/admin-space/trainings']),
          error: () => {
            this.errorMessage = 'An error occurred while updating the training';
          }
        });
    }
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params['id']; // Récupérer l'ID depuis l'URL
      if (id) {
        this.sharedSer.getFormationById(id).subscribe({
          next: (trainingData) => {
            this.training = trainingData;
          },
          error: () => {
            this.errorMessage = 'Failed to fetch training data';
          }
        });
      } else {
        console.log('No training ID provided in the URL.');
      }
    });
  }
}
