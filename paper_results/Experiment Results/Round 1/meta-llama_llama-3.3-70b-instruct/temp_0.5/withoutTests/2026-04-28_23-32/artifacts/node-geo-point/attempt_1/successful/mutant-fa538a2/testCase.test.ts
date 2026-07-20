import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw a RangeError with a descriptive message when creating a new GeoPoint with invalid longitude', () => {
    expect(() => new GeoPoint(0, 200)).toThrow(RangeError);
    expect(() => new GeoPoint(0, 200)).toThrowError('bad longitude value');
  });
});