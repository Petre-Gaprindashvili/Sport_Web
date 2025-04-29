export interface Subcategory {
    id: number;
    name: string;
    imageUrl: string;
    categoryId: number;
  }

  // for admin only
  export interface Subresponse {
    id: number;
    name: string;
    imageUrl: string;
    parentCategoryId: number;
  }


