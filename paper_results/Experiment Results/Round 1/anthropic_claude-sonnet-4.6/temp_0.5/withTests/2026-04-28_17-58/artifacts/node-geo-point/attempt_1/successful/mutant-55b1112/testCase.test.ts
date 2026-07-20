import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point using multiplication (not division) for cosθ', () => {
    // Use a bearing of 45 degrees (northeast)
    // At bearing 45°, cosθ = cos(45°) ≈ 0.7071
    // The mutation changes `* cosθ` to `/ cosθ`, which would produce a very different sinφ2
    // Original: sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ
    // Mutated:  sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ / cosθ
    
    const startPoint = new GeoPoint(0, 0); // equator, prime meridian
    const distance = 111320; // approximately 1 degree at equator in meters
    const bearing = 45; // northeast
    
    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);
    
    // At bearing 45° from (0,0) traveling ~111km:
    // Expected latitude should be approximately 0.707 degrees north
    // Expected longitude should be approximately 0.707 degrees east
    // The mutation would produce a significantly different latitude
    
    expect(destination.latitude).toBeGreaterThan(0.5);
    expect(destination.latitude).toBeLessThan(1.0);
    expect(destination.longitude).toBeGreaterThan(0.5);
    expect(destination.longitude).toBeLessThan(1.0);
    
    // More precise check: latitude should be approximately 0.707 degrees
    expect(Math.abs(destination.latitude - 0.7071)).toBeLessThan(0.01);
  });
});