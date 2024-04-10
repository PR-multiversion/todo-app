import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  id: any;
  taskdata: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // Access route parameters using the 'get' method
      this.id = params.get('id');
      console.log('Route parameter id:', this.id);

      if (this.id) {
        this.api.getSingleData(this.id).subscribe(
          (res) => {
            console.log(res);
            this.taskname = res.taskname;
            this.date = res.date;
            this.startTime = res.starttime;
            this.endTime = res.endtime;
            this.description = res.description;
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  isToastOpen = false;
  msg = '';
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  taskname = '';
  date = '';
  startTime = '';
  endTime = '';
  description = '';

  addTask() {
    console.log({
      taskname: this.taskname,
      taskdate: this.date,
      starttime: this.startTime,
      endtime: this.endTime,
      description: this.description,
    });

    let data = {
      taskname: this.taskname,
      taskdate: this.date,
      starttime: this.startTime,
      endtime: this.endTime,
      description: this.description,
    };
    this.api.postData(data).subscribe(
      (res) => {
        console.log(res);
        this.setOpen(true);
        this.msg = 'Task added successfully!';
      },
      (err) => console.log(err)
    );
  }

  updateData(id: any) {
    let data = {
      taskname: this.taskname,
      taskdate: this.date,
      starttime: this.startTime,
      endtime: this.endTime,
    };
    this.api.updateData(id, data).subscribe(
      (res) => {
        console.log(res);
        this.setOpen(true);
        this.msg = 'Task updated successfully!';
      },
      (err) => console.log(err)
    );
  }
}
