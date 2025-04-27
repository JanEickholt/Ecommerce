import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBreadcrumbComponent } from './category-breadcrumb.component';

describe('CategoryBreadcrumbComponent', () => {
  let component: CategoryBreadcrumbComponent;
  let fixture: ComponentFixture<CategoryBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
