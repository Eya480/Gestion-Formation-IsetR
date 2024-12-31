import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SharedServiceService } from '../../shared/shared-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalCandidats: number = 0;
  totalFormateurs: number = 0;
  totalSessions: number = 0;
  totalTrainings: number = 0;

  constructor(private adminService: AdminService,private sharedService : SharedServiceService) {}

  ngOnInit(): void {
    // Récupérer le nombre de candidats
    this.adminService.getCandidats().subscribe((data) => {
      this.totalCandidats = data.length;
    });

    // Récupérer le nombre de formateurs
    this.adminService.getFormateurs().subscribe((data) => {
      this.totalFormateurs = data.length;
    });

    // Récupérer le nombre de sessions
    this.adminService.getSessions().subscribe((data) => {
      this.totalSessions = data.length;
    });

    // Récupérer le nombre de trainings
    this.sharedService.getFormations().subscribe((data) => {
      this.totalTrainings = data.length;
    });
  }
}
