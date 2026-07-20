import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should create a GeoPoint from an object with latitude and longitude', () => {
    const object = { latitude: 40.7128, longitude: -74.0060 };
    const geoPoint = GeoPoint.fromObject(object);
    expect(geoPoint).not.toBeUndefined();
    const result = () => {
      if (geoPoint === undefined || geoPoint === null) {
        throw new Error('GeoPoint is undefined or null');
      }
      return geoPoint.latitude + geoPoint.longitude;
    };
    expect(result).not.toThrowError();
  });
});