import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint class', () => {
  it('should create a new GeoPoint from an object with latitude and longitude properties', () => {
    const object = { latitude: 37.7749, longitude: -122.4194 };
    const geoPoint = GeoPoint.fromObject(object);
    expect(geoPoint.latitude).toBe(37.7749);
    expect(geoPoint.longitude).toBe(-122.4194);
  });
});