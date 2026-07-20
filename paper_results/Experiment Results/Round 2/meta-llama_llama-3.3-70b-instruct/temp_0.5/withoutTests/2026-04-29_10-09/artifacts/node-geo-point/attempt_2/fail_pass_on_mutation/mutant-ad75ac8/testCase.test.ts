import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should create a GeoPoint with valid coordinates', () => {
    expect(() => new GeoPoint(0, 0)).not.toThrow();
  });
});