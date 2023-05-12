import { Producto } from './../../models/producto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit{
  productoForm: FormGroup;
titulo = 'Crear Producto';
id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

ngOnInit(): void {
  this.esEditar();
}

agregarProducto(){
  console.log(this.productoForm);

  console.log(this.productoForm.get('producto')?.value);

  const PRODUCTO: Producto = {
    nombre: this.productoForm.get('producto')?.value,
    categoria: this.productoForm.get('categoria')?.value,
    ubicacion: this.productoForm.get('ubicacion')?.value,
    precio: this.productoForm.get('precio')?.value
  }
if (this.id !== null) {
  //editamos el produ

  this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data=>{
    this.toastr.info('Producto Actualizado con Exito!', 'Producto Actualizado!');
    this.router.navigate(['/']);
  }, error => {
    console.log(error);
  this.productoForm.reset();
})

} else {
  // agregamos produ nuevo

  console.log(PRODUCTO);
  this._productoService.guardarProducto(PRODUCTO).subscribe(data =>{
    this.toastr.success('Producto Registrado con Exito!', 'Producto Registrado!');
    this.router.navigate(['/']);
  }, error => {
    console.log(error);
  this.productoForm.reset();
  })

}



}

esEditar(){

if(this.id !== null){
  this.titulo = 'Editar Producto'
  this._productoService.obtenerProducto(this.id).subscribe(data =>{
this.productoForm.setValue({

      producto: data.nombre,
      categoria: data.categoria,
      ubicacion: data.ubicacion,
      precio: data.precio

})

  })
}


}

}
