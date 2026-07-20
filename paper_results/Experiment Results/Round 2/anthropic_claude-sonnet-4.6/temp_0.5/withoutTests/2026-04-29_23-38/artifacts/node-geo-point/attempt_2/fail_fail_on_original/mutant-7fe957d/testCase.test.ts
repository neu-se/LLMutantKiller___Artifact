import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.calculateDistance', () => {
  it('should return 0 distance when two identical points are compared, even when floating point causes r slightly above 1', () => {
    // The mutation changes: acos(r > 1 ? 1 : r) to acos(false ? 1 : r)
    // This means when r > 1 (due to floating point rounding), the original clamps to 1 (acos(1)=0)
    // but the mutant passes r directly to acos, which returns NaN for r > 1
    
    // Points at latitude 0, longitude 0 - same point
    // cos(0)*cos(0)*cos(0) + sin(0)*sin(0) = 1*1*1 + 0*0 = 1 exactly
    // But at other latitudes, floating point can push r slightly above 1
    
    // Use a latitude where floating point arithmetic causes r > 1
    // At lat=45, lon=45: cos²(45°) + sin²(45°) = 0.5 + 0.5 = 1 exactly in theory
    // but floating point may differ
    
    // Try many same-point calculations to find one where r > 1
    const testLatitudes = [30, 45, 60, 75, 80, 85, 89];
    const testLongitudes = [30, 45, 60, 90, 120, 150, 170];
    
    for (const lat of testLatitudes) {
      for (const lng of testLongitudes) {
        const p = new GeoPoint(lat, lng);
        const dist = GeoPoint.calculateDistance(p, p);
        // Original: clamps r to 1 if r > 1, so acos(1) = 0, distance = 0
        // Mutant: passes r directly, if r > 1 then acos(r) = NaN
        expect(isNaN(dist)).toBe(false);
        expect(dist).toBe(0);
      }
    }
  });
});