import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxChangeEvent, CategoryCollapseEvent } from "./filter-category-item/filter-category-item.component";
import { Capability } from 'src/app/models/capability';
import { CheckboxTagChangeEvent } from './filter-tags-item/filter-tags-item.component';
import { CheckboxCategoryChangeEvent } from './filter-categories/filter-categories-list.component';

export interface Category {
  title: string,
  categories: string[]
}

export interface CheckedCategories {
  [key: string]: string[]
}

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.scss']
})
export class FilterCategoriesComponent implements OnInit {
  @Input() capabilityEvents: EventEmitter<Capability[]>;
  @Output() filterTagsChange: EventEmitter<string[]> = new EventEmitter();
  @Output() filterCategoriesChange: EventEmitter<string[]> = new EventEmitter();

  categories: Category[];
  tags: string[];
  categoryOptions = [
    'Integration Capabilities',
    'System Capabilities',
    'Product Capabilities',
    'Deployment Capabilities'
  ];
  capabilites: Capability[];

  title?: string;
  checkedCategories: string[] = [];
  checkedTags: string[] = [];
  collapsedTags: string[] = [];

  constructor() { }

  private toggleTag(checkbox: CheckboxTagChangeEvent, allTags: string[]) {
    const tagsExists = Array.isArray(allTags);
    // if the key does not exist, default it to an empty array
    if (!tagsExists) {
      this.checkedTags = [];
    }

    const tags = this.checkedTags;

    // add the cateogry to the checkbox
    if (checkbox.checked) {
      return this.checkedTags.push(checkbox.tag)
    }

    // remove the category from the array
    const index = tags.findIndex(_tag => _tag === checkbox.tag);
    this.checkedTags.splice(index, 1);

    // if we have no checkboxes checked, delete the key
    if (tags.length === 0) {
      this.checkedTags = [];
    }
  }

  private toggleCategory(checkbox: CheckboxCategoryChangeEvent, allCategories: string[]) {
    const categoriesExists = Array.isArray(allCategories);
    // if the key does not exist, default it to an empty array
    if (!categoriesExists) {
      this.checkedCategories = [];
    }

    const categories = this.checkedCategories;

    // add the cateogry to the checkbox
    if (checkbox.checked) {
      return this.checkedCategories.push(checkbox.category)
    }

    // remove the category from the array
    const index = categories.findIndex(_category => _category === checkbox.category);
    this.checkedCategories.splice(index, 1);

    // if we have no checkboxes checked, delete the key
    if (categories.length === 0) {
      this.checkedCategories = [];
    }
  }

  private toggleCollapsedTag(event: CategoryCollapseEvent) {
    const alreadyCollapsed = this.collapsedTags.includes(event.title);

    // the category should become collapsed, and its not already collapsed
    if (event.collapsed && !alreadyCollapsed) {
      return this.collapsedTags.push(event.title);
    }

    // the category should become expanded, and its not already expanded
    if (!event.collapsed && alreadyCollapsed) {
      const index = this.collapsedTags.findIndex(_title => _title === event.title);
      return this.collapsedTags.splice(index, 1);
    }
  }

  private toggleCollapsedCategory(event: CategoryCollapseEvent) {
    const alreadyCollapsed = this.collapsedTags.includes(event.title);

    // the category should become collapsed, and its not already collapsed
    if (event.collapsed && !alreadyCollapsed) {
      return this.collapsedTags.push(event.title);
    }

    // the category should become expanded, and its not already expanded
    if (!event.collapsed && alreadyCollapsed) {
      const index = this.collapsedTags.findIndex(_title => _title === event.title);
      return this.collapsedTags.splice(index, 1);
    }
  }

  handleCheckboxChange(checkbox: CheckboxTagChangeEvent, tags: string[]) {
    this.toggleTag(checkbox, tags);
    this.filterTagsChange.emit(this.checkedTags);
  }

  handleCategoryCheckboxChange(checkbox: CheckboxCategoryChangeEvent, categories: string[]) {
    this.toggleCategory(checkbox, categories);
    this.filterCategoriesChange.emit(this.checkedCategories);
  }

  handleCollapseChange(event: CategoryCollapseEvent) {
    this.toggleCollapsedTag(event);
  }
  handleCategoryCollapseChange(event: CategoryCollapseEvent) {
    this.toggleCollapsedCategory(event);
  }

  handleCollapseToggle() {
    const shouldCollapseAll = this.collapsedTags.length === 0;

    if (shouldCollapseAll) {
      return this.collapsedTags = this.categories.map(category => category.title);
    }

    this.collapsedTags = [];
  }

  ngOnInit(): void {
    this.capabilityEvents.subscribe(this.handleCapabilityLoaded.bind(this));
  }

  private handleCapabilityLoaded(capabilites: Capability[]) {
    // NEED TO REFACTOR THIS, REALLY HARD TO READ

    /**
     * Take the capability category name and tags and put it in a format as the Category[] type.
     * The tags property of Capability is the categories property of Category.
     */
    const categories = capabilites.reduce((prev: Category[], capability: Capability) => {
      const name = capability.category;
      const index = prev.findIndex(cat => cat.title === name);

      const categoryAlreadyAdded = capability.tags.some(tag => {
        return prev.some(prevCat => prevCat.categories.includes(tag) && prevCat.title === name)
      });

      // If the category already exists, append it to its categories array aslong as its tags has not already been added
      if (index !== -1 && !categoryAlreadyAdded) {
        prev[index].categories = [...prev[index].categories, ...capability.tags];

        return prev;
      }

      // If the category group does not exist and has not added it tags, create a new one and add the current tags
      if (!categoryAlreadyAdded) {
        return [ ...prev, { title: name, categories: capability.tags } ];
      }

      return prev
    }, []);

    this.categories = categories;
    this.tags = [];
    this.categories.map(category => {
      this.tags.push(...category.categories);
    })
    this.tags = this.getUnique(this.tags);
  }

  clearCheckedTags() {
    this.checkedTags = [];
    this.filterTagsChange.emit(this.checkedTags);
  }

  getUnique(array){
    var uniqueArray = [];

    for(var value of array){
        if(uniqueArray.indexOf(value) === -1){
            uniqueArray.push(value);
        }
    }
    return uniqueArray;
  }
}
