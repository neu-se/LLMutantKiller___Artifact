import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should create a GeoPoint from an object with latitude and longitude', () => {
    const object = { latitude: 51.5, longitude: -0.15 };
    const geoPoint = GeoPoint.fromObject(object);
    expect(geoPoint.latitude).toBe(51.5);
    expect(geoPoint.longitude).toBe(-0.15);
  });
});