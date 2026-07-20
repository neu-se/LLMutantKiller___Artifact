import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint class', () => {
  it('should throw an error when creating a GeoPoint with invalid latitude', () => {
    expect(() => new GeoPoint(100, 0)).toThrow(RangeError);
    expect(() => new GeoPoint(-100, 0)).toThrow(RangeError);
  });
});