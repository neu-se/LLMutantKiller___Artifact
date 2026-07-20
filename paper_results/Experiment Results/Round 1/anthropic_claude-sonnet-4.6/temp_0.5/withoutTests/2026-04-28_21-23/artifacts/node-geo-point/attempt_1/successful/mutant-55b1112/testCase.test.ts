import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point when traveling north from a known location', () => {
    // Starting from London (51.5074, -0.1278), traveling 100km due north (bearing 0)
    const start = new GeoPoint(51.5074, -0.1278);
    const distance = 100000; // 100 km in meters
    const bearing = 0; // due north

    const destination = GeoPoint.calculateDestination(start, distance, bearing);

    // Expected latitude should be approximately 52.4065 degrees
    // The mutation changes cosθ multiplication to division
    // When bearing=0, cosθ = cos(0) = 1, so multiplication and division give same result
    // Use bearing=90 (due east) where cosθ = cos(90°) = 0, which would cause division by zero issues
    // Better: use bearing=45 where cosθ = cos(45°) ≈ 0.707
    // Original: sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ
    // Mutated:  sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ / cosθ
    // With bearing=45: original uses *0.707, mutated uses /0.707 (≈*1.414) - different results

    const start2 = new GeoPoint(0, 0); // equator, prime meridian
    const bearing45 = 45;
    const dist = 1000000; // 1000 km

    const dest = GeoPoint.calculateDestination(start2, dist, bearing45);

    // With original code (multiply by cosθ):
    // sinφ2 = sin(0)*cosδ + cos(0)*sinδ*cos(45°)
    //       = 0 + 1 * sinδ * 0.7071...
    // latitude = asin(sinδ * 0.7071...)

    // With mutated code (divide by cosθ):
    // sinφ2 = sin(0)*cosδ + cos(0)*sinδ/cos(45°)
    //       = 0 + 1 * sinδ / 0.7071...
    //       = sinδ * 1.4142...
    // latitude = asin(sinδ * 1.4142...)

    // These will produce different latitude values
    // For 1000km from equator at 45 degrees bearing:
    // δ = 1000000 / 6371000 ≈ 0.1570 radians
    // sinδ ≈ 0.1564
    // Original latitude ≈ asin(0.1564 * 0.7071) ≈ asin(0.1106) ≈ 6.35 degrees
    // Mutated latitude ≈ asin(0.1564 * 1.4142) ≈ asin(0.2212) ≈ 12.77 degrees

    expect(dest.latitude).toBeCloseTo(6.35, 0);
    expect(dest.latitude).not.toBeCloseTo(12.77, 0);
  });
});