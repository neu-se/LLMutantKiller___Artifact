import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError when passed null instead of a valid GeoJSON object', () => {
    let thrownError: unknown;
    try {
      GeoPoint.fromGeoJSON(null as any);
    } catch (e) {
      thrownError = e;
    }
    expect(thrownError).toBeInstanceOf(TypeError);
    expect((thrownError as TypeError).message).not.toContain('Cannot read');
  });
});