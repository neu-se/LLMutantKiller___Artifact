import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError about argument being an object when passed a number', () => {
    let thrownError: Error | undefined;
    try {
      GeoPoint.fromGeoJSON(42 as any);
    } catch (e) {
      thrownError = e as Error;
    }
    expect(thrownError).toBeInstanceOf(TypeError);
    expect(thrownError!.message).toMatch(/object/i);
  });
});