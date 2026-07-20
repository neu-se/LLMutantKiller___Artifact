import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should create a GeoPoint from an object with latitude and longitude', () => {
    const object = { latitude: 40.7128, longitude: -74.0060 };
    const geoPoint = GeoPoint.fromObject(object);
    expect(geoPoint).not.toBeNull();
    expect(geoPoint).not.toBeUndefined();
    expect(geoPoint.latitude).toBeCloseTo(object.latitude);
    expect(geoPoint.longitude).toBeCloseTo(object.longitude);
  });
});