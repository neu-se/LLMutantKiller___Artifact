import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000000;
    const bearing = 0;
    const destination = point.calculateDestination(distance, bearing);
    expect(destination.latitude).toBeGreaterThan(8.99);
    expect(destination.latitude).toBeLessThan(9.01);
  });
});