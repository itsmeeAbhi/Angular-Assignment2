import { Component, OnInit } from '@angular/core';
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
  submitted: boolean;
  userLogin = false;
  loginUser: string;
  loginUserType: string;
  msg = '';

  constructor(private bookservice: BookingService, private router: Router, private messageService: MessageService, private service: LoginService) { }
  ngOnInit() {
    this.getBooking()
    // this.userLogin = (localStorage.getItem('admin') === 'true') 
    // this.service.loggedInuser.subscribe(res => {
    //   this.loginUser = res;
    //   console.log(res);

    // })
    // this.service.loggedInType.subscribe(res => {
    //   this.loginUserType = res;
    //   console.log(res);
    // })
  }
  getBooking() {
    this.booking = {
      bookingId: '',
      trainNumber: '',
      trainName: '',
      ticketPrice: '',
      passenger:[],
      departureDate:new Date(),
      returnBooking: '',
      returnDate: new Date(),
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
      modifiedDttm: ''
    };
    this.bookservice.getBookinglist().subscribe(
      data => {
        this.bookingList = data;
        // console.log(this.bookingList);
        // console.log("Response Received")
      },
      error => console.log("Error Occured")
    )
  }
  checkBooking() {
    this.submitted = false;
    this.checkBookDialog = true;
    localStorage.setItem("editable",'true');
  }
  deleteRecord(bookingId:any) {
    this.submitted = false;
    this.booking.bookingId= bookingId;
    this.deleteDialog = true;
  }

  hideDialog() {
    this.submitted = false;
    this.checkBookDialog = false;
    this.bookingExist = false;
    this.deleteDialog =false;
  }

  checkBookings() {
    this.bookingExist = false;
    this.bookservice.getBookingbyId(this.booking.bookingId).subscribe({
      next: res => {
        console.log(res);
        this.bookingExist = true;
      },
      error: (error) => {
        this.router.navigate(['booking-details', this.booking.bookingId])
        localStorage.setItem('bookid',this.booking.bookingId);
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



