import flightList from "../resource/flightList";
import fetch from "node-fetch";

if (typeof window !== "undefined") {
  localStorage.setItem("flight", JSON.stringify(flightList));
}

export async function getFlight({ departure, destination }) {
  try {
    const url = `http://localhost:4999/flight`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`ERROR status: ${res.status}`);

    const flights = await res.json();

    const filteredFlights = flights.filter((flight) => {
      let condition = true;

      if (departure) {
        condition = condition && flight.departure === departure;
      }
      if (destination) {
        condition = condition && flight.destination === destination;
      }
      return condition;
    });

    return filteredFlights;
  } catch (error) {
    console.error("ERROR fetching flights:", error);
    return [];
  }
}
