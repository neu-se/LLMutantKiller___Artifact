import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateBearing', () => {
  it('should return the correct bearing between two points', () => {
    const point1 = new GeoPoint(51.5074, -0.1278); // London
    const point2 = new GeoPoint(48.8566, 2.3522); // Paris
    const bearing = point1.calculateBearing(point2);
    expect(bearing).toBeCloseTo(135.1, 1);
  });
});