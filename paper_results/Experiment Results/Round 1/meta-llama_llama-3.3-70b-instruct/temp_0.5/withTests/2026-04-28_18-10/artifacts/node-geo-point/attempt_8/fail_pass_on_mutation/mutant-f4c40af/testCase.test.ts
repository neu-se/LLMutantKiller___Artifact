import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    const distance = 1000;
    const bearing = 0;
    const destination1 = point1.calculateDestination(distance, bearing);
    const destination2 = point2.calculateDestination(distance, bearing);
    expect(destination1.latitude).toBeCloseTo(destination2.latitude, 10);
    expect(Math.abs(destination1.longitude - destination2.longitude)).toBeLessThan(1e-9);
  });
});