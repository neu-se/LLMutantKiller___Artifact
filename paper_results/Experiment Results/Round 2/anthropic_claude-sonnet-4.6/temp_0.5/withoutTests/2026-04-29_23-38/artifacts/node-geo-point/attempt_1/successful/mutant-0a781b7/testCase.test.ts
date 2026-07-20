import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point when moving north from equator', () => {
    // Starting at the equator (0, 0), moving north (bearing = 0) by 1000 km
    const start = new GeoPoint(0, 0);
    const distance = 1000000; // 1000 km in meters
    const bearing = 0; // due north

    const destination = GeoPoint.calculateDestination(start, distance, bearing);

    // Moving north from equator, latitude should increase significantly
    // With original code: sinφ2 = sin(0)*cos(δ) + cos(0)*sin(δ)*cos(0) = 0 + sin(δ) ≈ positive
    // With mutated code: sinφ2 = sin(0)*cos(δ) - cos(0)*sin(δ)*cos(0) = 0 - sin(δ) ≈ negative
    // So latitude should be positive with original, negative with mutant
    expect(destination.latitude).toBeGreaterThan(0);
  });
});