import { GeoPoint } from "../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw a RangeError with a meaningful message when creating a GeoPoint with invalid longitude', () => {
    expect(() => new GeoPoint(0, 200)).toThrow(RangeError);
    expect(() => new GeoPoint(0, 200)).toThrowError('bad longitude value');
  });
});