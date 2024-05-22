import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from "../filter-categories.component";
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface CheckboxTagChangeEvent {
  tag: string
  checked: boolean
}

export interface CategoryCollapseEvent {
  title: string,
  collapsed: boolean
}

@Component({
  selector: 'app-filter-tags-item',
  templateUrl: './filter-tags-item.component.html',
  styleUrls: ['./filter-tags-item.component.scss'],
})
export class FilterTagsItemComponent {
  @Input() tags: string[];
  @Input() checkedTags: string[];
  @Input() collapsed: boolean = true;
  @Output() onCheckboxChange: EventEmitter<CheckboxTagChangeEvent> = new EventEmitter<CheckboxTagChangeEvent>();
  @Output() onCollapseChange: EventEmitter<CategoryCollapseEvent> = new EventEmitter<CategoryCollapseEvent>();

  handleCategoryCollapse() {
    this.onCollapseChange.emit({
      title: "",
      collapsed: !this.collapsed
    })
  }

  handleCheckboxChange(event: MatCheckboxChange, tag: string) {
    this.onCheckboxChange.emit({
      tag,
      checked: event.checked
    })
  }
}
