import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point when traveling north from a high latitude', () => {
    // Use latitude 60 degrees where cos(60°) = 0.5
    // The mutation changes cosφ1 from multiplication to division in the φ2 calculation
    // sinφ2 = sinφ1*cosδ + cosφ1*sinδ*cosθ
    // φ2 = asin(sinφ2)
    // Then y = sinθ * sinδ * cosφ1 (original) vs y = sinθ * sinδ / cosφ1 (mutated)
    // When bearing = 0 (due north), sinθ = 0, so y = 0 regardless - need non-zero bearing
    // When bearing = 90 (due east), sinθ = 1, cosθ = 0
    // sinφ2 = sinφ1*cosδ + cosφ1*sinδ*0 = sinφ1*cosδ
    // y = 1 * sinδ * cosφ1 (original) vs y = 1 * sinδ / cosφ1 (mutated)
    // At lat=60, cos(60°)=0.5, so original y = sinδ*0.5, mutated y = sinδ/0.5 = sinδ*2
    // This gives very different longitude results

    const start = new GeoPoint(60, 0);
    const distance = 50000; // 50 km
    const bearing = 90; // due east

    const result = start.calculateDestination(distance, bearing);

    // For original code: traveling east from (60°N, 0°)
    // The latitude should stay near 60° and longitude should increase moderately
    // For mutated code: y is multiplied by 4x (dividing by 0.5 instead of multiplying),
    // so longitude would be ~4x larger

    // Verify latitude stays close to 60 degrees
    expect(result.latitude).toBeCloseTo(60, 0);

    // The longitude should be approximately 0.449 degrees for 50km east at 60° latitude
    // With mutation, it would be approximately 1.796 degrees (4x larger)
    // So checking it's less than 1 degree distinguishes the two cases
    expect(result.longitude).toBeGreaterThan(0.3);
    expect(result.longitude).toBeLessThan(1.0);
  });
});