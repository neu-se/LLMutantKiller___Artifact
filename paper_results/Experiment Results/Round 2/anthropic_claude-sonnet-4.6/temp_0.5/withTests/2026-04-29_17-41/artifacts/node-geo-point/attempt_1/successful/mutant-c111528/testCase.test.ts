import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint longitude validation', () => {
  it('should throw RangeError when longitude is less than -180', () => {
    expect(() => new GeoPoint(0, -181)).toThrow(RangeError);
  });
});