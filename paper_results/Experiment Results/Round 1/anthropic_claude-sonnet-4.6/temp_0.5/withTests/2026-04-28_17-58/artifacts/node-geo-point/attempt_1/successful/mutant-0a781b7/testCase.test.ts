import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point when traveling north from equator', () => {
    // Starting at the equator (latitude=0, longitude=0), traveling north (bearing=0)
    // for 1000km should result in a point significantly north of the equator
    const origin = new GeoPoint(0, 0);
    const distance = 1000000; // 1000 km in meters
    const bearing = 0; // due north

    const destination = origin.calculateDestination(distance, bearing);

    // When traveling due north from equator for 1000km:
    // The mutation changes: sinφ1 * cosδ + cosφ1 * sinδ * cosθ
    //                   to: sinφ1 * cosδ - cosφ1 * sinδ * cosθ
    // At equator (φ1=0): sinφ1=0, cosφ1=1, bearing=0 so cosθ=1
    // Original: 0 * cosδ + 1 * sinδ * 1 = sinδ (positive, heading north)
    // Mutated:  0 * cosδ - 1 * sinδ * 1 = -sinδ (negative, heading south!)
    
    // The destination latitude should be approximately 8.99 degrees north
    expect(destination.latitude).toBeGreaterThan(0);
    expect(destination.latitude).toBeCloseTo(8.993, 1);
  });
});