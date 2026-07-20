import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination mutation detection', () => {
  it('should calculate the correct destination longitude when starting from a non-equatorial point', () => {
    // Start at (51, 0), travel east (bearing=90) for 100km
    // sinφ1 is significant here, and sinφ2 ≈ sinφ1 (small latitude change)
    // Original: x = cosδ - sinφ1 * sinφ2
    // Mutated:  x = cosδ - sinφ1 / sinφ2
    // These differ because sinφ1 * sinφ2 ≠ sinφ1 / sinφ2 when sinφ2 ≠ 1
    const startPoint = new GeoPoint(51, 0);
    const distance = 100000; // 100 km
    const bearing = 90; // due east

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Due east at lat 51: latitude stays ~51, longitude increases
    // 100km at lat 51 ≈ 100000 / (111320 * cos(51°)) ≈ 1.435 degrees
    expect(destination.latitude).toBeCloseTo(51, 1);
    expect(destination.longitude).toBeCloseTo(1.435, 1);
  });
});