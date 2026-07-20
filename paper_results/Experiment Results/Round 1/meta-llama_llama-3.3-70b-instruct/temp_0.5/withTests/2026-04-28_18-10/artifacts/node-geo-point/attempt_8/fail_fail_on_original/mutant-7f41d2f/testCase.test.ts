import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, 10000, 45);
    const expectedLat = 0.008998;
    const expectedLong = 0.008998;
    expect(destination.latitude).toBeCloseTo(expectedLat, 5);
    expect(destination.longitude).toBeCloseTo(expectedLong, 5);
  });
});