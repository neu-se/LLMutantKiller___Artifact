import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 37.7749, longitude: -122.4194 };
    const distance = 1000; // 1 km
    const bearing = 180; // south

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destination.latitude).toBeLessThan(coordinate.latitude);
  });
});