import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from "../filter-categories.component";
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface CheckboxCategoryChangeEvent {
  category: string
  checked: boolean
}

export interface CategoryCategoryCollapseEvent {
  title: string,
  collapsed: boolean
}

@Component({
  selector: 'app-filter-categories-list',
  templateUrl: './filter-categories-list.component.html',
  styleUrls: ['./filter-categories-list.component.scss'],
})
export class FilterCategoriesListComponent {
  @Input() categoryOptions: string[];
  @Input() checkedCategories: string[];
  @Input() collapsed: boolean = true;
  @Output() onCheckboxChange: EventEmitter<CheckboxCategoryChangeEvent> = new EventEmitter<CheckboxCategoryChangeEvent>();
  @Output() onCollapseChange: EventEmitter<CategoryCategoryCollapseEvent> = new EventEmitter<CategoryCategoryCollapseEvent>();

  handleCategoryCollapse() {
    this.onCollapseChange.emit({
      title: "",
      collapsed: !this.collapsed
    })
  }

  handleCheckboxChange(event: MatCheckboxChange, category: string) {
    this.onCheckboxChange.emit({
      category,
      checked: event.checked
    })
  }
}
