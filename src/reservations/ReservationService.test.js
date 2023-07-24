const ReservationService = require("./ReservationService.js");
const ReservationRepository = require("./ReservationRepository.js");

describe("ReservationService Unit Tests", () => {
  let reservationService;
  const reservationMock = {
    roomId: 1,
    guestName: "John Doe",
    checkInDate: "2023-08-01",
    checkOutDate: "2023-08-05"
  }

  beforeEach(() => {
    const reservationRepository = new ReservationRepository();
    reservationService = new ReservationService(reservationRepository);
  });

  it("should create a new reservation", () => {
    const reservation = reservationService.createReservation(reservationMock);

    expect(reservation).toHaveProperty("roomId", 1);
    expect(reservation).toHaveProperty("guestName", "John Doe");
    expect(reservation).toHaveProperty("checkInDate", "2023-08-01");
    expect(reservation).toHaveProperty("checkOutDate", "2023-08-05");
  });

  it("should throw an error for overlapping dates", () => {
    reservationService.createReservation(reservationMock);

    expect(() =>
      reservationService.createReservation({
        roomId: 1,
        guestName: "Jane Smith",
        checkInDate: "2023-08-03",
        checkOutDate: "2023-08-06"
      })
    ).toThrowError("The room is already booked for the selected dates.");
  });
});