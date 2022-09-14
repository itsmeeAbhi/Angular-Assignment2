import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../Model/booking';
import { BookingService } from '../Services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  booking: Booking;
  bookingId:number;
  editable: boolean = false
  idEdit:boolean=false;
  isAdd:boolean=false;
  constructor(private router:Router, private bookingservice:BookingService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookingId=this.route.snapshot.params['bookingId'];
    this.bookingservice.getBookingbyId(this.bookingId).subscribe( data => {
      this.booking = data;
    });
  }
  goToBookingList(){
    this.router.navigate(['/booking']);
  }
  onEdit(){
    this.editable=true;
  }
  updateBooking() {
    // this.booking.modifiedSource = this.ModifiedUser
    // this.employee.modifiedSourceType = this.ModifiedUserType
    // this.employee.modifiedDttm = new Date();
    this.bookingservice.updateBooking(this.booking).subscribe(data => {
      this.goToBookingList();
      console.log(this.booking)
    }
      , error => console.log(error));
  }
}
