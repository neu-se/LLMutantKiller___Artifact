import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination longitude when traveling northeast from high latitude', () => {
    // Use high latitude (60°N) and northeast bearing (45°) with large distance
    // so that sinφ1 and sinφ2 are large and the mutation (/ vs *) causes a big difference
    const startLat = 60.0;
    const startLng = 10.0;
    const distance = 1000000; // 1000 km
    const bearing = 90; // due East

    const start = new GeoPoint(startLat, startLng);
    const destination = start.calculateDestination(distance, bearing);

    // Compute expected values manually using the original formula:
    // δ = 1000000 / 6371000 ≈ 0.15699
    // θ = deg2rad(90) = π/2
    // φ1 = deg2rad(60) ≈ 1.0472
    // sinφ1 = sin(60°) ≈ 0.8660, cosφ1 = cos(60°) = 0.5
    // sinδ ≈ 0.15643, cosδ ≈ 0.98769
    // sinθ = 1, cosθ = 0
    // sinφ2 = sinφ1*cosδ + cosφ1*sinδ*cosθ = 0.8660*0.98769 + 0.5*0.15643*0 = 0.85534
    // φ2 = asin(0.85534) ≈ 1.0168 rad ≈ 58.25°
    // y = sinθ * sinδ * cosφ1 = 1 * 0.15643 * 0.5 = 0.078215
    // x_original = cosδ - sinφ1 * sinφ2 = 0.98769 - 0.8660*0.85534 = 0.98769 - 0.74072 = 0.24697
    // x_mutated  = cosδ - sinφ1 / sinφ2 = 0.98769 - 0.8660/0.85534 = 0.98769 - 1.01245 = -0.02476
    // atan2(y, x_original) = atan2(0.078215, 0.24697) ≈ 0.30628 rad ≈ 17.55°
    // atan2(y, x_mutated)  = atan2(0.078215, -0.02476) ≈ 1.8731 rad ≈ 107.3°
    // longitude_original = (rad2deg(λ1 + 0.30628) + 540) % 360 - 180
    //   λ1 = deg2rad(10) ≈ 0.17453
    //   λ2 = 0.17453 + 0.30628 = 0.48081 rad ≈ 27.55°
    // longitude_mutated ≈ 10 + 107.3 = 117.3° (very different)

    // The longitude should be approximately 27.55° with the original formula
    expect(destination.longitude).toBeCloseTo(27.55, 0);
  });
});