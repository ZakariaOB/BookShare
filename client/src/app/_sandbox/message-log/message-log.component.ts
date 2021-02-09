import { Component, OnInit } from '@angular/core';
import { LogMessageService } from '../../_services/log-message.service';

@Component({
  selector: 'app-message-log',
  templateUrl: './message-log.component.html',
  styleUrls: ['./message-log.component.scss']
})
export class MessageLogComponent implements OnInit {


  constructor(public messageService: LogMessageService) {}

  ngOnInit(): void {
  }

}
