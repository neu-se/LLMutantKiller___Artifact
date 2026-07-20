import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should not throw RangeError when longitude is -180', () => {
    expect(() => new GeoPoint(0, -180)).not.toThrow(RangeError);
  });
});