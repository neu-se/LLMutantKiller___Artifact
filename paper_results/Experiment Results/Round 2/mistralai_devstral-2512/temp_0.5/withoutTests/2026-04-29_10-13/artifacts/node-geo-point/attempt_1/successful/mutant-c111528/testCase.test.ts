import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor longitude validation', () => {
  it('should throw RangeError for longitude less than -180', () => {
    expect(() => {
      new GeoPoint(0, -181);
    }).toThrow(RangeError);
  });
});