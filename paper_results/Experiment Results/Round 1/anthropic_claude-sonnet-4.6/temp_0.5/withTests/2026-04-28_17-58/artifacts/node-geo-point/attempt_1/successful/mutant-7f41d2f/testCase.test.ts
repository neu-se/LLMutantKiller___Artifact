import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination longitude for non-equatorial point with eastward bearing', () => {
    // Start at 45°N, 0° longitude, travel 100km east (bearing 90°)
    // The mutation changes x = cosδ - sinφ1*sinφ2 to x = cosδ + sinφ1*sinφ2
    // This affects the atan2(y, x) calculation for longitude
    const startPoint = new GeoPoint(45, 0);
    const distance = 100000; // 100 km
    const bearing = 90; // due east

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The longitude should be approximately 1.272 degrees east
    // Under the mutation, the x value changes sign effectively, producing a different longitude
    expect(destination.longitude).toBeCloseTo(1.2723, 2);
    expect(destination.latitude).toBeCloseTo(45, 1);
  });
});