import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when point has coordinates but no type property', () => {
    // The mutation changes || to && in the condition:
    // Original: if (!point.hasOwnProperty('type') || !point.hasOwnProperty('coordinates'))
    // Mutated:  if (!point.hasOwnProperty('type') && !point.hasOwnProperty('coordinates'))
    //
    // With the original code (||), an object missing EITHER 'type' OR 'coordinates' throws.
    // With the mutated code (&&), an object must be missing BOTH to throw.
    //
    // This test passes an object with 'coordinates' but no 'type'.
    // Original: !hasOwnProperty('type') = true, so condition is true => throws TypeError
    // Mutated:  !hasOwnProperty('type') = true, !hasOwnProperty('coordinates') = false,
    //           true && false = false => does NOT throw, proceeds to next check which
    //           throws "The value of type should be 'Point'" instead of the expected error.
    //
    // We verify the specific error message to distinguish the two cases.
    expect(() => {
      GeoPoint.fromGeoJSON({ coordinates: [-0.15, 51.5] } as any);
    }).toThrow('Object must have type and coordinates');
  });
});