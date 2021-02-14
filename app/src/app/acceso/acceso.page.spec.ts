import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccesoPage } from './acceso.page';

describe('AccesoPage', () => {
  let component: AccesoPage;
  let fixture: ComponentFixture<AccesoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
