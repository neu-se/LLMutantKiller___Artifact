import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination longitude when traveling east from a high latitude', () => {
    // Starting from a high latitude point (60 degrees N) traveling east (bearing 90 degrees)
    // At high latitudes, sinφ1 and sinφ2 are large, making the difference between
    // multiplication and division significant
    const startLat = 60.0;
    const startLng = 0.0;
    const distance = 500000; // 500 km in meters
    const bearing = 90; // East

    const start = new GeoPoint(startLat, startLng);
    const destination = start.calculateDestination(distance, bearing);

    // When traveling due east at 60°N, latitude should remain approximately the same
    // and longitude should increase by roughly 9 degrees (500km at 60°N)
    // The exact value computed from the correct formula:
    // sinφ2 ≈ sin(60°) (since bearing=90, cosθ=0)
    // φ2 = asin(sin(60°)*cos(δ)) ≈ slightly less than 60°
    // x = cosδ - sinφ1 * sinφ2 (original)
    // vs x = cosδ - sinφ1 / sinφ2 (mutated) - very different when sinφ is ~0.866
    expect(destination.longitude).toBeCloseTo(9.0, 0);
    expect(destination.latitude).toBeCloseTo(57.7, 0);
  });
});