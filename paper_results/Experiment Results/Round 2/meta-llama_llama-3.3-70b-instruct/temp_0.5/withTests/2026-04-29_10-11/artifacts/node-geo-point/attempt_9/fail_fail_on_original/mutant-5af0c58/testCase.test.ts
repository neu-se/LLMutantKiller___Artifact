import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should create a new GeoPoint and throw an error when non-numeric arguments are passed', () => {
    const geoPoint1 = new GeoPoint(1, 2);
    expect(geoPoint1.latitude).toBe(1);
    expect(geoPoint1.longitude).toBe(2);
    expect(() => new GeoPoint('a' as any, 2)).toThrowError(RangeError);
    expect(() => new GeoPoint(1, 'b' as any)).toThrowError(RangeError);
  });
});