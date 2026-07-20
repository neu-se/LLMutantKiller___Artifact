import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point"

describe('GeoPoint.calculateDistance', () => {
  it('should return a finite distance (not NaN) for identical high-latitude points where floating point causes r > 1', () => {
    // The mutation: acos(r > 1 ? 1 : r) -> acos(false ? 1 : r) = acos(r)
    // For identical points at certain latitudes, floating point makes r slightly > 1
    // Original: clamps r to 1, acos(1) = 0, finite result
    // Mutated: acos(r) where r > 1 = NaN
    
    // Test many high-latitude same-point pairs to find one where r > 1
    let foundNaN = false;
    for (let lat = 1; lat <= 89; lat++) {
      for (let lng = -179; lng <= 179; lng += 10) {
        const p = new GeoPoint(lat, lng);
        const dist = GeoPoint.calculateDistance(p, p);
        if (isNaN(dist)) {
          foundNaN = true;
        }
      }
    }
    
    // On original code: never NaN (clamping prevents it)
    // On mutated code: at least one NaN when r > 1
    expect(foundNaN).toBe(false);
  });
});