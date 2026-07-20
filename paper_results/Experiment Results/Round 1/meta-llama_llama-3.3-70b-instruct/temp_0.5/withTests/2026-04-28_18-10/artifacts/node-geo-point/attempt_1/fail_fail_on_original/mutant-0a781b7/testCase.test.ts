import { GeoPoint } from "../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51, 0);
    const d1 = point.calculateDestination(10000, 90);
    expect(d1.latitude).toBeGreaterThan(51);
  });
});