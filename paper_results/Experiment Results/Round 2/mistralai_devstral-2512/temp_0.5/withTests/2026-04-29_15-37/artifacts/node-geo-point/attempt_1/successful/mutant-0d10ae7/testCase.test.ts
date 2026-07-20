import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint constructor longitude validation', () => {
  it('should accept longitude value of exactly -180', () => {
    const point = new GeoPoint(0, -180);
    expect(point.longitude).toBe(-180);
    expect(point.latitude).toBe(0);
  });
});