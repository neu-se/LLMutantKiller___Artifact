import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint constructor longitude boundary', () => {
  it('should accept longitude of exactly -180 without throwing', () => {
    expect(() => new GeoPoint(0, -180)).not.toThrow();
  });
});