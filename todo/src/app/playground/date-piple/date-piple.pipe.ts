import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePiple'
})
export class DatePiplePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // const msPerHour: number = 3.6e6;
    // const msPerDay:number=8.64e7;
    // const msPerMonth:number=
    // let elapseTime: number = Date.now() - value;
    return null;
  }

}
