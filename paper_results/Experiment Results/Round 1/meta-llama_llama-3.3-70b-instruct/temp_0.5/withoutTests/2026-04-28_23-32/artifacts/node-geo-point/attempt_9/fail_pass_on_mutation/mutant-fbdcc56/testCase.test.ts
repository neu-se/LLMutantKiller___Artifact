import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly for a specific case', () => {
    const point = new GeoPoint(0, 0);
    const distance = 100000; // 100 km
    const bearing = 0; // 0 degrees
    const destination = GeoPoint.calculateDestination(point, distance, bearing);
    expect(destination.latitude).toBeCloseTo(0.8993, 3);
    expect(destination.longitude).toBeCloseTo(0, 3);
  });
});