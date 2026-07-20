import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 40.7128, longitude: -74.0060 };
    const distance = 1000; // 1 km
    const bearing = 90; // east

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    const reverseDestination = GeoPoint.calculateDestination(destination, distance, 270); // west
    expect(reverseDestination.longitude).toBeCloseTo(coordinate.longitude, 5);
    expect(reverseDestination.latitude).toBeCloseTo(coordinate.latitude, 5);
  });
});