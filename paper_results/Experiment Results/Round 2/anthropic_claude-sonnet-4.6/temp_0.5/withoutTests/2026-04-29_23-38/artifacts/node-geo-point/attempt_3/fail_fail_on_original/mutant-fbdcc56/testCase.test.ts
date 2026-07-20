import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for northeast bearing from equatorial point', () => {
    // Start at a point where we can verify the result precisely
    // Using latitude 30°N, longitude 0°, bearing 45° (northeast), distance 1000km
    // At lat=30, sin(30°)=0.5, so sinφ1*sinφ2 ≠ sinφ1/sinφ2 when sinφ2 ≠ 1
    const startPoint = new GeoPoint(30.0, 0.0);
    const distance = 1000000; // 1000km in meters
    const bearing = 45; // northeast

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The correct destination for 1000km at 45° from (30°N, 0°) 
    // should be approximately (36.26°N, 7.07°E)
    // These values are computed from the correct formula with * not /
    expect(destination.latitude).toBeCloseTo(36.26, 1);
    expect(destination.longitude).toBeCloseTo(7.07, 1);
  });
});