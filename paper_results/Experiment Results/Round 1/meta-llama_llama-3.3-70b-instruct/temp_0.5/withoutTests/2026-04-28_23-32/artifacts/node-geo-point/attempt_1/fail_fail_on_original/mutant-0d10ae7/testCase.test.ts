import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw RangeError when longitude is -180', () => {
    expect(() => new GeoPoint(0, -180)).toThrow(RangeError);
  });
});