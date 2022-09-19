import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Booking } from '../Model/booking';
import { BookingService } from '../Services/booking.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  booking: Booking;
  bookingId: number;
  editable: boolean = false;
  isEditable = false;
  bookId: any;
  idEdit: boolean = false;
  submitted: boolean;
  bookingList: any;
  isRet: boolean = false;
  minDate: Date;
  maxDate: Date;
  invalidDates: Array<Date>;
  userLogin = false;
  loginUser: string;
  loginUserType: string;
  passengerName: string;
  constructor(private router: Router, private bookingservice: BookingService, private service:LoginService, private messageService: MessageService, private route: ActivatedRoute) { }

  getBooking() {
    this.booking = {
      bookingId: '',
      trainNumber: '',
      trainName: '',
      ticketPrice: '',
      passenger: [],
      departureDate: new Date(),
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

    // console.log(this.booking.passenger.toString());

  }
  ngOnInit(): void {
    this.getBooking();
    this.bookingId = this.route.snapshot.params['bookingId'];
    this.bookingservice.getBookingbyId(this.bookingId).subscribe(data => {
      this.booking = data;
      this.passengerName = this.booking.passenger ? this.booking.passenger.toString() : ""
    });
    this.booking.bookingId = localStorage.getItem('bookid');
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 0;
    let prevYear = prevMonth === 11 ? year - 0 : year;
    let nextMonth = month === 11 ? 0 : month + 2;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];

    this.editable = (localStorage.getItem("editable") === 'true')
    this.userLogin = (localStorage.getItem('admin') === 'true') 
    this.service.loggedInuser.subscribe(res => {
      this.loginUser = res;
      console.log(res);

    })
    this.service.loggedInType.subscribe(res => {
      this.loginUserType = res;
      console.log(res);
    })
  }
  goToBookingList() {
    this.router.navigate(['/booking']);
    localStorage.setItem("editable", "false");
  }
  onEdit() {
    this.editable = true;
    this.isEditable = true;
  }
  addBooking() {
    if (!this.isEditable) {
      localStorage.setItem("editable", "false");
      this.booking.createdSource = this.loginUser
      this.booking.createdSourceType = this.loginUserType
      this.booking.passenger = this.passengerName.split(",")
      // console.log(this.booking);
      // console.log(this.booking.passenger.length);

      this.bookingservice.addBooking(this.booking).subscribe(
        (data) => {
          console.log("Data Added ");
          this.submitted = true;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Booking Added', life: 1000 });
          this.goToBookingList()
        },
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Booking cannot be Added', life: 2000 });
          this.submitted = false;
        },
        () => {
          console.log("Completed");

        }
      );
    } else {
      this.updateBooking();
    }
  }
  updateBooking() {
    this.booking.passenger = this.passengerName.split(",")
    this.bookingservice.updateBooking(this.booking).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Booking Updated', life: 2000 });
      this.goToBookingList();
      console.log(this.booking)
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Booking cannot Updated', life: 2000 });
        console.log(error);
      });
  }
  // viewBooking(bookingId: any) {
  //   this.router.navigate(['booking-details', this.booking.bookingId]);
  // }
  isReturn(){
    console.log("selected Yes");
    this.isRet=true;
    
  }
  isNotReturn(){
    this.isRet=false;
  }
}
