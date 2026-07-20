import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint longitude validation', () => {
  it('should throw RangeError when longitude is out of bounds (e.g., 200)', () => {
    expect(() => new GeoPoint(0, 200)).toThrow(RangeError);
  });
});