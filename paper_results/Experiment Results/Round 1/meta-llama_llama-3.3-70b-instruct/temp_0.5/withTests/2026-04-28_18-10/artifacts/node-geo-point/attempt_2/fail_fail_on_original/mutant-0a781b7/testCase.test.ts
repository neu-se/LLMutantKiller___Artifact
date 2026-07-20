import { GeoPoint } from './geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const d1 = point.calculateDestination(10000, 0);
    expect(d1.longitude).toBeCloseTo(0);
    expect(d1.latitude).toBeGreaterThan(0);
  });
});