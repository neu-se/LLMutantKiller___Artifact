import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point given a starting point, distance, and bearing', () => {
    const startPoint = new GeoPoint(51.0, 0.0);
    const distance = 100000; // 100 km
    const bearing = 0; // due north

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The destination should be approximately 0.899 degrees north of the start
    // With the mutation (sinφ1 / cosδ instead of sinφ1 * cosδ), the result will be incorrect
    expect(destination.latitude).toBeCloseTo(51.8988, 2);
    expect(destination.longitude).toBeCloseTo(0.0, 2);
  });
});