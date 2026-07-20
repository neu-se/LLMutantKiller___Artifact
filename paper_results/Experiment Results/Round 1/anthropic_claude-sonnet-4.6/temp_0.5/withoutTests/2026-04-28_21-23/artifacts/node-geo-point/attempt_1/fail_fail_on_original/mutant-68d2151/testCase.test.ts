import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point using cosφ1 multiplication not division', () => {
    // Use a point at latitude 60 degrees where cos(60°) = 0.5
    // This makes multiplication vs division clearly distinguishable
    // cos(60°) = 0.5, so multiplying by 0.5 vs dividing by 0.5 gives very different results
    const startLat = 60;
    const startLng = 0;
    const distance = 100000; // 100 km
    const bearing = 90; // due east

    const start = new GeoPoint(startLat, startLng);
    const result = start.calculateDestination(distance, bearing);

    // The expected result when traveling 100km east from (60°N, 0°)
    // With correct formula (multiply by cosφ1), the latitude should remain approximately 60°
    // With mutated formula (divide by cosφ1), the result would be significantly different
    
    // Verify latitude stays close to 60 degrees (within reasonable tolerance)
    expect(result.latitude).toBeCloseTo(60, 1);
    
    // Verify longitude increases (moving east)
    expect(result.longitude).toBeGreaterThan(0);
    
    // The longitude change should be approximately 0.898 degrees for 100km at 60° latitude
    // With mutation (dividing by cos(60°)=0.5 instead of multiplying), 
    // the longitude would be drastically different
    expect(result.longitude).toBeCloseTo(0.898, 1);
  });
});