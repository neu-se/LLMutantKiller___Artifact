import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should correctly calculate destination with bearing', () => {
    const point = new GeoPoint(0, 0);
    const destination = point.calculateDestination(10000, 90);
    expect(destination.longitude).toBeGreaterThan(0);
  });
});