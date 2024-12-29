export interface Session {
    id: string;
    formationId: number;
    formateurIds: number[];
    dateDebut: string;  // ISO 8601 format
    dateFin: string;    // ISO 8601 format
    description: string;
    candidatsInscrits: string[];  // Array
}
