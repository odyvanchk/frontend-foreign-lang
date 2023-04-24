import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../../service/ScheduleService';


interface ITimeSlot {
  timeInHHMM: string,
  isDisabled: boolean,
  selected: boolean
}

export class TimeSlot implements ITimeSlot {
  timeInHHMM: string;
  isDisabled: boolean;
  selected: boolean;

  constructor(time : string, disable : boolean, selected: boolean) {
    this.isDisabled = disable
    this.timeInHHMM = time
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
    
    add(slot: ITimeSlot) {
      slot.selected = !slot.selected;
      if (slot.selected) {
          this.selected.push(slot);
      }
    }

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) { 
    this.route.params.subscribe( params => this.id = params['id'] );
    console.log(this.id)
  }

  getMonday() {
    let d = new Date();
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  ngOnInit(): void {
    this.currentStartWeekDate = this.getMonday();
    this.startWeekDate = this.getMonday()
    this.finishWeekDate.setDate(this.startWeekDate.getDate() + 6)


    let start = this.startWeekDate;
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);

    let finish = this.finishWeekDate;
    finish.setHours(23);
    finish.setMinutes(0);
    finish.setSeconds(0);
    finish.setMilliseconds(0);


    this.scheduleService
    .get(this.id, start.getTime(), finish.getTime())
    .subscribe({
      next: (res) => {
        console.log(res)
        //todo   this.slots = res;   
      },
      error: (er) => {
        alert("smth go wrong")
      }
    })

    // this.slots = new Array(7);
    // this.slots[0] = new InputTimeSlots("Monday", [new TimeSlot("13.00", false, false)])
    // this.slots[1] = new InputTimeSlots("Tuesday", [new TimeSlot("13.00", false, false), 
    //                                               new TimeSlot("14.00", false, true), 
    //                                               new TimeSlot("16.00", false, false)])
    // this.slots[2] = new InputTimeSlots("Wednesday", [])
    // this.slots[3] = new InputTimeSlots("Thursday", [])
    // this.slots[4] = new InputTimeSlots("Friday", [])
    // this.slots[5] = new InputTimeSlots("Sutarday", [])
    // this.slots[6] = new InputTimeSlots("Sunday", [])

  }

  onSubmitForm(){
    console.log(this.selected)
  }

  hasPrevWeek() : boolean {
    // return true;
    return this.currentStartWeekDate >= this.startWeekDate
  }


  clickRight($event: MouseEvent) {
    this.updateDate(false)
  }
  
  clickLeft($event: MouseEvent) {
    this.updateDate(true);
  }


  updateDate(prev: boolean) {
    var date = new Date(this.startWeekDate);
    if (prev) {
      date.setDate(date.getDate() - 7);
    } else {
      date.setDate(date.getDate() + 7);
    }
    this.startWeekDate = date;

    var datefinish = new Date(this.finishWeekDate);
    if (prev) {
      datefinish.setDate(datefinish.getDate() - 7);
    } else {
      datefinish.setDate(datefinish.getDate() + 7);
    }    this.finishWeekDate = datefinish
  }

}
