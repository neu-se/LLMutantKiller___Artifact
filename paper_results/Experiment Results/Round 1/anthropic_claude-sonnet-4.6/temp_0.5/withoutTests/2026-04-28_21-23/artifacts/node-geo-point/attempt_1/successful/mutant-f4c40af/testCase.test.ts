import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point given a starting point, distance, and bearing', () => {
    // Starting from London (51.5074, -0.1278), moving 1000km north (bearing 0 degrees)
    const start = new GeoPoint(51.5074, -0.1278);
    const destination = GeoPoint.calculateDestination(start, 1000000, 0);

    // The resulting latitude should be approximately 60.5 degrees
    // With the mutation (sinφ1 / cosδ instead of sinφ1 * cosδ), the result will be significantly different
    expect(destination.latitude).toBeCloseTo(60.5, 0);
    expect(destination.longitude).toBeCloseTo(-0.1278, 1);
  });
});