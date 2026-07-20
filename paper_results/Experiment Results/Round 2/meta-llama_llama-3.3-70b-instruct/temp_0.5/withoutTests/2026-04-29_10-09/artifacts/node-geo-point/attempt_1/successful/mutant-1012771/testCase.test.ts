import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw a RangeError when longitude is greater than 180', () => {
    expect(() => new GeoPoint(0, 181)).toThrow(RangeError);
  });
});