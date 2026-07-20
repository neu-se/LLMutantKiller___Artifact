import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point using multiplication (not division) by cosφ1', () => {
    // Use a point at a known latitude where cos(lat) != 1 to expose the mutation
    // At latitude 60°, cos(60°) = 0.5, so multiplication vs division gives very different results
    const startPoint = new GeoPoint(60, 0);
    const distance = 100000; // 100 km
    const bearing = 90; // due east

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The correct destination should be close to (60, ~1.79) degrees
    // With the mutation (division instead of multiplication), the longitude would be much larger
    // because dividing by cos(60°)=0.5 doubles the value instead of multiplying by 0.5
    
    // Verify latitude is approximately correct (should be close to 60 for eastward travel)
    expect(destination.latitude).toBeCloseTo(60, 0);
    
    // Verify longitude is in a reasonable range for 100km east from (60, 0)
    // Correct value should be approximately 1.79 degrees
    // Mutated value would be approximately 7.16 degrees (4x larger due to dividing instead of multiplying)
    expect(destination.longitude).toBeGreaterThan(1.0);
    expect(destination.longitude).toBeLessThan(3.0);
  });
});