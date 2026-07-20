import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination longitude using multiplication not division in bearing formula', () => {
    // Manually compute the expected result using the ORIGINAL formula
    // Start: lat=30°, lng=0°, bearing=45°, distance=500000m
    const deg2rad = (d: number) => d * Math.PI / 180;
    const rad2deg = (r: number) => r * 180 / Math.PI;
    const radius = 6371e3;

    const lat = 30.0;
    const lng = 0.0;
    const distance = 500000;
    const bearing = 45;

    const δ = distance / radius;
    const θ = deg2rad(bearing);
    const φ1 = deg2rad(lat);
    const λ1 = deg2rad(lng);

    const sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1);
    const sinδ = Math.sin(δ), cosδ = Math.cos(δ);
    const sinθ = Math.sin(θ), cosθ = Math.cos(θ);

    const sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ;
    const φ2 = Math.asin(sinφ2);
    const y = sinθ * sinδ * cosφ1;
    // ORIGINAL formula: multiplication
    const x_original = cosδ - sinφ1 * sinφ2;
    // MUTATED formula: division
    const x_mutated = cosδ - sinφ1 / sinφ2;

    const λ2_original = λ1 + Math.atan2(y, x_original);
    const λ2_mutated = λ1 + Math.atan2(y, x_mutated);

    const expectedLongitude = (rad2deg(λ2_original) + 540) % 360 - 180;
    const mutatedLongitude = (rad2deg(λ2_mutated) + 540) % 360 - 180;

    // Verify the two formulas actually give different results for this input
    expect(Math.abs(expectedLongitude - mutatedLongitude)).toBeGreaterThan(0.1);

    // Now test the actual implementation
    const startPoint = new GeoPoint(lat, lng);
    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Should match original formula result
    expect(destination.longitude).toBeCloseTo(expectedLongitude, 3);
  });
});