import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent
{

  getDate(): string
  {
    let date = new Date();
    date.setDate(date.getDate() -1);
    return moment(date).format('DD.MM.YYYY');
  }
}
