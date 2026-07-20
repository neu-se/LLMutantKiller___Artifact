import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51.5, -0.15);
    const destination = GeoPoint.calculateDestination(point, 10000, 45);
    expect(destination.latitude).toBeCloseTo(51.6423, 4);
    expect(destination.longitude).toBeCloseTo(-0.0063, 4);
  });
});