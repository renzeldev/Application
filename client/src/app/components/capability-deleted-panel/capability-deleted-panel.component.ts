import { Component, OnInit, Input } from '@angular/core';
import { CreatedCapability } from 'src/app/models/capability';
import { Router } from "@angular/router";


@Component({
  selector: 'app-deleted-capability-panel',
  templateUrl: './capability-deleted-panel.component.html',
  styleUrls: ['./capability-deleted-panel.component.scss']
})
export class CapabilityDeletedPanelComponent implements OnInit {
  @Input() capability: CreatedCapability

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handlePanelClick(capabilityID: string) {
    this.router.navigateByUrl(`/capabilities/${capabilityID}`);
  }
}
