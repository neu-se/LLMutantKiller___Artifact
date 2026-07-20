import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint constructor longitude boundary', () => {
  it('should accept -180 as a valid longitude value', () => {
    expect(() => new GeoPoint(0, -180)).not.toThrow();
    const point = new GeoPoint(0, -180);
    expect(point.longitude).toBe(-180);
  });
});