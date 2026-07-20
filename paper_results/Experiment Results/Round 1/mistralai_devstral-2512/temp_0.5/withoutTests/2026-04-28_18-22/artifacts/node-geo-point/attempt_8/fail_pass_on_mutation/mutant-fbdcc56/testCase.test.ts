import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination with bearing 45 degrees from equator', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 45; // Northeast
    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);
    expect(destination.latitude).toBeCloseTo(0.0636, 4);
    expect(destination.longitude).toBeCloseTo(0.0636, 4);
  });
});