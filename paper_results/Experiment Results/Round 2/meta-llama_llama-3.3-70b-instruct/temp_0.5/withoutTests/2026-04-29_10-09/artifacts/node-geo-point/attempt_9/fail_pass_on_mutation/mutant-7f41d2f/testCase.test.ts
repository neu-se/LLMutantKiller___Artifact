import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 1000; // 1 km
    const bearing = 90; // east

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    const destination2 = GeoPoint.calculateDestination(coordinate, distance, 270); // west
    expect(destination.longitude + destination2.longitude).toBeCloseTo(0, 6);
  });
});