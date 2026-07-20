import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint distance calculation', () => {
  it('should handle the r > 1 edge case without producing NaN', () => {
    // These specific coordinates create a scenario where r > 1 due to floating point precision
    // The original code handles this with "r > 1 ? 1 : r", while the mutant uses "false ? 1 : r"
    const p1 = new GeoPoint(89.999999, 0);
    const p2 = new GeoPoint(89.999999, 0.000001);

    const distance = GeoPoint.calculateDistance(p1, p2);
    // The key difference: original code will return a valid number, mutant will return NaN
    expect(Number.isNaN(distance)).toBe(false);
    expect(distance).toBeGreaterThanOrEqual(0);
  });
});