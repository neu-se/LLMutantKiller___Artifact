import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError for latitude values outside valid range', () => {
    expect(() => {
      new GeoPoint(91, 0);
    }).toThrow(RangeError);
  });
});