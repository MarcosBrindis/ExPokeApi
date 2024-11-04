import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceLetters',
  standalone: true
})
export class ReplaceLettersPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/[a,o]/gi, 'x');
  }
}
