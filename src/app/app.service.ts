import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private eventSource!: EventSource;

  connect(): Observable<MessageEvent> {
    this.eventSource = new EventSource('http://localhost:3000/api/demo');

    return new Observable((observer) => {
      this.eventSource.onmessage = (event: MessageEvent) => {
        observer.next(event);
      };

      this.eventSource.onerror = (error) => {
        observer.error(error);
      };
    });
  }

  closeConnection() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
