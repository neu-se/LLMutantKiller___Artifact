import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint distance calculation', () => {
  it('should correctly handle floating point precision edge case where r > 1', () => {
    // These specific coordinates create a scenario where r > 1 due to floating point precision
    // The original code handles this with "r > 1 ? 1 : r", while the mutant uses "false ? 1 : r"
    const p1 = new GeoPoint(0, 0);
    const p2 = new GeoPoint(0, 0.000001);

    const distance = GeoPoint.calculateDistance(p1, p2);
    // With the original code, this should be a very small positive number
    // With the mutant code (false ? 1 : r), this will produce NaN when r > 1
    expect(Number.isNaN(distance)).toBe(false);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(1);
  });
});