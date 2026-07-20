import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should create a GeoPoint from an object with latitude and longitude properties', () => {
    const object = { latitude: 10, longitude: 20 };
    const geoPoint = GeoPoint.fromObject(object);
    expect(geoPoint.latitude).toBe(10);
    expect(geoPoint.longitude).toBe(20);
  });
});