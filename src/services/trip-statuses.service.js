import { protectedAxios } from "./api-service";

export function addTripStatusesService(tripId, stationId, countUp, countDown,IsFinished) {
  const url = `/TripStatuses`;

  const dataSend = {
    TripId: tripId,
    StationId: stationId,
    IsFinished: IsFinished
  };

  if (countUp !== undefined) {
    dataSend.CountUp = countUp;
  }

  if (countDown !== undefined) {
    dataSend.CountDown = countDown;
  }

  return protectedAxios.post(url, dataSend, {headers: {"Content-Type": 'multipart/form-data'}});
}
