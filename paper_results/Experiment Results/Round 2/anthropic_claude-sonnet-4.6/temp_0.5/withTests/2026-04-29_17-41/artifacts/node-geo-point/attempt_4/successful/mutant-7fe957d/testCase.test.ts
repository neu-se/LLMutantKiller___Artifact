import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance mutation detection', () => {
  it('should produce correct distance and not NaN when r might exceed 1 due to floating point', () => {
    // Verify that for identical points at various latitudes, distance is always 0 (not NaN)
    // The mutation removes the r > 1 guard, so if any latitude produces r > 1 in floating point,
    // the mutated code returns NaN while original returns 0.
    
    // Find a latitude where cos²(x) + sin²(x) > 1 in IEEE 754 arithmetic
    // by checking many values
    let foundProblematicDistance = false;
    for (let lat = -90; lat <= 90; lat += 1) {
      const p = new GeoPoint(lat, 45.0);
      const dist = GeoPoint.calculateDistance(p, p);
      if (isNaN(dist)) {
        foundProblematicDistance = true;
      }
    }
    
    // Original: never NaN (clamped). Mutated: may be NaN for some latitudes.
    expect(foundProblematicDistance).toBe(false);
    
    // Also verify a specific case known to be problematic: lat=51.5
    const p1 = new GeoPoint(51.5, -0.15);
    const distance = GeoPoint.calculateDistance(p1, p1);
    expect(isNaN(distance)).toBe(false);
  });
});