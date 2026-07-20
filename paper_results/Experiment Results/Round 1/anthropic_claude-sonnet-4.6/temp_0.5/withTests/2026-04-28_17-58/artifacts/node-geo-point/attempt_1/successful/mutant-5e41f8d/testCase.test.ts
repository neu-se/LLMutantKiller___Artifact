import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint latitude validation', () => {
  it('should throw RangeError when latitude is greater than 90', () => {
    expect(() => new GeoPoint(91, 0)).toThrow(RangeError);
  });
});