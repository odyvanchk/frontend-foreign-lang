import { Component, OnInit } from '@angular/core';


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
    slots: InputTimeSlots[] = [];
    selected : ITimeSlot[] = new Array();
    disabled : string[] = [];
    startWeekDate: Date = new Date()
    finishWeekDate: Date = new Date();
    
    add(slot: ITimeSlot) {
      slot.selected = !slot.selected;
      if (slot.selected) {
          this.selected.push(slot);
      }
    }

  constructor() { }

  getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  ngOnInit(): void {
    this.slots = new Array(7);
    this.slots[0] = new InputTimeSlots("Monday", [new TimeSlot("13.00", false, false)])
    this.slots[1] = new InputTimeSlots("Tuesday", [new TimeSlot("13.00", false, false), 
                                                  new TimeSlot("14.00", false, true), 
                                                  new TimeSlot("16.00", false, false)])
    this.slots[2] = new InputTimeSlots("Wednesday", [])
    this.slots[3] = new InputTimeSlots("Thursday", [])
    this.slots[4] = new InputTimeSlots("Friday", [])
    this.slots[5] = new InputTimeSlots("Sutarday", [])
    this.slots[6] = new InputTimeSlots("Sunday", [])
    this.startWeekDate = this.getMonday(new Date())
    this.finishWeekDate.setDate(this.startWeekDate.getDate() + 6)
  }

  onSubmitForm(){
    console.log(this.selected)
  }

}
