import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly for a specific case', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000; // 1 km
    const bearing = 90; // 90 degrees
    const destination = GeoPoint.calculateDestination(point, distance, bearing);
    const x = Math.cos(distance / 6371e3);
    const y = Math.sin(distance / 6371e3);
    expect(destination.longitude).toBeCloseTo(y, 4);
  });
});