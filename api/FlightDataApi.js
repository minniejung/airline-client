import flightList from "../resource/flightList";
import fetch from "node-fetch";

if (typeof window !== "undefined") {
  localStorage.setItem("flight", JSON.stringify(flightList));
}

export async function getFlight(filterBy = {}) {
  try {
    const res = await fetch(`http://localhost:4999/flight`);
    const flights = await res.json();

    return flights.filter((flight) => {
      let condition = true;

      if (filterBy.departure) {
        condition = condition && flight.departure === filterBy.departure;
      }
      if (filterBy.destination) {
        condition = condition && flight.destination === filterBy.destination;
      }
      return condition;
    });
  } catch (error) {
    console.error("Error fetching flights:", error);
    return [];
  }
}
