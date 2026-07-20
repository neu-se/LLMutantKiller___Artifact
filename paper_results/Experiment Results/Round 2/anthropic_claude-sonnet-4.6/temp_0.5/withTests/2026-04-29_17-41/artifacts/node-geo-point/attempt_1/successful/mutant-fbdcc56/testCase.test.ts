import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point given a start point, distance, and bearing', () => {
    // Use a known start point and calculate destination
    // The mutation changes: const x = cosδ - sinφ1 * sinφ2
    //                   to: const x = cosδ - sinφ1 / sinφ2
    // This affects the longitude calculation of the destination point
    
    const startPoint = new GeoPoint(51.5, -0.15);
    const distance = 100000; // 100 km
    const bearing = 90; // due east
    
    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);
    
    // The destination should be roughly at the same latitude, but further east
    // For 100km east from (51.5, -0.15), longitude should be approximately 1.3 degrees
    expect(destination.latitude).toBeCloseTo(51.5, 0);
    expect(destination.longitude).toBeCloseTo(1.3, 0);
    
    // More precise check that will fail with the mutation
    // Original formula: x = cosδ - sinφ1 * sinφ2
    // Mutated formula: x = cosδ - sinφ1 / sinφ2
    // These produce different atan2 results, hence different longitudes
    expect(destination.longitude).toBeGreaterThan(1.0);
    expect(destination.longitude).toBeLessThan(1.6);
    
    // Verify with a precise expected value computed from the correct formula
    // For bearing=90 (east), the longitude change should follow the haversine formula
    const expectedLongitude = 1.3126; // approximate expected value
    expect(Math.abs(destination.longitude - expectedLongitude)).toBeLessThan(0.05);
  });
});