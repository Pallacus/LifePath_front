import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

import { UtilityService } from '../../core/services/utility.service';
import { DataService } from '../../core/services/data.service';
import { Personal } from '../../interfaces/personal.interface';
import { Project } from '../../interfaces/project.interface';
import { Competence } from '../../interfaces/competence.interface';
import { Training } from '../../interfaces/training.interface';
import { Experience } from '../../interfaces/experience.interface';



@Component({
  selector: 'app-data',
  standalone: true,
  imports: [],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {

  utilityService = inject(UtilityService);
  dataService = inject(DataService);

  language: string = "cas";

  lastTrainingTitle: string = "Formación en programación";
  featuredProjectsTitle: string = "Proyectos destacados";
  competencesTitle: string = "Competencias";
  trainingTitle: string = "Formación";
  experienceTitle: string = "Experiencia";

  fullName: String = "Loading data ...";
  personalData: Personal = {
    _id: "",
    featured: false,
    name: "",
    last_name: "",
    email: "",
    phone_number: "",
    city: "",
    git: ""
  };
  lastTraining: Training | any = {
    _id: "",
    featured: true,
    language: "",
    date: "",
    academy: "",
    title: "",
    description: ""
  };
  featuredProjects: Project[] = [];
  competences: Competence[] = [];
  trainings: Training[] = [];
  experiences: Experience[] = [];

  hidePersonal: Boolean = true;
  hideLastTraining: Boolean = true;
  hideFeaturedProjects: Boolean = true;
  hideCompetences: Boolean = true;
  hideElse: Boolean = true;

  async ngOnInit() {

    this.setLanguageTitles();

    try {
      this.fullName = await this.dataService.getFullName();

    } catch (error: any) {
      console.error(error.message);
      Swal.fire(
        'Error!',
        `An error has occurred wile retrieving the data. We apologize`,
        'error'
      );
    }
    this.getData();
  }

  setLanguage(chosenLanguage: string) {

    this.language = chosenLanguage;

    this.setLanguageTitles();
    this.getData();
  }

  setLanguageTitles() {

    if (this.language === "ca") {

      this.lastTrainingTitle = "Formació en programació";
      this.featuredProjectsTitle = "Projectes destacats";
      this.competencesTitle = "Competències";
      this.trainingTitle = "Formació";
      this.experienceTitle = "Experiència";

    }

    if (this.language === "cas") {

      this.lastTrainingTitle = "Formación en programación";
      this.featuredProjectsTitle = "Proyectos destacados";
      this.competencesTitle = "Competencias";
      this.trainingTitle = "Formación";
      this.experienceTitle = "Experiencia";

    }

    if (this.language === "en") {

      this.lastTrainingTitle = "Developer training";
      this.featuredProjectsTitle = "Featured projects";
      this.competencesTitle = "Competencies";
      this.trainingTitle = "Training";
      this.experienceTitle = "Experience";

    }

  }

  async getData() {
    try {
      const personalDatas = await this.dataService.getPersonaldata();
      this.personalData = personalDatas[0];

    } catch (error: any) {
      console.error(error.message);
    }

    try {

      this.lastTraining = await this.dataService.getLastTraining(this.language);
      this.lastTraining.date = dayjs(this.lastTraining.date).format('YYYY');

    } catch (error: any) {
      console.error(error.message);
    }

    try {
      this.featuredProjects = await this.dataService.getProjects(this.language);

    } catch (error: any) {
      console.error(error.message);
    }

    try {
      this.competences = await this.dataService.getCompetences(this.language);

    } catch (error: any) {
      console.error(error.message);
    }

    try {
      this.trainings = await this.dataService.getTrainings(this.language);
      for (const training of this.trainings) {
        training.date = dayjs(training.date).format('YYYY');
      }

    } catch (error: any) {
      console.error(error.message);
    }

    try {
      this.experiences = await this.dataService.getExperiences(this.language);

      for (const experience of this.experiences) {
        experience.date_from = dayjs(experience.date_from).format('YYYY');
        experience.date_to = dayjs(experience.date_to).format('YYYY');
      }

    } catch (error: any) {
      console.error(error.message);
      Swal.fire(
        'Error!',
        `An error has occurred wile retrieving the data. We apologize`,
        'error'
      );
    }
  }
}
