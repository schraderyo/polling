import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_LOCALE_PROVIDER,
  MAT_DATE_FORMATS,
  MatRippleModule,
  MatNativeDateModule,
  NativeDateAdapter,
} from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";

export const ISO_FORMAT = {
  parse: {
    dateInput: "LL",
  },
  display: {
    dateInput: "MM/DD/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatBadgeModule,
    MatToolbarModule,
    MatStepperModule,
    MatRadioModule,
  ],
  exports: [
    MatButtonModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatBadgeModule,
    MatToolbarModule,
    MatStepperModule,
    MatRadioModule,
  ],
  declarations: [],
  providers: [
    MAT_DATE_LOCALE_PROVIDER,
    { provide: MAT_DATE_FORMATS, useValue: ISO_FORMAT },
  ],
})
export class MaterialModule {}
