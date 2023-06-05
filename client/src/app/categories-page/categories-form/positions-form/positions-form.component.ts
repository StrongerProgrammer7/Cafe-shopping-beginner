import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Position } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/middleware/material.service';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy
{
  @Input('categoryId') categoryId!: string;
  @ViewChild('modal') modalRef!: ElementRef;
  form: FormGroup = new FormGroup(
    {
      name: new FormControl(null,Validators.required),
      cost: new FormControl(null,[Validators.required,Validators.min(1)])
    }
  );

  positions: Position[] = [];
  modal!: MaterialInstance;
  loading = false;
  positionEditId = -1;

  constructor(private postionService: PositionService)
  {

  }

  ngOnInit(): void
  {
    this.loading = true;
    this.postionService.getAll(this.categoryId)
    .subscribe(
      {
        next: (positions) =>
        {
          this.positions = positions;
        },
        error: (e) =>
        {
          MaterialService.toast(e.error.message);
        },
        complete: () =>
        {
          this.loading = false;
          console.info('complete get postions')
        }
      }
    );
  }
  ngAfterViewInit(): void
  {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void
  {
    if(this.modal.destroy)
      this.modal.destroy();
  }

  onSelectPosition(position: Position)
  {
    this.positionEditId = position.id? position.id : -1;
    this.fillForm(position.name,position.cost)
    this.openModal();
  }

  onAddPosition()
  {
    this.fillForm('',1)
    this.openModal();
  }

  onCloseModal()
  {
    if(this.modal.close)
      this.modal.close();
    this.clearForm();
  }

  onSubmit()
  {
    this.form.disable();
    const position: Position =
    {
      name: this.form.value.name,
      cost: this.form.value.cost,
      categoryId: +this.categoryId
    }
    if(this.positionEditId === -1)
      this.create(position)
    else
      this.update(position);
  }

  onDelete(event: Event,position: Position)
  {
    event.stopPropagation();
    const decision = window.confirm('Are you sure that want delete this position?');
    if(decision === true && position.id)
    {
      this.postionService.remove(position.id)
      .subscribe(
        {
          next:(message) =>
          {
            MaterialService.toast(message.message);
            let index = this.positions.findIndex(pos => pos.id === position.id);
            this.positions.splice(index,1);
          },
          error: (e) => MaterialService.toast(e.error.message),
          complete: () =>
          {
            console.info('complete delete');
          }
        }
      )
    }
  }

  private clearForm()
  {
    this.form.reset({'cost':1});
    MaterialService.updateInputs();
  }

  private openModal()
  {
    if(this.modal.open === undefined)
      return;
    MaterialService.updateInputs();
    this.modal.open();
  }

  private fillForm(name:string,cost:number)
  {
    this.form.patchValue(
      {
        name:name,
        cost:cost
      }
    );
  };

  private create(position: Position)
  {
    this.postionService.create(position)
    .subscribe(
      {
        next:(pos) =>
        {
          MaterialService.toast(pos.message);
          this.positions.push(pos.position);
        },
        error: (e) =>
        {
          MaterialService.toast(e.error.message);
        },
        complete: () =>
        {
          this.form.enable();
          this.onCloseModal();
          this.clearForm();
          console.log('Complete added position');
        }
      }
    );
  }

  private update(position: Position)
  {
    position.id = this.positionEditId;
    this.postionService.update(position)
    .subscribe(
      {
        next:(mes) =>
        {
          MaterialService.toast(mes.message);
          let index = this.positions.findIndex(pos => pos.id === position.id);
          this.positions[index] = position;
        },
        error: (e) =>
        {
          MaterialService.toast(e.error.message);
        },
        complete: () =>
        {
          this.form.enable();
          this.onCloseModal();
          this.clearForm();
          console.log('Complete update position');
        }
      }
    );
    this.positionEditId = -1;
  }
}
