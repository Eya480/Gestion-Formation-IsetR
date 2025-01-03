import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { SharedServiceService } from '../../shared/shared-service.service';
import { Trainings } from '../../shared/models/trainings';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  trainingsArr: WritableSignal<Trainings[]> = signal([]); 
  originalTrainingArr: Trainings[] = [];
  trainingsForm: FormGroup;

  constructor(private sharedService: SharedServiceService, private fb: FormBuilder) {
    this.trainingsForm = this.fb.group({
      searchInput: ['']
    });
  }

  ngOnInit(): void {
    // Récupérer les formations depuis le service
    this.sharedService.getFormations().subscribe((trainings: Trainings[]) => {
      this.originalTrainingArr = trainings;
      this.trainingsArr.set(this.originalTrainingArr);// Initialiser le signal
    });

    // Écouter les changements dans le champ de recherche
    this.trainingsForm.controls['searchInput'].valueChanges
      .pipe(
        map((value: string) => value.trim().toLowerCase()), // Nettoyer la saisie
        map((search) => 
          search
            ? this.originalTrainingArr.filter((training) =>
                training.tags.some((tag) => tag.toLowerCase().includes(search))
              )
            : this.originalTrainingArr// Renvoyer la liste complète si la recherche est vide
        )
      )
      .subscribe((filtered) => this.trainingsArr.set(filtered)); 
  }
}
