import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51.5, -0.15);
    const destination = GeoPoint.calculateDestination(point.toObject(), 10000, 45);
    expect(destination.latitude).toBeCloseTo(51.583, 3);
    expect(destination.longitude).toBeCloseTo(-0.104, 3);
  });
});