import { Pipe, PipeTransform } from '@angular/core';
import { genre } from '../../core/models/genre';

@Pipe({
  name: 'join',
})
export class GenreJoinPipe implements PipeTransform {
  transform(input: genre[], sep = ','): string {
    return input.map((a) => a.name).join(sep);
  }
}
