import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OverlayModule } from "@angular/cdk/overlay"
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from "@angular/material/select"
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from "@angular/material/stepper";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilterCategoriesComponent } from './components/filter-categories/filter-categories.component';
import { FilterCategoryItemComponent } from './components/filter-categories/filter-category-item/filter-category-item.component';
import { FilterTagsItemComponent } from './components/filter-categories/filter-tags-item/filter-tags-item.component';
import { FilterCategoriesListComponent } from './components/filter-categories/filter-categories/filter-categories-list.component';
import { SearchCapabilitiesComponent } from './components/search-capabilities/search-capabilities.component';
import { CreateCapabilitiesFormComponent } from './components/create-capabilities-form/create-capabilities-form.component';
import { EditCapabilitiesFormComponent } from './components/edit-capabilities-form/edit-capabilities-form.component';
import { CapabilityPanelComponent } from './components/capability-panel/capability-panel.component';


import { CapabilitiesDeletedBoardComponent } from './components/capabilities-deleted-board/capabilities-deleted-board.component';

import { CapabilitiesBoardComponent } from './components/capabilities-board/capabilities-board.component';


import { CapabilityDeletedPanelComponent } from './components/capability-deleted-panel/capability-deleted-panel.component';


import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component'
import { DeletedComponent } from './views/deleted/deleted.component';
;
import { CapabilitiesBinBoardComponent } from './components/capabilities-bin-board/capabilities-bin-board.component';
import { BinComponent } from './views/bin/bin.component';
import { CapabilityComponent, DialogComponent } from './views/capability/capability.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilterCategoriesComponent,
    FilterCategoryItemComponent,
    FilterTagsItemComponent,
    FilterCategoriesListComponent,
    SearchCapabilitiesComponent,
    CreateCapabilitiesFormComponent,
    EditCapabilitiesFormComponent,
    CapabilitiesBoardComponent,
    DialogComponent,
    
    CapabilitiesBinBoardComponent,
    HomeComponent,
    BinComponent,
    LoginComponent,
    CapabilityComponent,

    DeletedComponent,

    CapabilityPanelComponent,

    CapabilityDeletedPanelComponent,
    CapabilitiesDeletedBoardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    OverlayModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatChipsModule,
    HttpClientModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
