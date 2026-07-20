import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBe(0);
  });
});