import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError about argument not being an object when passed undefined', () => {
    let thrownError: Error | undefined;
    try {
      GeoPoint.fromGeoJSON(undefined as any);
    } catch (e) {
      thrownError = e as Error;
    }
    expect(thrownError).toBeInstanceOf(TypeError);
    // The original throws a specific message about the argument being an object
    // The mutated code skips this check and hits a different error (cannot read properties of undefined)
    expect(thrownError!.message).not.toMatch(/cannot read/i);
    expect(thrownError!.message).not.toMatch(/undefined/i);
  });
});