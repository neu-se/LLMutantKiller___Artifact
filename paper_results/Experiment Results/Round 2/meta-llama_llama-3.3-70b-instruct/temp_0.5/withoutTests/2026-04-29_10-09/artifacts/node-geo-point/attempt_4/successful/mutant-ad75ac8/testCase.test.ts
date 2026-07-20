import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint with non-numeric latitude', () => {
    const geoPoint = new GeoPoint(0, 0);
    expect(geoPoint.latitude).toBe(0);
    expect(geoPoint.longitude).toBe(0);
    expect(() => new GeoPoint('a' as any, 0)).toThrow(RangeError);
    expect(() => new GeoPoint(0, 'a' as any)).toThrow(RangeError);
    expect(() => new GeoPoint('a' as any, 'a' as any)).toThrow(RangeError);
    expect(new GeoPoint(0, 0).latitude).toBe(0);
    expect(new GeoPoint(0, 0).longitude).toBe(0);
  });
});