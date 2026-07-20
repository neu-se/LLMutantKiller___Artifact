import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point when moving north from equator', () => {
    // Starting at (0, 0) - equator/prime meridian
    // Moving north (bearing = 0 degrees) by 111,000 meters (~1 degree of latitude)
    const start = new GeoPoint(0, 0);
    const distance = 111000; // approximately 1 degree of latitude in meters
    const bearing = 0; // due north

    const destination = start.calculateDestination(distance, bearing);

    // The destination should be approximately 1 degree north of the starting point
    // With original code: sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ
    // At equator (φ1=0): sinφ2 = 0 * cosδ + 1 * sinδ * cos(0) = sinδ (positive)
    // With mutated code: sinφ2 = sinφ1 * cosδ - cosφ1 * sinδ * cosθ
    // At equator (φ1=0): sinφ2 = 0 * cosδ - 1 * sinδ * cos(0) = -sinδ (negative)
    
    // Original should give positive latitude (north), mutation gives negative (south)
    expect(destination.latitude).toBeGreaterThan(0);
    expect(destination.latitude).toBeCloseTo(1.0, 0);
  });
});