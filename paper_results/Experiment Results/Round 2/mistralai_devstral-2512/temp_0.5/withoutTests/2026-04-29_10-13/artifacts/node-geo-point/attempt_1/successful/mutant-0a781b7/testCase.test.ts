import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point for a given bearing and distance', () => {
    const startPoint = new GeoPoint(0, 0); // Equator at prime meridian
    const distance = 1000000; // 1000 km
    const bearing = 0; // North

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result should be north of the equator
    // The mutation would cause the destination to be south instead
    expect(destination.latitude).toBeGreaterThan(0);
    expect(destination.longitude).toBeCloseTo(0, 5);
  });
});