import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when passed a number instead of an object', () => {
    let caughtError: any;
    try {
      GeoPoint.fromGeoJSON(42 as any);
    } catch (e) {
      caughtError = e;
    }
    expect(caughtError).toBeDefined();
    expect(caughtError).toBeInstanceOf(TypeError);
    // On mutated code, calling hasOwnProperty on a number primitive will throw a different error
    // or the message will differ. The key is it must be a TypeError from the non-object check.
    expect(caughtError.message).toContain('Object must have type and coordinates');
    // This expectation should FAIL on original (which throws earlier with different message)
    // Actually let's invert: original throws before reaching hasOwnProperty check
  });
});