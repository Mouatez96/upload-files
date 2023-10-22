import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {FileUploadEvent, UploadEvent} from "primeng/fileupload";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {forkJoin} from "rxjs";

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

  async onUploadOne(event: FileUploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    const file = event.files[0];
    console.log(file)
    if (file) {
      const path = `files/${file.name}`;
      const fileUpload = await this._angularStorage.upload(path, file);
      console.log(fileUpload)
    }
  }

  async onUpload(event: FileUploadEvent) {
    console.log(event)
    const promises: any[]= [];
    event.files.forEach(file => promises.push(this._angularStorage.upload(`multiple/${file.name}`, file)));
    const observable = forkJoin([promises]);
    observable.subscribe({
      next: value => console.log(value),
      complete: () => console.log("all done")
    })

  }
}
