import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should create an instance from an object', () => {
    const object = { latitude: 51.5, longitude: -0.15 };
    const geoPoint = GeoPoint.fromObject(object);
    expect(geoPoint.latitude).toBe(51.5);
    expect(geoPoint.longitude).toBe(-0.15);
  });
});