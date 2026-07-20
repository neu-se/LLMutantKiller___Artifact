import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination when traveling east from equator', () => {
    // Use a point where cosδ ≠ 1 significantly, so sinφ1 * cosδ vs sinφ1 / cosδ differs
    // Start at latitude 45 degrees (non-zero sinφ1), travel a large distance
    const start = new GeoPoint(45.0, 0.0);
    const distance = 500000; // 500 km - large enough to make cosδ significantly different from 1
    const bearing = 90; // east

    const destination = GeoPoint.calculateDestination(start, distance, bearing);

    // For bearing=90 (east), cosθ=0, so sinφ2 = sinφ1 * cosδ + 0
    // Original: sinφ2 = sinφ1 * cosδ
    // Mutated:  sinφ2 = sinφ1 / cosδ
    // With distance=500000m, δ = 500000/6371000 ≈ 0.07849 rad
    // cosδ ≈ 0.99692
    // sinφ1 = sin(45°) ≈ 0.70711
    // Original: sinφ2 ≈ 0.70711 * 0.99692 ≈ 0.70494
    // Mutated:  sinφ2 ≈ 0.70711 / 0.99692 ≈ 0.70930
    // latitude difference is observable

    // The latitude should be very close to 45 when traveling east (slight decrease due to spherical geometry)
    // Original gives ~44.87 degrees latitude
    expect(destination.latitude).toBeCloseTo(44.87, 1);
  });
});