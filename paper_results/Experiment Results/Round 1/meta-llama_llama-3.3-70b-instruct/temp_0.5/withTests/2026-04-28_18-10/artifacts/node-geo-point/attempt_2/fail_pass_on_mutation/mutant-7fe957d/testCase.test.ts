import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly for two points with the same longitude', () => {
    const p1 = new GeoPoint(51.5, -0.15);
    const p2 = new GeoPoint(51.6, -0.15);

    const distance = GeoPoint.calculateDistance(p1, p2);
    expect(distance).toBeGreaterThan(0);
  });
});