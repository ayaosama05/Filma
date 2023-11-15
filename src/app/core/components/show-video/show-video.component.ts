import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.scss'],
})
export class ShowVideoComponent implements OnInit {
  @Input() Key: string | null = null;
  youtube = 'https://www.youtube.com/embed/';
  safeURL: SafeResourceUrl = '';

  constructor(private _sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
      this.youtube + this.Key
    );
  }
}
