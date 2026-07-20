import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination with bearing 180 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 180; // South
    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);
    expect(destination.latitude).toBeCloseTo(-0.08993, 4);
    expect(destination.longitude).toBeCloseTo(0, 4);
  });
});