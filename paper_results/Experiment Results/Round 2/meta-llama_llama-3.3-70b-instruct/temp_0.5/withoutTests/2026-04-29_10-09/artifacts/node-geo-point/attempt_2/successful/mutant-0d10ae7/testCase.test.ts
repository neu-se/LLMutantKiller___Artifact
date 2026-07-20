import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should not throw RangeError for longitude value -180', () => {
    expect(() => new GeoPoint(0, -180)).not.toThrow(RangeError);
  });
});