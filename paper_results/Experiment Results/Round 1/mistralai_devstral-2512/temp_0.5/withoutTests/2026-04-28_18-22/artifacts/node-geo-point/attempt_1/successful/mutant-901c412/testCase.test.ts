import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor', () => {
  it('should accept latitude value of exactly -90', () => {
    const point = new GeoPoint(-90, 0);
    expect(point.latitude).toBe(-90);
    expect(point.longitude).toBe(0);
  });
});