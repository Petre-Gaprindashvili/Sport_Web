import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.substring(0, 3).toUpperCase() : '';
  }
}
