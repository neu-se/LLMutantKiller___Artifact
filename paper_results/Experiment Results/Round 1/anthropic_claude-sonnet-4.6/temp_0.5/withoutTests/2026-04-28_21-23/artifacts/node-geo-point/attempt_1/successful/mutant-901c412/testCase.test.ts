import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint constructor latitude boundary', () => {
  it('should allow latitude of exactly -90 without throwing', () => {
    expect(() => new GeoPoint(-90, 0)).not.toThrow();
  });
});