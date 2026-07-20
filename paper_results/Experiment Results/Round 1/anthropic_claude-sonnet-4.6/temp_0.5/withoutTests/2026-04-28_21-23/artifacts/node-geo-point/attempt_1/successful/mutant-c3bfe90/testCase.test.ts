import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor longitude boundary', () => {
  it('should accept longitude of exactly 180 as a valid value', () => {
    // In the original code: longitude < -180 || longitude > 180
    // A longitude of exactly 180 is valid (not > 180)
    // In the mutated code: longitude < -180 || longitude >= 180
    // A longitude of exactly 180 would throw (>= 180)
    expect(() => new GeoPoint(0, 180)).not.toThrow();
  });
});