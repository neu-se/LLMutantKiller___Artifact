import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint validation', () => {
  it('should throw RangeError with descriptive message for invalid latitude', () => {
    expect(() => {
      new GeoPoint(100, 0);
    }).toThrow(RangeError);
  });
});