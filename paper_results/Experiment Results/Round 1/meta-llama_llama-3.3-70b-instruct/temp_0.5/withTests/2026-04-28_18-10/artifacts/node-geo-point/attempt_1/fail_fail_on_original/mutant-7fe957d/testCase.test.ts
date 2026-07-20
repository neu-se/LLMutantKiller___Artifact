import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly', () => {
    const p1 = new GeoPoint(51.5, -0.15);
    const p2 = new GeoPoint(51.6, -0.16);

    const distance = GeoPoint.calculateDistance(p1, p2);
    expect(Math.round(distance)).toBe(11142);
  });
});