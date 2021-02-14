import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisodetallePage } from './avisodetalle.page';

describe('AvisodetallePage', () => {
  let component: AvisodetallePage;
  let fixture: ComponentFixture<AvisodetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisodetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisodetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
