import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint constructor latitude validation', () => {
  it('should throw RangeError when latitude exceeds 90 degrees', () => {
    expect(() => new GeoPoint(91, 0)).toThrow(RangeError);
  });
});