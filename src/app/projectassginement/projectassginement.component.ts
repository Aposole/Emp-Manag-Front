import { Component, OnInit } from '@angular/core';
import { Project } from '../project';

import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public projects: Project[] = [];
  public editProject: Project | undefined;
  public deleteProject: Project | undefined;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.getProjects();
  }

  public getProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
        console.log(this.projects);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProject(addForm: NgForm): void {
    this.projectService.addProject(addForm.value).subscribe(
      (response: Project) => {
        console.log(response);
        this.getProjects();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProject(project: Project): void {
    this.projectService.updateProject(project).subscribe(
      (response: Project) => {
        console.log(response);
        this.getProjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProject(projectId: number | undefined): void {
    if (projectId) {
      this.projectService.deleteProject(projectId).subscribe(
        () => {
          console.log('Project deleted successfully');
          this.getProjects();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      console.error('Project ID is not defined');
    }
  }

  public searchProjects(key: string): void {
    console.log(key);
    if (key) {
      const results: Project[] = this.projects.filter(project =>
        project.project_name.toLowerCase().includes(key.toLowerCase())
      );
      this.projects = results;
    } else {
      this.getProjects();
    }
  }

  public openModal(project: Project | null, mode: string): void {
    const container = document.getElementById('main-container');
    if (container && project) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      
      if (mode === 'add') {
        button.setAttribute('data-target', '#addProjectModal');
      } else if (mode === 'edit') {
        this.editProject = project;
        button.setAttribute('data-target', '#updateProjectModal');
      } else if (mode === 'delete') {
        this.deleteProject = project;
        button.setAttribute('data-target', '#deleteProjectModal');
      }
      
      container.appendChild(button);
      button.click();
    } else {
      console.log('Project or container is null');
    }
  }
}
