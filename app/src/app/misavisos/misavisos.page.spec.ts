import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisavisosPage } from './misavisos.page';

describe('MisavisosPage', () => {
  let component: MisavisosPage;
  let fixture: ComponentFixture<MisavisosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisavisosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisavisosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
