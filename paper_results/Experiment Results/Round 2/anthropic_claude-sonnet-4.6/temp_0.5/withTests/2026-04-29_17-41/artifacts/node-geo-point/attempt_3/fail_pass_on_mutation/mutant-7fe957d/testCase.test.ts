import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance mutation detection', () => {
  it('should return 0 distance for same point where floating point causes r > 1', () => {
    // At latitude 0 (equator) with same longitude, the formula computes:
    // r = cos(0)*cos(0)*cos(0) + sin(0)*sin(0) = 1*1*1 + 0 = 1 exactly
    // But at certain latitudes, floating point can push r slightly above 1.
    // We can verify by checking many latitudes and ensuring none return NaN.
    
    // latitude=90 is a known case: sin(90°)=1, cos(90°)≈6.12e-17 (not exactly 0)
    // r = cos(lat1)*cos(lat2)*cos(0) + sin(lat1)*sin(lat2)
    //   = (6.12e-17)^2 * 1 + 1^2 = ~0 + 1 = 1 (possibly slightly > 1 due to sin(90°) in radians)
    const p1 = new GeoPoint(90, 0);
    const p2 = new GeoPoint(90, 0);

    const distance = GeoPoint.calculateDistance(p1, p2);

    expect(typeof distance).toBe('number');
    expect(isNaN(distance)).toBe(false);
    expect(distance).toBeCloseTo(0, 5);
  });
});