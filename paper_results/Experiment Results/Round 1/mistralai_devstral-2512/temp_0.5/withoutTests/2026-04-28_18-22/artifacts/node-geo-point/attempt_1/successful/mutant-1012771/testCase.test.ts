import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError for longitude value of 200', () => {
    expect(() => {
      new GeoPoint(0, 200);
    }).toThrow(RangeError);
  });
});