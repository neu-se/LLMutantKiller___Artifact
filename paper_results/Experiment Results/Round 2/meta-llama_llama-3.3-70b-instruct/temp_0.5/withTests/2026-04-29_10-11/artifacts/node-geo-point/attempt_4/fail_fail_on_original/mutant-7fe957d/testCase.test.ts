import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly', () => {
    const point1 = new GeoPoint(51.5, -0.15);
    const point2 = new GeoPoint(51.6, -0.16);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeGreaterThan(0);
    const point3 = new GeoPoint(51.5, -0.15);
    const point4 = new GeoPoint(51.5, -0.15);
    const distance2 = GeoPoint.calculateDistance(point3, point4);
    expect(distance2).toBeCloseTo(0, 6);
  });
});