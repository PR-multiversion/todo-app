import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router, private api: ApiService) {}

  isToastOpen = false;
  msg = '';
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  todayTaskCount = 0;

  callGetTasks() {
    this.api.getData().subscribe(
      (res) => {
        this.taskArrData = res;
        console.log(this.taskArrData);

        const currentDate = new Date().toISOString().split('T')[0];
        this.taskArrData.forEach((element: any) => {
          if (element.taskdate == currentDate) {
            this.todayTaskCount++;
            this.todayTaskArr.push(element);
          }
        });
        console.log(this.todayTaskCount);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  taskArrData: any;

  todayTaskArr: any = [];
  ngOnInit(): void {
    this.callGetTasks();
  }

  changeTimeFormat(time24: any) {
    const [hours24, minutes] = time24.split(':');
    const date = new Date();

    date.setHours(Number(hours24));
    date.setMinutes(Number(minutes));

    const time12 = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return time12;
  }

  handleAddTask() {
    this.router.navigate(['add']);
  }

  handleChecked(id: any, checked: boolean) {
    this.api.updateData(id, { checked: !checked }).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  handleUpdate(id: any) {
    this.router.navigate([`add/${id}`]);
  }

  handledelete(id: any) {
    this.api.deleteData(id).subscribe(
      (res) => {
        console.log(res);
        this.callGetTasks();

        this.msg = `${res.task.taskname} task deleted successfully`;
        this.setOpen(true);
      },
      (err) => console.log(err)
    );
  }
}
