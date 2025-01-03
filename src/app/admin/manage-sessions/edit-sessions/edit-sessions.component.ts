import { Component, OnInit } from '@angular/core';
import { Trainings } from '../../../shared/models/trainings';
import { Trainer } from '../../../shared/models/trainer';
import { Candidate } from '../../../shared/models/candidate';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from '../../../shared/shared-service.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-sessions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-sessions.component.html',
  styleUrl: './edit-sessions.component.css'
})
export class EditSessionsComponent implements OnInit {
  session: any;
  formations: Trainings[] = [];
  formateurs: Trainer[] = [];
  candidats: Candidate[] = [];
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,
    private sharedS: SharedServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('id');
    if (sessionId) {
      this.sharedS.getSessionById(sessionId).subscribe((session) => (this.session = session));
      this.sharedS.getFormations().subscribe((data) => (this.formations = data));
      this.adminService.getFormateurs().subscribe((data) => (this.formateurs = data));
      this.adminService.getCandidats().subscribe((data) => (this.candidats = data));
    }
  }

 
  editSession(form: NgForm): void {
    if (form.valid) {
      this.sharedS.updateSession(this.session).subscribe({
        next: () => this.router.navigate(['/admin-space/sessions']),
        error: (error) => {
          this.errorMessage = 'Erreur lors de la modification de la session.';
        }
      });
    }
  }
  

   /************************************************** */
   onFormateurChange(event: any): void {
    const formateurId = event.target.value;
    if (event.target.checked) {
      this.session.formateurIds.push(formateurId);
    } else {
      this.session.formateurIds = this.session.formateurIds.filter((id:string) => id !== formateurId);
    }
  }

  onCandidatChange(event: any): void {
    const candidatId = event.target.value;
    if (event.target.checked) {
      this.session.candidatsInscrits.push(candidatId);
    } else {
      this.session.candidatsInscrits = this.session.candidatsInscrits.filter((id:string) => id !== candidatId);
    }
  }

}