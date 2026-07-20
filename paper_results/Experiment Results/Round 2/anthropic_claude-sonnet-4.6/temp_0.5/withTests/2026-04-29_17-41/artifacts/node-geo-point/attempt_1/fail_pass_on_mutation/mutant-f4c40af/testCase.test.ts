import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination mutation detection', () => {
  it('should calculate the correct destination point using sinφ1 * cosδ (not sinφ1 / cosδ)', () => {
    // Using a known reference point and distance/bearing
    // Starting from (51, 0), moving 100km north (bearing 0)
    const startPoint = new GeoPoint(51, 0);
    const distance = 100000; // 100km in meters
    const bearing = 0; // north

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The destination latitude should be approximately 51.899 degrees
    // With the mutation (sinφ1 / cosδ instead of sinφ1 * cosδ), the result will be different
    // Expected latitude ~51.899 degrees north
    expect(destination.latitude).toBeCloseTo(51.899, 1);
    expect(destination.longitude).toBeCloseTo(0, 5);
  });
});