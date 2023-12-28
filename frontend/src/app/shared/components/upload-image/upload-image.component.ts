import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {
  @Input() public isUploaded: boolean;
  @Output() public image = new EventEmitter();
  public imageChangedEvent: NgxDropzoneChangeEvent | undefined;


  public fileChanged(event: NgxDropzoneChangeEvent): void {
    if (event.addedFiles.length !== 0) {
      this.imageChangedEvent = event;
      this.isUploaded = true;
    }
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.image.emit(event)
  }

  public loadImageFailed(): void {
    this.isUploaded = false;
  }

}
