import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint with a longitude outside the valid range', () => {
    expect(() => new GeoPoint(0, 181)).toThrow(RangeError);
  });
});