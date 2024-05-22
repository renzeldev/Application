import { Component, OnInit, Injector, Inject, ViewContainerRef, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Capability, CreatedCapability } from 'src/app/models/capability';
import { CapabilityService } from "../../services/capability";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ComponentPortal } from "@angular/cdk/portal";
import { EditCapabilitiesFormComponent } from "../../components/edit-capabilities-form/edit-capabilities-form.component";
interface DialogData {
  shouldDelete: boolean,
  capability: CreatedCapability
}

@Component({
  selector: 'app-capability-dialog',
  templateUrl: './capability-dialog.component.html',
  styleUrls: ['./capability.component.scss']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  setShouldDelete(shouldDelete: boolean) {
    this.dialogRef.close({ ...this.data, shouldDelete });
  }
}

@Component({
  selector: 'app-capability',
  templateUrl: './capability.component.html',
  styleUrls: ['./capability.component.scss']
})
export class CapabilityComponent implements OnInit {
  updateCababilites: EventEmitter<any> = new EventEmitter();
  capabilities: EventEmitter<Capability[]> = new EventEmitter();
  id: string;
  capability: Capability;


constructor(private injector: Injector, public overlay: Overlay, public viewContainerRef: ViewContainerRef, private router: Router, private route: ActivatedRoute, private capabilityService: CapabilityService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;

      this.capabilityService.getCapabilityById(id).subscribe(data => {
        this.capability = data;
      })
    });
  }

  openConfirm() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "clamp(400px, 30vw, 800px)",
      data: { capability: this.capability }
    });

    dialogRef.afterClosed().subscribe(this.handleDialogEvent.bind(this));
  }

  private handleDialogEvent(event: DialogData) {
    const { capability, shouldDelete } = event;

    if (!shouldDelete) {
      return;
    }

    this.capabilityService.deleteCapability(capability.id).subscribe(response => {
      this.router.navigateByUrl('/');
    })
  }

  handleOpenCapabilityForm() {
   // based from this demo https://stackblitz.com/edit/overlay-demo
   localStorage.setItem('capability_id', this.id);
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
   const componentRef = overlayRef.attach(new ComponentPortal(EditCapabilitiesFormComponent, this.viewContainerRef));

   componentRef.instance.onSubmit.subscribe(formData => {
     overlayRef.dispose();
     this.fetchCapabilities();
   })
 }

 private fetchCapabilities() {
   this.updateCababilites.emit();
 }

 createInjector(dataToPass) {
   // const injectorTokens = new WeakMap();
   // injectorTokens.set(CONTAINER_DATA, dataToPass);
   // return new PortalInjector(this.injector, injectorTokens);
 }

}

