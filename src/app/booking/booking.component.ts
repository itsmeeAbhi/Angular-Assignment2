import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Booking } from '../Model/booking';
import { BookingService } from '../Services/booking.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  checkBookDialog: boolean;
  deleteDialog:boolean;
  booking: Booking;
  bookingExist: boolean = false;
  bookingList: any;
  userLogin = false;
  loginUser: string;
  loginUserType: string;
  msg = '';

  constructor(private bookservice: BookingService, private router: Router, private messageService: MessageService, private service: LoginService) { }
  ngOnInit() {
    this.getBooking()
  }
  @ViewChild('checkBookingForm') form: NgForm;
  getBooking() {
    this.booking = {
      bookingId: '',
      trainNumber: '',
      trainName: '',
      ticketPrice: '',
      passenger:[],
      departureDate:new Date(),
      returnBooking: '',
      returnDate:new Date(),
      departureStation: '',
      arrivalStation: '',
      stop1: '',
      stop2: '',
      returnStop1: '',
      returnStop2: '',
      createdSource: '',
      createdSourceType: '',
      createdDttm: new Date(),
      modifiedSource: '',
      modifiedSourceType: '',
      modifiedDttm: new Date()
    };
    this.bookservice.getBookinglist().subscribe(
      data => {
        this.bookingList = data;
      },
      error => console.log("Error Occured")
    )
  }
  checkBooking() {
    this.checkBookDialog = true;
    localStorage.setItem("editable",'true');
  }
  deleteRecord(bookingId:any) {
    this.booking.bookingId= bookingId;
    this.deleteDialog = true;
  }

  hideDialog() {
    this.checkBookDialog = false;
    this.bookingExist = false;
    this.deleteDialog =false;
    this.form.reset();
  }

  checkBookings() {
    this.bookingExist = false;
    this.bookservice.getBookingbyId(this.booking.bookingId).subscribe({
      next: res => {
        console.log(res);
        this.bookingExist = true;
        this.form.reset();
      },
      error: (error) => {
        this.router.navigate(['booking-details', this.booking.bookingId])
        localStorage.setItem('bookid',this.booking.bookingId);
        localStorage.setItem('addMode','true');
      }
    })
  }

  deleteBooking(bookingId: number) {
    this.bookservice.deleteBooking(bookingId)
      .subscribe(
        data => {
          console.log(data);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Booking Deleted', life: 1000 });
          this.deleteDialog =false;
        },
        error => {
          console.log(error);
        },
        () => {
          this.getBooking()
        }
      );
  }
  viewBooking(bookingId: any) {
    this.router.navigate(['booking-details', bookingId]);
  }
}



