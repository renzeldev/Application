import { Component, OnInit, Input } from '@angular/core';
import { CreatedCapability } from 'src/app/models/capability';
import { Router } from "@angular/router";

@Component({
  selector: 'app-capability-panel',
  templateUrl: './capability-panel.component.html',
  styleUrls: ['./capability-panel.component.scss']
})
export class CapabilityPanelComponent implements OnInit {
  @Input() capability: CreatedCapability

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handlePanelClick(capabilityID: string) {
    this.router.navigateByUrl(`/capabilities/${capabilityID}`);
  }
}
