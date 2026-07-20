import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should create a GeoPoint from a valid object with latitude and longitude', () => {
    const point = GeoPoint.fromObject({ latitude: 40.7128, longitude: -74.0060 });
    expect(point.latitude).toBe(40.7128);
    expect(point.longitude).toBe(-74.0060);
  });
});