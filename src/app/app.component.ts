import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanagerapp';
  public employees: Employee[] = [];
  public editEmployee: Employee = {} as Employee;
  public deleteEmployee: Employee = {} as Employee;
  public searchKey = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching employees:', error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log('Employee added:', response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding employee:', error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log('Employee updated:', response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating employee:', error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number | undefined): void {
    if (employeeId) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        () => {
          console.log('Employee deleted');
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting employee:', error.message);
        }
      );
    } else {
      console.error('Employee ID is not defined');
    }
  }

  public searchEmployees(key: string): void {
    if (!key) {
      this.getEmployees();
      return;
    }
    const results: Employee[] = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(key.toLowerCase()) ||
      employee.email.toLowerCase().includes(key.toLowerCase()) ||
      employee.phone.toLowerCase().includes(key.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(key.toLowerCase())
    );
    this.employees = results;
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    } else if (mode === 'edit' && employee) {
      this.editEmployee = { ...employee }; // Spread operator ensures a deep copy
      button.setAttribute('data-target', '#updateEmployeeModal');
    } else if (mode === 'delete' && employee) {
      this.deleteEmployee = { ...employee }; // Spread operator ensures a deep copy
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    if (container) {
      container.appendChild(button);
      button.click();
    } else {
      console.error('Main container element not found');
    }
  }
}
