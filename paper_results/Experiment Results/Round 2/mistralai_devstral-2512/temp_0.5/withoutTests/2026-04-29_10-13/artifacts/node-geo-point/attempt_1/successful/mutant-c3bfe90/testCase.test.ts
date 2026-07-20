import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor longitude validation', () => {
  it('should accept longitude value of exactly 180', () => {
    expect(() => new GeoPoint(0, 180)).not.toThrow();
  });
});