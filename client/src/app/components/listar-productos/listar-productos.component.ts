import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto'
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
listProductos: Producto[] = [];
  http: any;

constructor( private _productoService: ProductoService,
  private toastr: ToastrService)  { }

ngOnInit(): void {
this.obtenerProductos();
}

obtenerProductos() {
this._productoService.getProductos().subscribe(data => {
  console.log(data);
  this.listProductos = data;
}, error => {
  console.log(error);
})

}

eliminarProducto(id: any) {
  this._productoService.eliminarProducto(id).subscribe(data => {
this.toastr.error('El Producto fue eliminado con Exito!!!', 'Producto Eliminado');
this.obtenerProductos();
  }, error => {
    console.log(error);

  })
}
}
