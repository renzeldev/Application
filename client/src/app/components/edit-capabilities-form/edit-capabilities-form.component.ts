import { Component, OnInit, Output, EventEmitter, Inject, InjectionToken } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray,  AbstractControl, FormControl } from '@angular/forms';
// import { trigger, transition, style, animate } from '@angular/animations';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { CapabilityService } from "../../services/capability";
import { Capability, CreatedCapability } from 'src/app/models/capability';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";
import { map } from 'rxjs/operators';

type FormKeys = "capability" | "details" | "softwareLevels" | "minimumSoftwareLevels";

interface FormObject {
  capability: FormGroup,
  details: FormGroup,
  softwareLevels: FormGroup,
  //minimumSoftwareLevels: FormGroup
}

@Component({
  selector: 'app-edit-capabilities-form',
  templateUrl: './edit-capabilities-form.component.html',
  styleUrls: ['./edit-capabilities-form.component.scss'],
  animations: [
    // trigger('slide-in', [
    //   transition('void => *', [
    //     style({ opacity: 0, top: '25%' }),
    //     animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 1, top: "10%" }))
    //   ])
    // ])
  ],
})
export class EditCapabilitiesFormComponent implements OnInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  forms: FormObject;
  stateOptions: string[];
  categoryOptions: string[];
  componentOptions: string[];
  packageOptions: string[];
  minimumSoftwareLevel: FormArray;
  id: any;
  capability: Capability;
  constructor(private fb: FormBuilder, private capabilityService: CapabilityService, private snackbar: MatSnackBar) {
   }

  add(event: MatChipInputEvent, controller, formStep: FormKeys, index = 0, packageIndex = 0): void {
    let tagsControler;
    if(formStep == "softwareLevels") {
      tagsControler = this.forms[formStep].controls['minimumSoftwareLevels']['controls'][index].controls['deploymentPackage']['controls'][packageIndex]['controls'][controller];
    } else {
      tagsControler = this.forms[formStep].controls[controller];
    }
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      tagsControler.setValue([...tagsControler.value, value.trim()]);
      // tagsControler.updateValueAndValidity();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  validateCapabilityName(ctrl: AbstractControl) {
    if (!ctrl.value) {
      return false
    }

    return this.capabilityService.isCapabilityNameAvaliable(ctrl.value).pipe(map(res => {
      return res.exists === true ? { name: true } : null;
    })).toPromise()
  }

  remove(fruit: string, controller: string, formStep: FormKeys, idx = 0, packageIdx = 0): void {
    let tagsControler;
    if(formStep == "softwareLevels") {
      tagsControler = this.forms[formStep].controls['minimumSoftwareLevels']['controls'][idx].controls['deploymentPackage']['controls'][packageIdx]['controls'][controller];
    } else {
      tagsControler = this.forms[formStep].controls[controller];
    }
    const index = tagsControler.value.indexOf(fruit);

    if (index >= 0) {
      tagsControler.value.splice(index, 1);
      tagsControler.updateValueAndValidity();
    }
  }


  ngOnInit(): void {
    this.id = localStorage.getItem('capability_id');
    this.forms = {
      capability: this.fb.group({
        name: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        category:  ['', Validators.required],
        state: ['', Validators.required],
        description: [''],
      }),

      details: this.fb.group({
        tags: this.fb.control([]),
        beamCompoundSemanticVersion: [''],
        supportingDocuments: this.fb.control([], [ Validators.required ])
      }),

      softwareLevels: this.fb.group({
        minimumSoftwareLevels: this.fb.array([
            this.fb.group({
            component: ['', Validators.required],
            deploymentPackage: this.fb.array([
              this.fb.group({
                packageLink: this.fb.control([], [ Validators.required ]),
                minimumVersion: [''],
                name: ['']
              })
            ])
          })
        ], [Validators.required]),
      })
    };


    //this.minimumSoftwareLevel = this.forms['softwareLevels'].get('minimumSoftwareLevels') as FormArray;
    this.stateOptions = [
        'New',
        'Published',
        'Deprecated'
  ],

     this.categoryOptions = [
         'Integration Capabilities',
         'System Capabilities',
         'Product Capabilities',
         'Deployment Capabilities'
    ],
    this.componentOptions = [
        'AEL',
        'CHA',
        'COBA',
        'CPM',
        'EDM',
        'FIN',
        'INV',
        'NTF',
        'RMCA',
        'SYS',
        'BAM',
        'BKE',
        'CIL',
        'CMN',
        'EPS',
        'GSF',
        'IOD',
        'MSG',
        'MSV',
        'SEC'
   ],
   this.packageOptions = [
       'BAE',
       'CHA service',
       'CHA',
       'CIL',
       'COBA Service',
       'COBA',
       'CPM',
       'CPM Service',
       'EDM',
       'EDM Service',
       'EPS',
       'FIN',
       'TAX',
       'CEL',
       'CUS',
       'TRM',
       'INV',
       'BI',
       'IOD SUF',
       'MSG',
       'MSV ADM',
       'MSV LGM',
       'MSV Test System',
       'NTF',
       'RMCA',
       'AAM',
       'GTM',
       'SEC PRM',
       'UMS',
       'System Function Control'
   ]
   this.capabilityService.getCapabilityById(this.id).subscribe(data => {
    this.capability = data;
    this.forms.capability.patchValue({
      name: this.capability.name,
      category: this.capability.category,
      description: this.capability.description,
      state: this.capability.state
    })
    this.forms.details.patchValue({
      tags: this.capability.tags,
      beamCompoundSemanticVersion: this.capability.beamCompoundSemanticVersion,
      supportingDocuments: this.capability.supportingDocuments
    })
    this.forms.softwareLevels.patchValue({
      minimumSoftwareLevels: this.capability.minimumSoftwareLevels
    })
   })
  }

  getFormArray(name, formStep: FormKeys, index = 0) {
    if(name == "deploymentPackage") {
      //console.log(this.forms[formStep].get('minimumSoftwareLevels')['controls'][index].get('deploymentPackage'))
      return this.forms[formStep].get('minimumSoftwareLevels')['controls'][index].get('deploymentPackage') as FormArray
    } else {
      return this.forms[formStep].get(name) as FormArray
    }

  }

  private handleHttpErrors(error: HttpErrorResponse) {
    console.log(error);
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

  handleSubmit() {
    const valid = Object.values(this.forms).every((form) => form.valid);

    const data = Object.values(this.forms).reduce((allData, currentForm) => {
      return { ...allData, ...currentForm.value };
    }, {});

    if (valid) {
      let updatedCapabilityObservable = this.capabilityService.updateCapability(data, this.id);

      updatedCapabilityObservable.subscribe((updatedCapability: CreatedCapability) => {
        this.onSubmit.emit(data);
      }, this.handleHttpErrors.bind(this))
    }
  }

  removeMinimumSoftwareLevelField(formStep: FormKeys) {
    const controller = this.forms[formStep].get('minimumSoftwareLevels') as FormArray;
    const index = controller.value.length - 1;

    if (index >= 0) {
      return controller.removeAt(index);
    }
  }

  addMinimumSoftwareLevelField(formStep: FormKeys) {
    const controller = this.forms[formStep].get('minimumSoftwareLevels') as FormArray;

    controller.push(this.fb.group({
      component: ['', Validators.required],
      deploymentPackage: this.fb.array([
        this.fb.group({
          packageLink: this.fb.control([], [ Validators.required ]),
          minimumVersion: [''],
          name: ['']
        })
      ])
    }))
  }
  addDeploymentPackageField(index){
    const controller = this.forms['softwareLevels'].get('minimumSoftwareLevels')['controls'][index].get('deploymentPackage') as FormArray;

    controller.push(this.fb.group({
      name: [''],
      minimumVersion: [''],
      packageLink: ['']
    }))
  }
}
