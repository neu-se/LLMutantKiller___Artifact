import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should create a GeoPoint from a valid lat/lng object', () => {
    const obj = { latitude: 51.5074, longitude: -0.1278 };
    const point = (GeoPoint as any).fromObject(obj);
    expect(point).toBeInstanceOf(GeoPoint);
    expect(point.latitude).toBe(51.5074);
    expect(point.longitude).toBe(-0.1278);
  });
});