import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should create a new GeoPoint with numeric latitude and longitude', () => {
    const geoPoint = new GeoPoint(1, 2);
    expect(geoPoint.latitude).toBe(1);
    expect(geoPoint.longitude).toBe(2);
  });
});