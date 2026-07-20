import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint distance calculation', () => {
  it('should correctly handle floating point precision when r > 1', () => {
    // Create points that will cause r > 1 due to floating point precision
    // The original code handles this with "r > 1 ? 1 : r", while the mutant uses "false ? 1 : r"
    const p1 = new GeoPoint(0, 0);
    const p2 = new GeoPoint(0, 180);

    const distance = GeoPoint.calculateDistance(p1, p2);
    // The correct distance should be approximately half the Earth's circumference
    // With the mutant, this will produce NaN when r > 1
    expect(Number.isNaN(distance)).toBe(false);
    expect(distance).toBeCloseTo(20015086.796, -2);
  });
});