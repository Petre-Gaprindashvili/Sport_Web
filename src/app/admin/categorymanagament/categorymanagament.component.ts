import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { Subcategory, Subresponse } from 'src/app/interfaces/subCategory';
import { CategoriesManagementService } from 'src/app/services/categories-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorymanagament',
  templateUrl: './categorymanagament.component.html',
  styleUrls: ['./categorymanagament.component.css']
})
export class CategorymanagamentComponent implements OnInit {
  categories: Category[] = [];
  subResponse: Subresponse | null = null; 
  categoryForm!: FormGroup; // Declare FormGroup to hold form controls
  subCategoryForm!: FormGroup; // Declare FormGroup to hold form controls
  selectedAction: string = ''; // To bind to the action dropdown

  constructor(
    private fb: FormBuilder,
    private categoriemanagementservice: CategoriesManagementService
  ) {}

  ngOnInit() {
    // Initialize the form with FormBuilder
    this.categoryForm = this.fb.group({
      selectedAction: ['', Validators.required], // For action dropdown
      categoryName: ['', Validators.required] // For category name
    });

    this.subCategoryForm = this.fb.group({
    selectedAction: ['', Validators.required],
    categoryId: ['', Validators.required],
    name: ['', Validators.required],
    image: ['', Validators.required],
    parentCategoryId: ['', Validators.required]

    })
  }

  // Watch for changes in the selected action to conditionally add the categoryId form control
  onActionChange() {
    const action = this.categoryForm.get('selectedAction')?.value;
  
    if (action === 'add') {
      // For 'add' => categoryName is required, categoryId is NOT required
      this.categoryForm.get('categoryName')?.setValidators(Validators.required);
      this.categoryForm.get('categoryName')?.updateValueAndValidity();
  
      if (this.categoryForm.contains('categoryId')) {
        this.categoryForm.removeControl('categoryId');
      }
  
    } else if (action === 'update' || action === 'delete') {
      // For 'update' or 'delete' => categoryId is required
      if (!this.categoryForm.contains('categoryId')) {
        this.categoryForm.addControl('categoryId', this.fb.control('', Validators.required));
      }
  
      // categoryName is NOT required anymore
      this.categoryForm.get('categoryName')?.clearValidators();
      this.categoryForm.get('categoryName')?.updateValueAndValidity();
    }
  }
  
  
  // categoryfunctions
  submitCategoryAction() {
    if (this.categoryForm.invalid) {
      Swal.fire('Error', 'Please fill all the fields correctly.', 'error');
      return;
    }

    const formValues = this.categoryForm.value;

    if (formValues.selectedAction === 'add') {
      this.addCategory(formValues.categoryName);
    } else if (formValues.selectedAction === 'update') {
      if (!formValues.categoryId) {
        Swal.fire('Error', 'Please provide a Category ID for update.', 'error');
        return;
      }
      this.updateCategory(formValues.categoryId, formValues.categoryName);
    } else if (formValues.selectedAction === 'delete') {
      if (!formValues.categoryId) {
        Swal.fire('Error', 'Please provide a Category ID for deletion.', 'error');
        return;
      }
      this.deleteCategory(formValues.categoryId);
    }
  }

  // Add category function
  addCategory(categoryName: string): void {
    this.categoriemanagementservice.addCategory(categoryName).subscribe(response => {
      Swal.fire('Success', 'Category added successfully!', 'success');
      this.categoryForm.reset(); // Reset form after success
    });
  }

  // Update category function
  updateCategory(categoryId: number, categoryName: string): void {
    this.categoriemanagementservice.updateCategory(categoryId, categoryName).subscribe(response => {
      Swal.fire('Success', 'Category updated successfully!', 'success');
      this.categoryForm.reset(); // Reset form after success
    });
  }

  //delete function
  deleteCategory(categoryId:number):void{
  this.categoriemanagementservice.deleteCategory(categoryId).subscribe(Response=>{
    Swal.fire('Success', 'Category deleted successfully!', 'success');
    this.categoryForm.reset();
  })
  }

  // subcategoryFunctions
  submitSubCategoryAction() {
    // if(this.subCategoryForm.invalid){
    //   Swal.fire('Error', 'Please fill all fields correctly.', 'error');
    //  return;
    //    }

  const formValues = this.subCategoryForm.value;

      if(formValues.selectedAction === 'add'){
        this.addSubCategory()
      } else if(formValues.selectedAction === 'delete'){
        if (!formValues.categoryId) {
          Swal.fire('Error', 'Please provide a Category ID for deletion.', 'error');
          return;
        }
        this.deletesubCategory(formValues.categoryId);
      }
  }


  //addSubCategory function
  addSubCategory():void{

  const {name ,image, parentCategoryId} = this.subCategoryForm.value;
  const subCategory = {
    name: name,
    image: image,
    parentCategoryId: parentCategoryId
  };
  this.categoriemanagementservice.addSubCategory(subCategory).subscribe(response=>{
  if(response){
    Swal.fire('Success', 'subcategory added successfully!', 'success');
    this.subCategoryForm.reset();
    this.subResponse = response;
  }
  })
  }

  //SubCategory function

  deletesubCategory(categoryId:number):void{
    this.categoriemanagementservice.deleteCategory(categoryId).subscribe(Response=>{
      Swal.fire('Success', 'Subcategory deleted successfully!', 'success');
      this.categoryForm.reset();
    })
    }
}

