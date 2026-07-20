import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point using multiplication (not division) by cosφ1', () => {
    // Use a point at latitude 60 degrees where cos(60°) = 0.5
    // This makes multiplication vs division clearly distinguishable
    // cos(60°) = 0.5, so multiplying gives half the value, dividing gives double
    const startPoint = new GeoPoint(60, 0);
    const distance = 100000; // 100 km
    const bearing = 90; // due east

    const destination = startPoint.calculateDestination(distance, bearing);

    // The correct destination should be near latitude 60 degrees
    // With the mutation (division instead of multiplication), the result will differ significantly
    // Expected latitude should remain close to 60 degrees for eastward travel
    expect(destination.latitude).toBeCloseTo(60.0, 1);
    
    // The longitude should change for eastward travel
    // With correct formula: y = sinθ * sinδ * cosφ1
    // With mutation: y = sinθ * sinδ / cosφ1
    // At latitude 60°, cos(60°) = 0.5, so mutation doubles y, affecting the longitude calculation
    const expectedLongitude = destination.longitude;
    
    // Verify the longitude is in a reasonable range for 100km east from (60, 0)
    // At latitude 60°, 100km corresponds to roughly 1.8 degrees longitude
    expect(destination.longitude).toBeGreaterThan(0.5);
    expect(destination.longitude).toBeLessThan(5.0);
  });
});