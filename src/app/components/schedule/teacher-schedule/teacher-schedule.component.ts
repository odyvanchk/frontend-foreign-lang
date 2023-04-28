import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../../service/ScheduleService';
import { ITimeSlot, InputTimeSlots, TimeSlot } from '../timeslots/timeslots.component';


enum Command {
  Add,
  Delete
}

export interface ITimeSlotTeacher extends ITimeSlot {
  command : Command
}

class TimeSlotTeacher implements ITimeSlotTeacher {
  command: Command;
  time: Date;
  isDisabled: boolean;
  selected: boolean;
  id: number |null;

  constructor(date: ITimeSlot,  command : Command) {
    this.id = date.id;
    this.isDisabled = date.isDisabled
    this.time = date.time
    this.selected = date.selected
    this.command = command;
  }
}


@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css']
})


export class TeacherScheduleComponent implements OnInit {

  id!: number;  
  slots: InputTimeSlots[] = [];
  changeArr : ITimeSlotTeacher[] =  new Array();
  currentStartWeekDate : Date = new Date();
  startWeekDate: Date = new Date();
  finishWeekDate: Date = new Date();
    
 
  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) { 
    this.id = Number(localStorage.getItem("id"));
  }  
  
  
  ngOnClickSlot(slot: ITimeSlot) {
    slot.selected = !slot.selected;
    this.updateChangeArr(slot);
  }

  updateChangeArr(slot : ITimeSlot) {
    let wasInChangeArr: boolean = false;
    this.changeArr.filter((changeSlot, index) => {
      if (changeSlot.time.getTime() == slot.time.getTime()) {
          this.changeArr.splice(index, 1);
        wasInChangeArr = true;
      }
    })

    if (!wasInChangeArr) {
      if (slot.selected) {
        this.changeArr.push(new TimeSlotTeacher(slot, Command.Add));
      } else {
        this.changeArr.push(new TimeSlotTeacher(slot, Command.Delete));
      }
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
      },
      error: (er) => {
        // alert("smth goes wrong")
      }
    })
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
    let daySlots = this.generateDaySlots(day);
    res.forEach((element:any) => {
      if (element.dateTimeStart.getDay() ==  (this.startWeekDate.getDay() + day)) {
        daySlots.forEach((time) => {
          if (time.time.getTime() == element.dateTimeStart.getTime()) {
            if (element.available == true) {
              time.selected = true;
              time.id = element.id;
            } else {
              time.isDisabled = true;
            }  
          }

          this.changeArr.forEach((slot) => {
            if (slot.time.getTime() == time.time.getTime()) {
              if (slot.command == Command.Add) {
                time.selected = true;
              } else {
                time.selected = false;
              }
          }
        }) 
      })
    }
  })
    
  this.changeArr.forEach((slot) => {
    daySlots.forEach((time) => {  
        if (slot.time.getTime() == time.time.getTime()) {
          if (slot.command == Command.Add) {
            time.selected = true;
          } else {
            time.selected = false;
          }
      }
    }) 
  })
    
    return new InputTimeSlots(weekDay, daySlots);
  }

  generateDaySlots(dayIndex: number) : TimeSlot[] {
    let day = new Array()
      for (let i = 0; i <= 23; i++) {
        let time = new Date(this.startWeekDate);
        time.setDate(this.startWeekDate.getDate() + dayIndex)
        time.setHours(i);
        time.setMinutes(0);
        time.setSeconds(0);
        time.setMilliseconds(0);

        day.push(new TimeSlot(time, false, false, null))
      }
      return day;
  }


  onSubmitForm(){
    this.scheduleService
    .save(this.id, this.changeArr)
    .subscribe({
      next: (res) => {
        console.log(res)
        alert("achedule is saved successfully")
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

}
