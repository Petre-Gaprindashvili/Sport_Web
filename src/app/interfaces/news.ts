export interface News {
    id:number;
    title:string;
    imageUrl:string;
    content:string
    categoryId:number;
    videoUrl?:string;
    publishedDate:Date;
    parentCategoryName: string;
    // category:category;
}


// export interface category {
//     parentCategoryId?:number;
//     name: string;
//   }
  

