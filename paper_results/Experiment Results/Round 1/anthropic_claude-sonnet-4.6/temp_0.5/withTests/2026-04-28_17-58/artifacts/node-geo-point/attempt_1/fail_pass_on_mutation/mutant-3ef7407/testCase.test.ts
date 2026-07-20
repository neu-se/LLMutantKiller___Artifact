import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when point has type but no coordinates property', () => {
    // The mutation changes || to && in the condition:
    // Original: if (!point.hasOwnProperty('type') || !point.hasOwnProperty('coordinates'))
    // Mutated:  if (!point.hasOwnProperty('type') && !point.hasOwnProperty('coordinates'))
    //
    // With the original code (||), having 'type' but missing 'coordinates' should throw.
    // With the mutated code (&&), both must be missing to throw, so having 'type' but
    // missing 'coordinates' would NOT throw at this check (it would proceed and fail later
    // or behave differently).
    //
    // We pass an object with 'type' but without 'coordinates' to trigger the difference.
    const invalidPoint = { type: 'Point' } as any;

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint);
    }).toThrow(TypeError);
  });
});