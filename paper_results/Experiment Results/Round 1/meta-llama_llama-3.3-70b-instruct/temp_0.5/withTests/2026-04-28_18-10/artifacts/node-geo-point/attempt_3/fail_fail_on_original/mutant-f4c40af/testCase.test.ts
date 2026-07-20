import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000;
    const bearing = 0;
    const destination = point.calculateDestination(distance, bearing);
    expect(destination.latitude).toBeCloseTo(0.008983, 5);
    expect(destination.longitude).toBeCloseTo(0, 5);
  });
});