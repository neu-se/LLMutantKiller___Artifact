import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint latitude boundary', () => {
  it('should allow creating a GeoPoint with latitude exactly -90', () => {
    expect(() => new GeoPoint(-90, 0)).not.toThrow();
    const point = new GeoPoint(-90, 0);
    expect(point.latitude).toBe(-90);
  });
});