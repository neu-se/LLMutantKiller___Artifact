import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw a RangeError when longitude is outside the valid range', () => {
    expect(() => new GeoPoint(0, 200)).toThrow(RangeError);
  });
});