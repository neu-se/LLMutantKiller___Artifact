import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should return a finite numeric distance (not NaN) when calculating distance between two identical points', () => {
    // For identical points, the floating-point computation of r can exceed 1 slightly,
    // causing acos(r) to return NaN without the r > 1 clamping guard.
    // The mutation replaces `r > 1 ? 1 : r` with `false ? 1 : r`, removing the clamp.
    const p1 = new GeoPoint(45.0, 90.0);
    const p2 = new GeoPoint(45.0, 90.0);

    const distance = GeoPoint.calculateDistance(p1, p2);

    // Original code clamps r to 1, giving acos(1) = 0, so distance = 0
    // Mutated code skips the clamp, r may exceed 1, giving acos(r) = NaN
    expect(isNaN(distance)).toBe(false);
    expect(distance).toBe(0);
  });
});