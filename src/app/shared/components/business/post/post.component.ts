import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'jalali-moment';
import { Message } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() message: Message;
  date(value: string) {
    return moment(value).fromNow();
  }

  constructor() {}
}
