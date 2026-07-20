import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination mutation detection', () => {
  it('should calculate the correct destination using multiplication (not division) for sinφ1 * cosδ term', () => {
    // Use a very large distance so cosδ differs significantly from 1
    // This makes sinφ1 * cosδ != sinφ1 / cosδ
    // Angular distance δ = distance / radius = 5000000 / 6371000 ≈ 0.785 radians
    // cos(0.785) ≈ 0.707, so sinφ1 * 0.707 vs sinφ1 / 0.707 are very different
    const startPoint = new GeoPoint(45, 0);
    const distance = 5000000; // 5000km - large enough to make cosδ meaningfully < 1
    const bearing = 0; // due north

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // For bearing=0 (north), the destination should be at longitude 0
    // and latitude approximately 45 + (5000/111) ≈ 90 degrees (near the pole)
    // Original formula gives approximately 89.97 degrees latitude
    // Mutated formula gives a very different (likely invalid) result
    expect(destination.longitude).toBeCloseTo(0, 3);
    // The latitude with correct formula should be close to 89.97
    // With mutation it would be much larger (out of valid range or NaN)
    expect(destination.latitude).toBeGreaterThan(85);
    expect(destination.latitude).toBeLessThanOrEqual(90);
  });
});