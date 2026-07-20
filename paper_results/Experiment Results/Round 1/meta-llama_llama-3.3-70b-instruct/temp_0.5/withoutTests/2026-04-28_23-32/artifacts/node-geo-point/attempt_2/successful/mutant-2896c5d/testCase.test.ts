import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate bearing correctly', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 1);
    const bearing = point1.calculateBearing(point2);
    expect(bearing).toBeCloseTo(90, 2);
  });
});