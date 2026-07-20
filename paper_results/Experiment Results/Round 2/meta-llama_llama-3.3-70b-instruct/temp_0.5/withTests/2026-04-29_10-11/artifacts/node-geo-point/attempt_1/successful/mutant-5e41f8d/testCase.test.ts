import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error for invalid latitude', () => {
    expect(() => new GeoPoint(-91, 0)).toThrowError(RangeError);
    expect(() => new GeoPoint(91, 0)).toThrowError(RangeError);
  });
});