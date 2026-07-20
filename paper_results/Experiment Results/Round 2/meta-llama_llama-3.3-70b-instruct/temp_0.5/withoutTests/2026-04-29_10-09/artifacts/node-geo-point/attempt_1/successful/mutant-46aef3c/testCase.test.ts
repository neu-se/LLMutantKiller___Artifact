import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint class', () => {
  it('should throw an error when longitude is out of range', () => {
    expect(() => new GeoPoint(0, 200)).toThrow(RangeError);
  });
});