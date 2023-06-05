import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/middleware/material.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit
{
  @ViewChild('loadfile') inputRef!: ElementRef;
  isNew = true;
  form: FormGroup = new FormGroup(
    {
      name: new FormControl(null,Validators.required)
    }
  );
  image!: File;
  imagePreview: string  = '';
  category!: Category;
  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router)
  {

  }

  ngOnInit(): void
  {
    // this.route.params.subscribe((params: Params) =>
    // {
    //   if(params['id'])
    //   {
    //     this.isNew = false;
    //   }else
    //   {

    //   }
    // });
    this.form.disable();
    this.route.params
    .pipe(
      switchMap(
        (params: Params)=>
        {
          if(params['id'])
          {
            this.isNew = false;

            return this.categoriesService.getById(params['id']);
          }else
            this.isNew = true;
          return of(null);
        }
      )
    )
    .subscribe(
        {
          next: (info) =>
          {
            let category = info?.category;

            if(category)
            {
              this.category = category;
              this.form.patchValue(
                {
                  name:category.name
                }
              );
              this.imagePreview = `${category.imageSrc}`;
              MaterialService.updateInputs();
            }
            this.form.enable();
          },
          error: (e) =>
          {
            MaterialService.toast(e.error.message);
            console.error(e);
          },
          complete: () =>
          {
            console.info('complete: get category')
          }
        }
      )
  };

  onSubmit()
  {
    this.form.disable();
    let obs$;
    if(this.isNew)
    {
      obs$ = this.create();
    }else
    {
      obs$ = this.update();
    }

    obs$.subscribe(
      {
        next: (category) =>
        {
          MaterialService.toast('Change save');
        },
        error: (e) =>
        {
          MaterialService.toast(e.error.message);
        },
        complete: () =>
        {
          this.form.enable();
          console.info('complete create/update cateogry');
        }
      }
    )
  }

  triggerClick()
  {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any)
  {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader()

    reader.onload = () =>
    {
      this.imagePreview = `${reader.result}`;
    };

    reader.readAsDataURL(file);
  }

  deleteCategory()
  {
    const decision = window.confirm('Are you sure that want delete this category?');
    if(decision === true && this.category.id)
    {
      this.categoriesService.delete(this.category.id)
      .subscribe(
        {
          next:(message) => MaterialService.toast(message.message),
          error: (e) => MaterialService.toast(e.error.message),
          complete: () =>
          {
            this.router.navigate(['/categories']);
            console.info('complete delete');
          }
        }
      )
    }
  }

  private create(): Observable<Category>
  {
    return this.categoriesService.create(this.form.value.name,this.image)
  }

  private update(): Observable<Category>
  {
    let obs$: any;
    if(this.category.id)
      obs$ = this.categoriesService.update(this.category.id,this.form.value.name,this.image);

    return obs$;
  }
}
