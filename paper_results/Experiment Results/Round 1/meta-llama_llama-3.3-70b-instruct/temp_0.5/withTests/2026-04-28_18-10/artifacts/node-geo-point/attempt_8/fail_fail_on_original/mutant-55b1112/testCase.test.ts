import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = GeoPoint.calculateDestination(point, 10000, 45);
    const expectedLatitude = 0.89879;
    const expectedLongitude = 0.7854;
    expect(Math.abs(destination.latitude - expectedLatitude)).toBeLessThan(0.001);
    expect(Math.abs(destination.longitude - expectedLongitude)).toBeLessThan(0.001);
  });
});