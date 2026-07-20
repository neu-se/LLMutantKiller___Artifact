import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point when traveling north from a known location', () => {
    // Starting from London (51.5074° N, 0.1278° W), traveling 1000km due north (bearing = 0°)
    const start = new GeoPoint(51.5074, -0.1278);
    const distance = 1000000; // 1000 km in meters
    const bearing = 0; // due north

    const destination = start.calculateDestination(distance, bearing);

    // The destination should be approximately 60.5° N (roughly near Tromsø, Norway)
    // With the original formula: sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ
    // With bearing = 0°, cosθ = 1, so sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ
    // With the mutated formula: sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ / cosθ
    // With bearing = 0°, cosθ = 1, so sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ (same result for bearing=0)
    
    // Use bearing = 45° to expose the difference
    const bearing45 = 45;
    const destination45 = start.calculateDestination(distance, bearing45);

    // For bearing = 45°, cosθ = cos(45°) ≈ 0.7071
    // Original: sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * 0.7071
    // Mutated:  sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ / 0.7071
    // These will give different results

    // The latitude should be approximately 57.6° N for bearing=45° from London, 1000km
    expect(destination45.latitude).toBeCloseTo(57.6, 0);
    expect(destination45.latitude).toBeGreaterThan(51.5); // should be north of London
    expect(destination45.latitude).toBeLessThan(70); // but not too far north
  });
});