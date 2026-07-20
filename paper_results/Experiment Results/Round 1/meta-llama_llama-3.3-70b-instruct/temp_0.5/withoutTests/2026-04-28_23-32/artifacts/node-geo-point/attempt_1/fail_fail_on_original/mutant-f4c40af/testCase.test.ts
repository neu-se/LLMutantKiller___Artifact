import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(40.7128, -74.0060);
    const distance = 1000; // 1 km
    const bearing = 90; // east

    const destination = point.calculateDestination(distance, bearing);
    expect(destination.latitude).toBeCloseTo(40.7128, 5);
    expect(destination.longitude).toBeCloseTo(-73.9863, 5);
  });
});