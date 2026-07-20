import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should allow longitude to be exactly 180', () => {
    expect(() => new GeoPoint(0, 180)).not.toThrow();
  });
});