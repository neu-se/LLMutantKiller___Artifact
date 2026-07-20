import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly for two points with a small difference in longitude', () => {
    const p1 = new GeoPoint(0, 0);
    const p2 = new GeoPoint(0, 0.000001);

    const distance = GeoPoint.calculateDistance(p1, p2);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(1);
  });
});