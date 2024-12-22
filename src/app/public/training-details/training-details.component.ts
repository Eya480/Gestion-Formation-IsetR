import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsService } from '../services/trainings/trainings.service';
import { Trainings } from '../models/trainings';
@Component({
  selector: 'app-training-details',
  standalone: true,
  imports: [],
  templateUrl: './training-details.component.html',
  styleUrl: './training-details.component.css'
})
export class TrainingDetailsComponent implements OnInit{
  training: Trainings | undefined;
  constructor(
    private route: ActivatedRoute,
    private trainingsService: TrainingsService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get ID from route params
    if (id) {
      this.trainingsService.getFormationById(id).subscribe((data) => {
        this.training = data;
        console.log(data);
      });
    }
  }
}