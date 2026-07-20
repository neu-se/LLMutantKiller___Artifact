import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 90; // east

    const destination = GeoPoint.calculateDestination(coordinate, distance, bearing);
    expect(destination.longitude).toBeGreaterThan(coordinate.longitude);
  });
});