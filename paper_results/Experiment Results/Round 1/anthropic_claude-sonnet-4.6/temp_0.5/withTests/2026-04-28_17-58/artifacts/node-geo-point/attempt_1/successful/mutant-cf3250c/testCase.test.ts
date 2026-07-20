import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point when moving east', () => {
    // Starting at the equator, moving east (bearing 90°) by 111320 meters
    // should result in approximately 1 degree of longitude change
    const startPoint = new GeoPoint(0, 0);
    const distance = 111320; // approximately 1 degree of longitude at equator
    const bearing = 90; // due east

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The destination should be approximately at longitude 1, latitude 0
    // With the mutation (λ2 = λ1 - atan2(y, x)), the longitude would be negative (~-1)
    expect(destination.latitude).toBeCloseTo(0, 1);
    expect(destination.longitude).toBeGreaterThan(0);
    expect(destination.longitude).toBeCloseTo(1, 0);
  });
});