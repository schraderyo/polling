import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";
import { RouterModule } from "@angular/router";
import { FabComponent } from "./components/fab/fab.component";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { ClickOutsideModule } from 'ng-click-outside';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { ExportDialogComponent } from './components/dialog/export-dialog/export-dialog.component';
import { DeleteDialogComponent } from './components/dialog/delete-dialog/delete-dialog.component';
import { StatsDialogComponent } from './components/dialog/stats-dialog/stats-dialog.component';
import { UserDialogComponent } from './components/dialog/user-dialog/user-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaterialTimepickerModule,
    ClickOutsideModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    FabComponent,
    ConfirmationDialogComponent,
    ExportDialogComponent,
    DeleteDialogComponent,
    StatsDialogComponent,
    UserDialogComponent,
  ],
  exports: [
    MaterialModule,
    TranslateModule,
    FabComponent,
    ConfirmationDialogComponent,
    ExportDialogComponent,
    DeleteDialogComponent,
    StatsDialogComponent,
    UserDialogComponent,
  ]
})
export class SharedModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}