import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point when traveling east', () => {
    // Starting at the equator (0, 0), traveling east (bearing = 90 degrees)
    // for 111320 meters (approximately 1 degree of longitude at the equator)
    const startPoint = new GeoPoint(0, 0);
    const distance = 111320; // ~1 degree of longitude at equator in meters
    const bearing = 90; // due east

    const destination = startPoint.calculateDestination(distance, bearing);

    // When traveling east from (0, 0), we should arrive at approximately (0, 1)
    // The longitude should be positive (east)
    // With the mutation (λ2 = λ1 - atan2(y, x)), the longitude would be negative (west)
    expect(destination.longitude).toBeGreaterThan(0);
    expect(Math.abs(destination.longitude - 1)).toBeLessThan(0.1);
    expect(Math.abs(destination.latitude)).toBeLessThan(0.01);
  });
});