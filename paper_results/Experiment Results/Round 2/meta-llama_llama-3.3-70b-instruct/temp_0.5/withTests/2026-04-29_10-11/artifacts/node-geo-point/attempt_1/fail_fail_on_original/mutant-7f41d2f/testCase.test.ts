import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51, 0);
    const destination = point.calculateDestination(10000, 45);
    expect(destination.latitude).toBeCloseTo(51.141, 3);
    expect(destination.longitude).toBeCloseTo(0.124, 3);
  });
});