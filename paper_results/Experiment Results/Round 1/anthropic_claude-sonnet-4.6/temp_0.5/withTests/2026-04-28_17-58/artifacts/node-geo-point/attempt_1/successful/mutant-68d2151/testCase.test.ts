import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point using multiplication (not division) for cosφ1', () => {
    // Using a point at a non-trivial latitude where cos(φ1) != 1
    // The mutation changes `cosφ1 * sinδ * sinθ` to `sinδ * sinθ / cosφ1`
    // These produce different results when cosφ1 != 1 (i.e., latitude != 0)
    
    const startPoint = new GeoPoint(51.5, 0); // London-ish latitude
    const distance = 100000; // 100 km
    const bearing = 90; // Due East

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The correct destination going east from (51.5, 0) for 100km
    // should be approximately (51.5, ~1.43)
    // With the mutation (division instead of multiplication), the result will differ
    
    expect(destination.latitude).toBeCloseTo(51.5, 0);
    expect(destination.longitude).toBeCloseTo(1.43, 1);
  });
});