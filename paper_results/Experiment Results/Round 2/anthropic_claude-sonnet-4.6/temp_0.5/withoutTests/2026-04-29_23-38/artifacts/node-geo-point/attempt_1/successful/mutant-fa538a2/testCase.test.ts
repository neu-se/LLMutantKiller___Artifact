import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint constructor longitude validation', () => {
  it('should throw a RangeError with message "bad longitude value" when longitude is out of range', () => {
    expect(() => new GeoPoint(0, 200)).toThrow(RangeError);
    expect(() => new GeoPoint(0, 200)).toThrow('bad longitude value');
  });
});