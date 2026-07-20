import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51, 0);
    const distance = 10000;
    const bearing = 45;
    const destination = point.calculateDestination(distance, bearing);
    expect(destination.latitude).toBeCloseTo(51.1408, 4);
    expect(destination.longitude).toBeCloseTo(0.7854, 4);
  });
});