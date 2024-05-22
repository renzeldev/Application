import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from "../filter-categories.component";
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface CheckboxChangeEvent {
  category: string
  checked: boolean
}

export interface CategoryCollapseEvent {
  title: string,
  collapsed: boolean
}

@Component({
  selector: 'app-filter-category-item',
  templateUrl: './filter-category-item.component.html',
  styleUrls: ['./filter-category-item.component.scss'],
})
export class FilterCategoryItemComponent {
  @Input() category: Category;
  @Input() checkedCategories: string[];
  @Input() collapsed: boolean = true;
  @Output() onCheckboxChange: EventEmitter<CheckboxChangeEvent> = new EventEmitter<CheckboxChangeEvent>();
  @Output() onCollapseChange: EventEmitter<CategoryCollapseEvent> = new EventEmitter<CategoryCollapseEvent>();

  handleCategoryCollapse() {
    this.onCollapseChange.emit({
      title: this.category.title,
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
