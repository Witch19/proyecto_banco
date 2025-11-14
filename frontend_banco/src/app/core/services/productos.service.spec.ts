import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductosService } from './productos.service';

describe('ProductosService', () => {
  let service: ProductosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductosService]
    });

    service = TestBed.inject(ProductosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe llamar GET productos', () => {
    service.getProductos().subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/products`);
    expect(req.request.method).toBe('GET');
  });

  it('debe llamar POST crear producto', () => {
    const producto = { id: '1' } as any;

    service.crearProducto(producto).subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/products`);
    expect(req.request.method).toBe('POST');
  });
});
