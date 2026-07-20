import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(40, 0);
    const distance = 1000000;
    const bearing = 90;
    const destination = point.calculateDestination(distance, bearing);
    expect(destination.longitude).toBeGreaterThan(8.99);
  });
});