export interface Session {
    id: string;
    formationId: string;
    formateurIds: string[];
    dateDebut: string;  
    dateFin: string;    
    description: string;
    candidatsInscrits: string[];//ids des candidats
}
