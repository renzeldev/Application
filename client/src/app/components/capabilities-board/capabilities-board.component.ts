import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { Capability } from "../../models/capability";
import { CapabilityService } from "../../services/capability";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from '@angular/common/http';
import { CheckedCategories } from '../filter-categories/filter-categories.component';

@Component({
  selector: 'app-capabilities-board',
  templateUrl: './capabilities-board.component.html',
  styleUrls: ['./capabilities-board.component.scss']
})
export class CapabilitiesBoardComponent implements OnInit {
  @Output() capabilitiesLoaded: EventEmitter<any> = new EventEmitter();
  @Input() updateCapabilities: EventEmitter<any>;
  @Input() tagsFilter: string[];
  @Input() categoriesFilter: string[];
  @Input() search: string = '';

  capabilities: Capability[] = [];
  hasLoadedData: boolean = false;
  fetchErrored: boolean = false;

  constructor(private capabilityService: CapabilityService, private snackbar: MatSnackBar, private cd: ChangeDetectorRef) { }

  fetchCapabilites() {
    this.capabilityService.getCapabilities().subscribe((capabilities: Capability[]) => {
      this.hasLoadedData = true;
      this.capabilities = capabilities.filter(capability => {
        if(!capability.deleted) return true
      });
      this.capabilitiesLoaded.emit(this.capabilities);
    }, this.handleHttpErrors.bind(this))
  }

  private handleHttpErrors(error: HttpErrorResponse) {
    this.fetchErrored = true;

    const notifyError = (msg: string) => this.snackbar.open(msg, 'close', { duration: 5000, panelClass: "snackbar-error-message" });

    switch (error.status) {
      case 403:
        return notifyError('missing login credentials, please login');

      case 401:
        return notifyError('invalid login credentials, please logout and login again');

      case 500:
        return notifyError('server error occured, please try again later');

      default:
        return notifyError('unkown error occured');
    }
  }

  ngOnInit(): void {
    this.fetchCapabilites();
    this.updateCapabilities.subscribe(() => this.fetchCapabilites())
  }

  get filteredCapabilities() {
    let results = [];
    const filteredTags = this.tagsFilter || [];
    const filteredCategories = this.categoriesFilter || [];
    const capabilitesToFilter = this.capabilities.slice();

    const emptySearch = this.search.length === 0;
    const emptyTagsFilter = filteredTags.length === 0;
    const emptyCategoriesFilter = filteredCategories.length === 0;
    if (emptyTagsFilter && emptySearch && emptyCategoriesFilter) {
      return capabilitesToFilter;
    }
    if(!emptyTagsFilter && emptyCategoriesFilter) {
      return capabilitesToFilter.filter(capability => {
        // if (!filteredTags.includes(capability.category.name) && emptySearch) {
        //   return false
        // }

        // Make all search fields lowercase, more readable to do it beforehand
        const loweredName = capability.name.toLowerCase();
        const loweredDescription = capability.description.toLowerCase();
        const loweredSearch = this.search.toLowerCase();

        // Check if the name and category.name fields loosely match the search, if the search is empty, default to false
        const hasSearchTerm = this.search.length ?
          loweredName.includes(loweredSearch) ||
          loweredDescription.includes(loweredSearch)
        : false;

        let tagsToFilterBy = !emptyTagsFilter ? this.tagsFilter : [];
        tagsToFilterBy = tagsToFilterBy || [];
        const isTagIncluded = capability.tags.some(tag => tagsToFilterBy.includes(tag));

        /**
         * This checks if the capability has atleast one of the checked tags.
         * If you want a stricter check that it has to include all tags, change the method .some to .every
         */
        return isTagIncluded || hasSearchTerm;
      })
    } else if(emptyTagsFilter && !emptyCategoriesFilter) {
      return capabilitesToFilter.filter(capability => {
        // if (!filteredTags.includes(capability.category.name) && emptySearch) {
        //   return false
        // }

        // Make all search fields lowercase, more readable to do it beforehand
        const loweredName = capability.name.toLowerCase();
        const loweredDescription = capability.description.toLowerCase();
        const loweredSearch = this.search.toLowerCase();

        // Check if the name and category.name fields loosely match the search, if the search is empty, default to false
        const hasSearchTerm = this.search.length ?
          loweredName.includes(loweredSearch) ||
          loweredDescription.includes(loweredSearch)
        : false;

        let categoriesToFilterBy = !emptyCategoriesFilter ? this.categoriesFilter : [];
        categoriesToFilterBy = categoriesToFilterBy || [];
        const isCategoryIncluded = categoriesToFilterBy.includes(capability.category) ? true : false;
        /**
         * This checks if the capability has atleast one of the checked tags.
         * If you want a stricter check that it has to include all tags, change the method .some to .every
         */
        return isCategoryIncluded || hasSearchTerm;
      })
    } else if (!emptyTagsFilter && !emptyCategoriesFilter) {
      results = capabilitesToFilter.filter(capability => {

        // Make all search fields lowercase, more readable to do it beforehand
        const loweredName = capability.name.toLowerCase();
        const loweredDescription = capability.description.toLowerCase();
        const loweredSearch = this.search.toLowerCase();

        // Check if the name and category.name fields loosely match the search, if the search is empty, default to false
        const hasSearchTerm = this.search.length ?
          loweredName.includes(loweredSearch) ||
          loweredDescription.includes(loweredSearch)
        : false;

        let tagsToFilterBy = !emptyTagsFilter ? this.tagsFilter : [];
        tagsToFilterBy = tagsToFilterBy || [];
        const isTagIncluded = capability.tags.some(tag => tagsToFilterBy.includes(tag));

        /**
         * This checks if the capability has atleast one of the checked tags.
         * If you want a stricter check that it has to include all tags, change the method .some to .every
         */
        return isTagIncluded || hasSearchTerm;
      })
      results = results.filter(capability => {
        // if (!filteredTags.includes(capability.category.name) && emptySearch) {
        //   return false
        // }

        // Make all search fields lowercase, more readable to do it beforehand
        const loweredName = capability.name.toLowerCase();
        const loweredDescription = capability.description.toLowerCase();
        const loweredSearch = this.search.toLowerCase();

        // Check if the name and category.name fields loosely match the search, if the search is empty, default to false
        const hasSearchTerm = this.search.length ?
          loweredName.includes(loweredSearch) ||
          loweredDescription.includes(loweredSearch)
        : false;

        let categoriesToFilterBy = !emptyCategoriesFilter ? this.categoriesFilter : [];
        categoriesToFilterBy = categoriesToFilterBy || [];
        const isCategoryIncluded = categoriesToFilterBy.includes(capability.category) ? true : false;
        /**
         * This checks if the capability has atleast one of the checked tags.
         * If you want a stricter check that it has to include all tags, change the method .some to .every
         */
        return isCategoryIncluded || hasSearchTerm;
      })
      return results;
    }


  }
}
