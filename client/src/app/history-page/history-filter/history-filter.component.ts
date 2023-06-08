import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterialDatepicker, MaterialService } from 'src/app/shared/middleware/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit
{
  @Output() filter = new EventEmitter<Filter>();
  @ViewChild('start') startRef!: ElementRef;
  @ViewChild('end') endtRef!: ElementRef;

  start: MaterialDatepicker | undefined
  end: MaterialDatepicker | undefined
  order!:number;
  isValid: boolean = false;
  constructor()
  {

    MaterialService.updateInputs();
  }
  ngOnInit(): void
  {

  }

  ngOnDestroy(): void
  {
    if(this.start && this.start.destroy)
      this.start.destroy();
    if(this.end && this.end.destroy)
      this.end.destroy();
  }

  ngAfterViewInit(): void
  {
    this.start = MaterialService.initDatepicker(this.startRef,this.validate.bind(this));
    this.end = MaterialService.initDatepicker(this.endtRef,this.validate.bind(this))

  }

  validate()
  {
    //debugger
    if(this.start === undefined || this.end === undefined)
    {
      this.isValid = false;
      return;
    }
    if(this.start.date === null || this.end.date === null || this.start.date === undefined || this.end.date === undefined)
    {
      this.isValid = false;
      return;
    }

    this.isValid = this.start.date.getTime() > this.end.date.getTime();
    console.log(this.isValid);
  }

  acceptFilter()
  {

    const filter = new EndFilter(this.end!.date!,
                     new StartFilter(this.start!.date!,
                     new OrderFilter(this.order,
                     new FiltersHistory({})))).filters

    this.filter.emit(filter);
  }
}

class FiltersHistory
{
  filters: Filter;

  constructor(filter:Filter)
  {
    this.filters = filter;
  }
}

abstract class Decorator extends FiltersHistory
{

  component!: any;

  constructor(component_filter: any,filter:Filter)
  {
    super(filter);
    this.component = component_filter;
  }
}

class OrderFilter extends Decorator
{
  constructor(order:number,component:any)
  {
    if(order)
      component.filters.order = order;
    super(component, component.filters);
  }
}

class StartFilter extends Decorator
{
  constructor(date: Date,component: any)
  {
    if(date)
      component.filters.start = date;
    super(component, component.filters);
  }
}

class EndFilter extends Decorator
{
  constructor(date: Date,component: any)
  {
    if(date)
      component.filters.end = date;
    super(component, component.filters);
  }
}


/*
strict Decorator


class FiltersHistory
{
  filters: Filter;

  constructor(filter:Filter)
  {
    this.filters = filter;
  }
}

abstract class Decorator extends FiltersHistory
{
  filterOrder?: OrderFilter;
  filterHistory?: FiltersHistory;
  filterStart?: StartFilter;

 constructor(filters:{filterHistory?: FiltersHistory,
  filterOrder?: OrderFilter,
 filterStart?: StartFilter},filter:Filter)
{
super(filter);
if(filters.filterHistory)
this.filterHistory = filters.filterHistory;
if(filters.filterOrder)
this.filterOrder = filters.filterOrder;
if(filters.filterStart)
this.filterStart = filters.filterStart;
}
}

class OrderFilter extends Decorator
{
constructor(component:any,filter:FiltersHistory)
{
if(component  && component !== '')
filter.filters.order = +component;
super({ filterHistory: filter}, filter.filters);
}
}

class StartFilter extends Decorator
{
constructor(component: any,filter: OrderFilter)
{
if(component  && component !== '')
filter.filters.start = new Date(component.toString());
super({ filterOrder: filter}, filter.filters);
}
}

class EndFilter extends Decorator
{
constructor(component: any,filter: StartFilter)
{
if(component && component !== '')
filter.filters.end = new Date(component.toString());
super({ filterStart: filter}, filter.filters);
}
}
*/
