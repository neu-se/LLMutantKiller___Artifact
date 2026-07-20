import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should create a GeoPoint from a valid latitude/longitude object', () => {
    const point = GeoPoint.fromObject({ latitude: 51.5, longitude: -0.15 });
    expect(point.latitude).toBe(51.5);
    expect(point.longitude).toBe(-0.15);
  });
});