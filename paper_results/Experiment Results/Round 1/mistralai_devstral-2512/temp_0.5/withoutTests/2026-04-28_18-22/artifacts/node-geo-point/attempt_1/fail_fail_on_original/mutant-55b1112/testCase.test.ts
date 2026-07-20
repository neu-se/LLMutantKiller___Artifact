import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 45; // Northeast direction

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Expected result calculated using the correct formula
    // sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ
    // For latitude 0, longitude 0, distance 10000m, bearing 45°
    // Expected latitude should be approximately 0.0707 (degrees)
    // Expected longitude should be approximately 0.0707 (degrees)
    expect(result.latitude).toBeCloseTo(0.0707, 4);
    expect(result.longitude).toBeCloseTo(0.0707, 4);
  });
});