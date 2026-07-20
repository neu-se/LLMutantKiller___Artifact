import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor longitude validation', () => {
  it('should throw RangeError for longitude value outside valid range', () => {
    expect(() => {
      new GeoPoint(0, 181);
    }).toThrow(RangeError);

    expect(() => {
      new GeoPoint(0, -181);
    }).toThrow(RangeError);
  });
});