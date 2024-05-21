import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


import { Personal } from '../../interfaces/personal.interface';
import { Training } from '../../interfaces/training.interface';
import { Experience } from '../../interfaces/experience.interface';
import { Competence } from '../../interfaces/competence.interface';
import { Project } from '../../interfaces/project.interface';



@Injectable({
    providedIn: 'root'
})


export class DataService {

    private httpClient = inject(HttpClient);


    private baseUrl = 'http://localhost:3000/api';

    getFullName() {
        return firstValueFrom(this.httpClient.get<String>(`${this.baseUrl}/fullName`));
    }

    getPersonaldata() {
        return firstValueFrom(this.httpClient.get<Personal[]>(`${this.baseUrl}/personal`));
    }

    getLastTraining(language: string) {

        return firstValueFrom(this.httpClient.get<Training>(`${this.baseUrl}/lastTraining/${language}`));
    }

    getProjects(language: string) {

        return firstValueFrom(this.httpClient.get<Project[]>(`${this.baseUrl}/projects/${language}`));
    }

    getTrainings(language: string) {
        return firstValueFrom(this.httpClient.get<Training[]>(`${this.baseUrl}/trainings/${language}`));
    }

    getExperiences(language: string) {
        return firstValueFrom(this.httpClient.get<Experience[]>(`${this.baseUrl}/experiences/${language}`));
    }

    getCompetences(language: string) {
        return firstValueFrom(this.httpClient.get<Competence[]>(`${this.baseUrl}/competences/${language}`));
    }

}