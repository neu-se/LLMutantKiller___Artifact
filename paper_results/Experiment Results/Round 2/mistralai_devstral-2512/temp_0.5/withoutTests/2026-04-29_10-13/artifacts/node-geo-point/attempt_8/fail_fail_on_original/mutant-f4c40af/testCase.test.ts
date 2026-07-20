import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given distance and bearing', () => {
    const startPoint = new GeoPoint(89.9, 0); // Near North Pole
    const distance = 1000; // 1km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes sinφ1 * cosδ to sinφ1 / cosδ which will produce significantly different results
    // near the poles where sinφ1 is close to 1 and cosδ is close to 1
    // The correct latitude should be very close to 90 degrees
    expect(result.latitude).toBeCloseTo(89.999, 3);
    expect(result.longitude).toBeCloseTo(0, 3);
  });
});