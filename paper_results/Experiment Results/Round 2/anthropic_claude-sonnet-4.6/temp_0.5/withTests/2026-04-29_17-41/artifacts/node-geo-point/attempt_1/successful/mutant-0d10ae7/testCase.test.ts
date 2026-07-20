import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint longitude boundary', () => {
  it('should allow creating a GeoPoint with longitude exactly equal to -180', () => {
    // The original code uses `longitude < -180`, so -180 is valid
    // The mutated code uses `longitude <= -180`, so -180 would throw
    expect(() => new GeoPoint(0, -180)).not.toThrow();
    const point = new GeoPoint(0, -180);
    expect(point.longitude).toBe(-180);
  });
});