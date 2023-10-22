import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {FileUploadEvent, UploadEvent} from "primeng/fileupload";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'upload-files';
  maxFileSize: number = 1000000

  constructor(private messageService: MessageService,
              private _angularStorage: AngularFireStorage) {}

  async onUpload(event: FileUploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    const file = event.files[0];
    console.log(file)
    if (file) {
      const path = `files/${file.name}`;
      const fileUpload = this._angularStorage.upload(path, file);
      console.log(path)
    }
  }
}
