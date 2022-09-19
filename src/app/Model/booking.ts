export class Booking{
    bookingId:string;
	trainNumber:string;
	trainName:string;
	passenger:Array<string>;
	ticketPrice:string;
	departureDate:Date;
	returnBooking:string;
	returnDate:Date;
	departureStation:string;
	arrivalStation:string;
	stop1:string;
	stop2:string;
	returnStop1:string;
	returnStop2:string;
	createdSource:string;
	createdSourceType:string;
	createdDttm:Date;
	modifiedSource:string;
	modifiedSourceType:string;
	modifiedDttm:string;

}