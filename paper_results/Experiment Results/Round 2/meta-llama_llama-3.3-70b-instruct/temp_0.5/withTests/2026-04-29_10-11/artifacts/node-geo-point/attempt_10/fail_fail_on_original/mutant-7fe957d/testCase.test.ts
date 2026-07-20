import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 1);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeGreaterThan(0);
    const point3 = new GeoPoint(0, 0);
    const point4 = new GeoPoint(0, 0);
    const distance2 = GeoPoint.calculateDistance(point3, point4);
    expect(distance2).toBeCloseTo(0);
    expect(GeoPoint.calculateDistance(point1, point2)).not.toBeNaN();
    expect(GeoPoint.calculateDistance(point1, point2)).not.toEqual(Infinity);
    expect(GeoPoint.calculateDistance(point1, point2)).not.toEqual(-Infinity);
  });
});