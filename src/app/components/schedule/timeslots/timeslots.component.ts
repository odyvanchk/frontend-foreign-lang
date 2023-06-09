import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../../service/ScheduleService';


export interface ITimeSlot {
  time: Date,
  isDisabled: boolean,
  selected: boolean,
  id: number | null ;
}

export class TimeSlot implements ITimeSlot {
  time: Date;
  isDisabled: boolean;
  selected: boolean;
  id: number | null;

  constructor(time : Date, disable : boolean, selected: boolean, id : number | null) {
    this.id = id;
    this.isDisabled = disable
    this.time = time
    this.selected = selected
  }

}


export class InputTimeSlots {
  day : string
  timeslots : ITimeSlot[]

  constructor(day : string, slots : ITimeSlot[]) {
    this.day = day
    this.timeslots = slots
  }
}


@Component({
  selector: 'app-timeslots',
  templateUrl: './timeslots.component.html',
  styleUrls: ['./timeslots.component.css']
})

export class TimeslotsComponent implements OnInit {

  id!: number;  
  slots: InputTimeSlots[] = [];
  selected : ITimeSlot[] = new Array();
  disabled : string[] = [];
  currentStartWeekDate : Date = new Date();
  startWeekDate: Date = new Date();
  finishWeekDate: Date = new Date();
    
 

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) { 
    this.route.params.subscribe( params => this.id = params['id'] );
    // console.log(this.id)
  }  
  
  
  ngOnClickSlot(slot: ITimeSlot) {
    slot.selected = !slot.selected;
    if (slot.selected) {
     this.selected.push(slot);
    } else {
      this.selected.filter((value, index) => {
      if (value.time.getTime() == slot.time.getTime()) {
        this.selected.splice(index, 1);
        return true;
        }
      return false;
      });
    }  
  }

  getMonday() {
    let d = new Date();
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); 
    return new Date(d.setDate(diff));
  }

  ngOnInit(): void {
    this.currentStartWeekDate = this.getMonday();
    this.startWeekDate = this.getMonday()
    this.finishWeekDate.setDate(this.startWeekDate.getDate() + 6)

    this.currentStartWeekDate.setHours(0);
    this.currentStartWeekDate.setMinutes(0);
    this.currentStartWeekDate.setSeconds(0);
    this.currentStartWeekDate.setMilliseconds(0);

    this.startWeekDate.setHours(0);
    this.startWeekDate.setMinutes(0);
    this.startWeekDate.setSeconds(0);
    this.startWeekDate.setMilliseconds(0);

    this.finishWeekDate.setHours(23);
    this.finishWeekDate.setMinutes(0);
    this.finishWeekDate.setSeconds(0);
    this.finishWeekDate.setMilliseconds(0);


    this.scheduleService
    .get(this.id, this.startWeekDate.getTime(), this.finishWeekDate.getTime())
    .subscribe({
      next: (res) => {
        this.setUTCZoneToDate(res)
        this.slots = this.getSlotsFromRes(res);
        this.disablePastSlots();
      },
      error: (er) => {
        alert("smth goes wrong")
      }
    })


  }
  disablePastSlots() {
    if (this.currentStartWeekDate.getTime() == this.startWeekDate.getTime()) {
      for (let i = 0; i <= getLocalDay(new Date()); i++) {
        let today = new Date();
        this.slots[i].timeslots.forEach((el) => {
          if (el.time.getTime() < today.getTime()) {
            el.isDisabled =true;
          }
        })
      }
    }  
  }


  setUTCZoneToDate(res: any) {
    res.forEach((element: any) => {
      element.dateTimeStart = new Date(element.dateTimeStart + '.000Z');
    });
  }


  getSlotsFromRes(res: any): InputTimeSlots[] {
    let slots = new Array(7);
    slots[0] = this.getTimeSlots(res, 0, "Monday");
    slots[1] = this.getTimeSlots(res, 1, "Tuesday");
    slots[2] = this.getTimeSlots(res, 2, "Wednesday");
    slots[3] = this.getTimeSlots(res, 3, "Thursday");
    slots[4] = this.getTimeSlots(res, 4, "Friday");
    slots[5] = this.getTimeSlots(res, 5, "Suturday");
    slots[6] = this.getTimeSlots(res, 6, "Sunday");
    return slots;
  }


  getTimeSlots(res : any, day: number, weekDay: string) : InputTimeSlots {
    let daySlots = new Array();
    res.forEach((element:any) => {
      let wasSelectedBefore : boolean = false;
      if (getLocalDay(element.dateTimeStart) ==  getLocalDay(this.startWeekDate) + day) {
        this.selected.forEach((el) => {
            if (el.time.getTime() == element.dateTimeStart.getTime()) {
              daySlots.push(new TimeSlot(element.dateTimeStart, !element.available, true, element.id))
              wasSelectedBefore = true;
            }
        })
        if (!wasSelectedBefore) {
          daySlots.push(new TimeSlot(element.dateTimeStart, !element.available, false, element.id))
        }
      }
    })
    return new InputTimeSlots(weekDay, daySlots);
  }


  

  onSubmitForm(){
    this.scheduleService
    .book(this.id, this.selected.map(
      (slot) => slot.id!)
      )
    .subscribe({
      next: (res) => {
        console.log(res)
        alert("lessons are booked successfully")
      },
      error: (er) => {
        console.log(er)
      }
    })
  }


  hasPrevWeek() : boolean {
    return this.currentStartWeekDate >= this.startWeekDate
  }


  changeWeek(prev: boolean) {
    this.updateDate(prev)
    this.scheduleService
    .get(this.id, this.startWeekDate.getTime(), this.finishWeekDate.getTime())
    .subscribe({
      next: (res) => {
        console.log(res)
        this.setUTCZoneToDate(res)
        this.slots = this.getSlotsFromRes(res);
        this.disablePastSlots();
      },
      error: (er) => {
        alert("smth goes wrong")
      }
    })
  }
  


  updateDate(prev: boolean) {
    var date = new Date(this.startWeekDate);
    var datefinish = new Date(this.finishWeekDate);

    if (prev) {
      date.setDate(date.getDate() - 7);
      datefinish.setDate(datefinish.getDate() - 7);
    } else {
      date.setDate(date.getDate() + 7);
      datefinish.setDate(datefinish.getDate() + 7);
    }
    this.startWeekDate = date;
    this.finishWeekDate = datefinish 
  }

  isChangeArrEmty() :boolean {
    return this.selected.length == 0
  }
}

export function getLocalDay(date : Date) {
  let day = date.getDay();
  if (day == 0) { 
    day = 7;
  }
  return day - 1;
}