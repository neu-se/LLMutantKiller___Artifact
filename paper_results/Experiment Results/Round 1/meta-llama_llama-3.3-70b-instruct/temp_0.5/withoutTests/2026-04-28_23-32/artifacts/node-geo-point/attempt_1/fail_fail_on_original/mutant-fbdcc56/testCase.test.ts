import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000; // 1 km
    const bearing = 45; // 45 degrees
    const destination = point.calculateDestination(distance, bearing);
    expect(destination.latitude).toBeCloseTo(0.008983, 5);
    expect(destination.longitude).toBeCloseTo(0.008983, 5);
  });
});