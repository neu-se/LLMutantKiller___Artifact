import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor latitude validation', () => {
  it('should throw RangeError for latitude values outside the valid range', () => {
    expect(() => new GeoPoint(91, 0)).toThrow(RangeError);
    expect(() => new GeoPoint(-91, 0)).toThrow(RangeError);
  });
});