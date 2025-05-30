import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoNotaComponent } from './lancamento-nota.component';

describe('LancamentoNotaComponent', () => {
  let component: LancamentoNotaComponent;
  let fixture: ComponentFixture<LancamentoNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoNotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
