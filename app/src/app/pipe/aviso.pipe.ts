import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aviso'
})
export class AvisoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return 'hola';
  }

}
