import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Booking } from '../Model/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  // editable=new Subject()

  constructor(private http:HttpClient) { }
  getBookinglist():Observable<any>{
    return this.http.get("http://localhost:9091/TrainBooking/findAllBooking");
  }
  
  addBooking(booking:Booking):Observable<any>{
    // console.log(booking);
    
    return this.http.post("http://localhost:9091/TrainBooking/addBooking",booking,{responseType: 'text'});

  }
  deleteBooking(bookingId): Observable<any> {
    let params = new HttpParams()
    .set('bookingId', bookingId);
    return this.http.delete("http://localhost:9091/TrainBooking/deleteByBookingId", {params: params,responseType: 'text'});
  }
  updateBooking(booking:Booking):Observable<any>{
    return this.http.put("http://localhost:9091/TrainBooking/updateBooking",booking,{responseType: 'text'});
  }

  getBookingbyId(bookingId:any):Observable<Booking>{
    return this.http.get<Booking>("http://localhost:9091/TrainBooking/findBookingsByBookingId",
    {
      params: new HttpParams().set('bookingId', bookingId)
    });
  }

}
