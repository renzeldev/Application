import { Component, ViewContainerRef, EventEmitter } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from "@angular/cdk/portal";
import { CreateCapabilitiesFormComponent } from "../../components/create-capabilities-form/create-capabilities-form.component";
import { Capability } from 'src/app/models/capability';
import { CheckedCategories } from 'src/app/components/filter-categories/filter-categories.component';
import { CapabilityService } from "../../services/capability";

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent {
  updateCababilites: EventEmitter<any> = new EventEmitter();
  capabilities: EventEmitter<Capability[]> = new EventEmitter();
  tagsFilter: string[];
  categoriesFilter: string[];
  search: string = '';

  constructor(public overlay: Overlay, public viewContainerRef: ViewContainerRef, private capabilityService: CapabilityService) {}

  private fetchCapabilities() {
    this.updateCababilites.emit();
  }
  setCapabilites(capabilities: Capability[]) {
    this.capabilities.emit(capabilities);
  }

  setTagsFilter(tags: string[]) {
    this.tagsFilter = tags;
  }

  setCategoriesFilter(categories: string[]) {
    this.categoriesFilter = categories;
  }
  setSearch(search: string) {
    this.search = search;
  }

}
