import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance between two points', () => {
    const point1 = new GeoPoint(51.5, -0.15);
    const point2 = new GeoPoint(51.6, -0.16);
    const distance = point1.calculateDistance(point2);
    expect(distance).toBeGreaterThan(0);
  });
});