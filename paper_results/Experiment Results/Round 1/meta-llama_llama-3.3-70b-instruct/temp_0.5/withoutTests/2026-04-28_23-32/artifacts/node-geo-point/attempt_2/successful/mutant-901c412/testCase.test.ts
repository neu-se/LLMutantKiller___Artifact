import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should not throw an error when latitude is exactly -90', () => {
    expect(() => new GeoPoint(-90, 0)).not.toThrow(RangeError);
  });
});