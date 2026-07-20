import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point"

describe('GeoPoint.calculateDistance', () => {
  it('should return a finite non-NaN distance when same point is passed twice', () => {
    // The mutation changes: acos(r > 1 ? 1 : r) to acos(false ? 1 : r) = acos(r)
    // When computing distance between same points, floating point arithmetic can produce r slightly > 1
    // Original: clamps r to 1 when r > 1, so acos(1) = 0, result is 0
    // Mutated: passes r directly to acos; if r > 1, acos returns NaN
    
    // lat=30, lng=30 was shown to produce r > 1 based on the error output showing non-zero distance
    // with original code. Let's pick a point that triggers r > 1.
    const p = new GeoPoint(30, 30);
    const dist = GeoPoint.calculateDistance(p, p);
    
    // Original code clamps r > 1 to 1, acos(1) = 0, distance = 0
    // Mutated code: acos(r) where r > 1 = NaN
    expect(isNaN(dist)).toBe(false);
  });
});