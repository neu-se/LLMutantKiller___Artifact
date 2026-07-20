import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(51, 0);
    const distance = 10000;
    const bearing = 90;
    const destination = point.calculateDestination(distance, bearing);
    expect(destination.longitude).toBeGreaterThan(point.longitude);
  });
});