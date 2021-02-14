import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaMensajesPage } from './lista-mensajes.page';

describe('ListaMensajesPage', () => {
  let component: ListaMensajesPage;
  let fixture: ComponentFixture<ListaMensajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMensajesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaMensajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
