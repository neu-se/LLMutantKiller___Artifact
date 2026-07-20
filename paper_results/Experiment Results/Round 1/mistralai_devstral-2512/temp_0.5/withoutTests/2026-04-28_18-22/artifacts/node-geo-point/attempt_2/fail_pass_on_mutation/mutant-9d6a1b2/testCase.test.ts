import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should create a GeoPoint from a valid object', () => {
    const result = GeoPoint.fromObject({ latitude: 45.5, longitude: -122.6 });
    expect(result.latitude).toBe(45.5);
    expect(result.longitude).toBe(-122.6);
  });
});