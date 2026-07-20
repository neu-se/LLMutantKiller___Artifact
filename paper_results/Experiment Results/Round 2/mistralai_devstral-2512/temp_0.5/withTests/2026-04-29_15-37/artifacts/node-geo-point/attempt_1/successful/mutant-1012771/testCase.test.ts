import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError for longitude value greater than 180', () => {
    expect(() => {
      new GeoPoint(0, 181);
    }).toThrow(RangeError);
  });
});