import { NgModule } from '@angular/core';
import { AngularMaterialModule } from "./modules/angular-material/angular-material.module";
import { CardComponent } from './components/card/card.component';
import { RouterLink } from "@angular/router";
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CommonModule } from "@angular/common";
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { NgxDropzoneModule } from "ngx-dropzone";
import { ImageCropperModule } from "ngx-image-cropper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    AngularMaterialModule,
    RouterLink,
    CommonModule,
    NgxDropzoneModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CardComponent,
    PaginatorComponent,
    ActionButtonsComponent,
    UploadImageComponent
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    CardComponent,
    PaginatorComponent,
    ActionButtonsComponent,
    UploadImageComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
