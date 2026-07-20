import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with correct message when coordinates property is missing but type is present', () => {
    // Original code uses ||: throws if EITHER property is missing
    // Mutated code uses &&: only throws if BOTH properties are missing
    // When only 'coordinates' is missing, original throws the "must have type and coordinates" error
    // but mutated code skips that check and proceeds to throw a different error about coordinates array
    // We can detect this by checking the error message
    const invalidPoint = { type: 'Point' } as any;

    let thrownError: Error | null = null;
    try {
      GeoPoint.fromGeoJSON(invalidPoint);
    } catch (e) {
      thrownError = e as Error;
    }

    expect(thrownError).not.toBeNull();
    // The original code throws at the hasOwnProperty check with a message about type and coordinates
    // The mutated code skips that check and throws later about coordinates being an array
    // Both throw but with different messages - we verify the original message pattern
    expect(thrownError!.message).not.toContain('coordinates must be an array');
  });
});