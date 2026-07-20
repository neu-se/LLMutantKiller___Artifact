import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should create a GeoPoint from a valid latitude/longitude object', () => {
    const obj = { latitude: 48.8566, longitude: 2.3522 };
    const point = (GeoPoint as any).fromObject(obj);
    expect(point).toBeInstanceOf(GeoPoint);
    expect(point.latitude).toBe(48.8566);
    expect(point.longitude).toBe(2.3522);
  });
});