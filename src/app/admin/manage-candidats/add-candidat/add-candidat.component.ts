import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from '../../admin.module';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../../shared/shared-service.service';

@Component({
  selector: 'app-add-candidat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-candidat.component.html',
  styleUrl: './add-candidat.component.css'
})
export class AddCandidatComponent{
  AddForm!:FormGroup;
  errorMessage: string = '';

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private adminService: AdminModule,
      private sharedService: SharedServiceService
    ) {
      this.AddForm = this.fb.group({
        nom: [''],
        prenom: [''],
        email: [''],
        cin: [''],
        motDePasse: [''],
        photo: [''] 
      });
    }

    onSubmit(): void {
      const candidateData = this.AddForm.value;
      this.sharedService.getUserByEmail(candidateData.email).subscribe(
        {
          next:(existingCandidates)=>{
            if(existingCandidates.length>0){
              this.errorMessage = 'Cet email est déjà utilisé';
            }else{
              //continuer l'enregistrement
              this.sharedService.addcandidate(candidateData).subscribe(
                {
                  next:()=>{
                    alert(`Le candidat ${candidateData.nom} ${candidateData.prenom} a été ajouté avec succès`);
                    this.router.navigate(['/admin-space/candidats'])
                  },
                  error :()=>{
                    this.errorMessage="ne erreur est survenue lors de l\'ajout. Veuillez réessayer";
                  }
                });
            }
          },
          error :()=>{
            this.errorMessage="Impossible de vérifier l\'email. Veuillez réessayer.";
          }
        }
      )
    }
  
}
