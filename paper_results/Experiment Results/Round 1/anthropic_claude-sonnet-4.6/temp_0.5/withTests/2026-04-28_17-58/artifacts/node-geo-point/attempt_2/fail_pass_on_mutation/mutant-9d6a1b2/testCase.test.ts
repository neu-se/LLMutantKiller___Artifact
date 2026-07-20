import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should create a GeoPoint from a valid object with latitude and longitude', () => {
    const result = GeoPoint.fromObject({ latitude: 51.5, longitude: -0.15 });
    expect(result.latitude).toBe(51.5);
    expect(result.longitude).toBe(-0.15);
  });
});