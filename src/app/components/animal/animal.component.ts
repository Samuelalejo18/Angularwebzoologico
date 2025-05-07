import { Component } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-animal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css'
})
export class AnimalComponent {

  animalList: any = [];
  animalForm: FormGroup | any;

  constructor(
    private animalService: AnimalService,
    private toastr: ToastrService,
    private fromBuilder: FormBuilder,
    private router: Router
  ) {
  }

  getAllAnimals() {
    console.log("En componente");
    this.animalService.getAllAnimalsData().subscribe((data: {}) => {
      this.animalList = data;
    })
  }

  newMessage(messageText: string) {
    this.toastr.success("Clic aqui para actualizar la lista", messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  ngOnInit() {
    this.animalForm = this.fromBuilder.group({
      nombre: "",
      edad: 0,
      tipo: ""
    });
    this.getAllAnimals();
  }
  newAnimalEntry() {
    this.animalService.newAnimal(this.animalForm.value).subscribe(
      () => {
        this.router.navigate(["/inicio"]).then(() => {
          this.newMessage("Registro exitoso")
        })
        /*
               .then(() => {
                  this.newMessage("Registro Exitoso")
                })
          */
      }
    )
  }

}


