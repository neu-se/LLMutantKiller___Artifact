import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeCloseTo(0);
    const point3 = new GeoPoint(51.5, -0.15);
    const point4 = new GeoPoint(51.6, -0.16);
    const distance2 = GeoPoint.calculateDistance(point3, point4);
    expect(distance2).toBeGreaterThan(0);
    expect(GeoPoint.calculateDistance(point1, point2)).not.toBeNaN();
  });
});