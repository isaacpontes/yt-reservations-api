const Booking = require("./Booking");

class BookingService {
  constructor(repository) {
    this.repository = repository;
  }

  findAllBookings() {
    return this.repository.findAll();
  }

  createBooking({ roomId, guestName, checkInDate, checkOutDate }) {
    const newBooking = new Booking(roomId, guestName, checkInDate, checkOutDate);

    const overlappingBooking = this.repository.findAll().find((booking) => {
      return (
        booking.roomId === newBooking.roomId &&
        booking.checkOutDate > newBooking.checkInDate &&
        booking.checkInDate < newBooking.checkOutDate
      );
    });

    if (overlappingBooking) {
      throw new Error("The room is already booked for the selected dates.");
    }

    this.repository.create(newBooking);
    return newBooking;
  }
}

module.exports = BookingService;