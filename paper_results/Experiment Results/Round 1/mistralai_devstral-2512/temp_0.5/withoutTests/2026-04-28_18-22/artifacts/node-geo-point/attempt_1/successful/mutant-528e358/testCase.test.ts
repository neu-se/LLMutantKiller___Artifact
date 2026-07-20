import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError for longitude outside valid range', () => {
    expect(() => {
      new GeoPoint(0, 181);
    }).toThrow(RangeError);

    expect(() => {
      new GeoPoint(0, -181);
    }).toThrow(RangeError);
  });
});