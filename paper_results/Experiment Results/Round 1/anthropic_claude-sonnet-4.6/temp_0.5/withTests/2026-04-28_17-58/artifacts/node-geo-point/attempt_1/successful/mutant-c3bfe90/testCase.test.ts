import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint longitude boundary', () => {
  it('should allow longitude of exactly 180', () => {
    // In the original code: longitude < -180 || longitude > 180 throws for > 180
    // So longitude === 180 is valid in original, but mutated code uses >= 180 which throws for === 180
    expect(() => new GeoPoint(0, 180)).not.toThrow();
  });
});