import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Position } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/middleware/material.service';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-order-position',
  templateUrl: './order-position.component.html',
  styleUrls: ['./order-position.component.css']
})
export class OrderPositionComponent implements OnInit
{

  categoryId: string = '';
  positions: Position[] = [];
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private positionService: PositionService)
  {

  }
  ngOnInit(): void
  {
    this.loading = true;
    this.route.params
    .pipe(
      switchMap(
        (params:Params) =>
        {
          if(params['id'])
          {
            return this.positionService.getAll(params['id']);
          }
          return of(null);
        }
      )
    )
    .subscribe(
      {
        next: (positions) =>
        {
          if(positions)
            this.positions = positions;
            this.loading = false;
        },
        error: (e) =>
        {
          MaterialService.toast(e.error.message);
          console.log(e);
        },
        complete: () =>
        {

          console.info('complete get positions');
        }

      }
    )
  }

  onAddedToOrder(position: Position)
  {
    console.log(position.name);
    console.log(document.getElementsByTagName("input")[0].value);
  }

}
