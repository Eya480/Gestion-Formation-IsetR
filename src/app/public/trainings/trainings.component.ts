import {
  Component,
  OnInit,
  signal,
  WritableSignal//trainingsArr est automatiquement mise à jour,
} from '@angular/core';
import { PublicService } from '../services/trainings/public.service';
import { Trainings } from '../../models/trainings';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, of, startWith } from 'rxjs';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css',
})
export class TrainingsComponent implements OnInit {
  trainingsArr: WritableSignal<Trainings[]> = signal([]);
  originalTrainingArr: Trainings[] = [];
  trainingsForm!: FormGroup;

  constructor(private trainingService: PublicService,private fb: FormBuilder) {
    this.trainingsForm = this.fb.group({
    searchInput: [''],
    });
  }

  ngOnInit(): void {
    this.trainingService.getFormations().subscribe({
      next: (trainings: Trainings[]) => {
        console.log(trainings);
        this.originalTrainingArr = trainings;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed');
        //La méthode onSearchInputChanges capte chaque modification en temps réel.
        this.onSearchInputChanges();
        this.trainingsArr.set(this.originalTrainingArr);
      },
    });
  }

  onSearchInputChanges() {
    console.log(this.trainingsForm);
    this.trainingsForm.controls['searchInput'].valueChanges//émissions des valeurs du champ de recherche
      .pipe(
        startWith(''),
        map((filterValue: string) => {
          // Check if the filterValue is non-empty
          const cleansedFilterValue = filterValue.trim().toLowerCase();
          if (cleansedFilterValue.length > 0) {
            // Filter the trainings array based on tags
            //La liste des formations est filtrée pour ne conserver que celles dont les tags contiennent le texte saisi.
            return this.trainingsArr().filter((training) =>
              training.tags.some((tag)=> tag.toLowerCase().includes(cleansedFilterValue))
            );
          }
          // If filterValue is empty, return the original array
          return this.originalTrainingArr;
        })
      )
      .subscribe({
        next: (filteredArr: Trainings[]) => {
          // Update the signal or directly update the array
          this.trainingsArr.set(filteredArr);
        },
        error: (error) => {
          console.error('Error occurred during filtering:', error);
        },
        complete: () => {
          console.log('Filtering completed');
        },
      });
  }
}
