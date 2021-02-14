import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearavisoPage } from './crearaviso.page';

describe('CrearavisoPage', () => {
  let component: CrearavisoPage;
  let fixture: ComponentFixture<CrearavisoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearavisoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearavisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
