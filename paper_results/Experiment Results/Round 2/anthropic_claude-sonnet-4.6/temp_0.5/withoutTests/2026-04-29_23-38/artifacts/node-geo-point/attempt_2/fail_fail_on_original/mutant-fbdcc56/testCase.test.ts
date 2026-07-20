import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination longitude when traveling northeast from a mid-latitude point', () => {
    // Use a point at significant latitude so sinφ1 and sinφ2 are non-trivial
    // and bearing of 45 degrees (northeast) so y is non-zero and x matters
    const startPoint = new GeoPoint(45.0, 0.0);
    const distance = 500000; // 500km
    const bearing = 90; // due east - maximizes the difference between * and /

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // For due east travel from 45°N, latitude should stay ~45°N
    // longitude should increase by approximately 500000 / (6371000 * cos(45°)) * (180/π) ≈ 6.37°
    expect(destination.latitude).toBeCloseTo(45.0, 1);
    expect(destination.longitude).toBeCloseTo(6.37, 1);
  });
});