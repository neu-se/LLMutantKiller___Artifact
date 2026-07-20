import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint longitude boundary', () => {
  it('should accept longitude of exactly 180 as a valid value', () => {
    expect(() => new GeoPoint(0, 180)).not.toThrow();
  });
});