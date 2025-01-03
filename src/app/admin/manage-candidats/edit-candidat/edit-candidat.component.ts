import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Candidate } from '../../../shared/models/candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-candidat',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './edit-candidat.component.html',
  styleUrl: './edit-candidat.component.css'
})
export class EditCandidatComponent implements OnInit{
  candidate: Candidate = {} as Candidate;
  errorMessage: string = '';

  constructor(
    private activeRoute : ActivatedRoute,
    private adminService : AdminService,
    private router : Router,
  ){}
  editCandidate(f: NgForm) {
      this.adminService.updateCandidate(this.candidate.id!, this.candidate!)
        .subscribe({
          next: () => this.router.navigate(['/admin-space/candidats']),
          error: () => {
            this.errorMessage = 'An error occurred while updating the candidate';
          }
        });
  }
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params['id']; // Récupérer l'ID depuis l'URL
      if (id) {
        this.adminService.getCandidatById(id).subscribe((candidatData) => {
        this.candidate = candidatData;
      });
    } else {
      console.log('Aucun ID de candidat fourni dans l’URL.');
    }
  });
}
  }