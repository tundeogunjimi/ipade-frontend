import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/shared/data/auth/user-model';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {

  @Input() currentUser: User;
  @Output('uploadPicture') uploadPicture: EventEmitter<any> = new EventEmitter();
  @ViewChild('closebutton') closebutton;


    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageBase64: any = '';
    isImageSelected: boolean = false;
  

    private allowedTypes = [
      'jpeg','jpg', 'png', 
      // 'application/pdf'
    ];

    constructor(
      private sanitizer: DomSanitizer,
      private messageService: MessageService
    ) {}

    selectFile() {
      this.isImageSelected = true;
    }

    fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      const file = event?.target?.files[0]
      const fileSize = +(file?.size)/1000;

      if (this.validateFileType(file)) {
        console.log(`event files`, event.target.files[0]);
        this.isImageSelected = true;
      }
      
  }

  imageCropped(event: ImageCroppedEvent) {
    // this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    this.croppedImage = event;
    // event.blob can be used to upload the cropped image
    console.log(`cropped image >>>`, event);
  }

  imageLoaded(image: LoadedImage) {
      // show cropper
  }

  cropperReady() {
      // cropper ready
  }

  loadImageFailed() {
      // show message
  }

  imageBase64Event(event: any) {
    console.log(`image base 64 `, event);
  }

  uploadProfilePicture() {
    // const profilePicture = this.croppedImage.changingThisBreaksApplicationSecurity;
    this.uploadPicture.emit(this.croppedImage.base64);
    this.isImageSelected = false;
    // console.log(this.croppedImage.base64)
    this.closebutton.nativeElement.click();
  }

  validateFileType(file): boolean {
    console.log(`validating...`);
    const fileType = file.type.split('/')[1];

    if (!this.allowedTypes.includes(fileType)) {
      this.messageService.add({
        severity: 'error', 
        summary: 'Invalid file type', 
        detail: 'Please upload a JPEG or PNG.'
      });
      document.getElementById('fileInput').setAttribute("value", '');
      return false;
   }
   console.log(`forma not allowed`, fileType)
   return true;
  }

}
