import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  messages: string[] = [];

  constructor(
    private appService: AppService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.appService.connect().subscribe(
      (event: MessageEvent) => {
        this.zone.run(() => {
          this.messages.push(event.data);
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  ngOnDestroy() {
    this.appService.closeConnection();
  }
}

