import { Component, ViewContainerRef, EventEmitter } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from "@angular/cdk/portal";
import { CreateCapabilitiesFormComponent } from "../../components/create-capabilities-form/create-capabilities-form.component";
import { Capability } from 'src/app/models/capability';
import { CheckedCategories } from 'src/app/components/filter-categories/filter-categories.component';
import { CapabilityService } from "../../services/capability";

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.scss']
})
export class DeletedComponent {
  updateCababilites: EventEmitter<any> = new EventEmitter();
  capabilities: EventEmitter<Capability[]> = new EventEmitter();
  tagsFilter: string[];
  categoriesFilter: string[];
  search: string = '';

  constructor(public overlay: Overlay, public viewContainerRef: ViewContainerRef, private capabilityService: CapabilityService) {}

  private fetchCapabilities() {
    this.updateCababilites.emit();
  }

  handleOpenCapabilityForm() {
    // based from this demo https://stackblitz.com/edit/overlay-demo
    let config = new OverlayConfig();

    config.positionStrategy = this.overlay.position()
      .global()
      .left('0px')
      .top('10vh')
      .centerHorizontally();

      config.scrollStrategy = this.overlay.scrollStrategies.block();

    config.hasBackdrop = true;

    let overlayRef = this.overlay.create({ ...config, panelClass: "capability-backdrop-panel",  });

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose()
    });

    const componentRef = overlayRef.attach(new ComponentPortal(CreateCapabilitiesFormComponent, this.viewContainerRef));

    componentRef.instance.onSubmit.subscribe(formData => {
      overlayRef.dispose();
      this.fetchCapabilities();
    })
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
