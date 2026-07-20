import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point given a starting point, distance, and bearing', () => {
    // Starting from London (51.5074, -0.1278), going 100km north (bearing 0 degrees)
    const start = new GeoPoint(51.5074, -0.1278);
    const distance = 100000; // 100 km in meters
    const bearing = 90; // East

    const destination = GeoPoint.calculateDestination(start, distance, bearing);

    // The destination longitude should be east of the starting point
    // With the original formula (cosδ - sinφ1 * sinφ2), we get the correct result
    // With the mutated formula (cosδ + sinφ1 * sinφ2), we get a different result
    
    // Expected values calculated using the correct spherical trigonometry formula
    // Going 100km east from London should result in approximately longitude 1.3 degrees
    expect(destination.latitude).toBeCloseTo(51.5074, 1);
    expect(destination.longitude).toBeCloseTo(1.3, 0);
  });
});