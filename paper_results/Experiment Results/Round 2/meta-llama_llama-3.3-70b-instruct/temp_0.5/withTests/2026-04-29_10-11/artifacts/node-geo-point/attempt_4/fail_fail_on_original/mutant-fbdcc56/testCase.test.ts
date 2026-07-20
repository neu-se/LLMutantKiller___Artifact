import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination = GeoPoint.calculateDestination(point.toObject(), 10000, 45);
    const expectedLatitude = 0.899;
    const expectedLongitude = -0.117;
    expect(destination.latitude).toBeCloseTo(expectedLatitude, 3);
    expect(destination.longitude).toBeCloseTo(expectedLongitude, 3);
  });
});