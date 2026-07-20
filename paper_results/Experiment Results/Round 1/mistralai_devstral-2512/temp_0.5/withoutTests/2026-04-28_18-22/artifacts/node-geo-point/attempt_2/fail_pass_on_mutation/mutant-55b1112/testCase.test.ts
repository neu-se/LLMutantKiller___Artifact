import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for bearing of 0 degrees', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 0; // North direction

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // For bearing 0 degrees (north), the calculation should be straightforward
    // and not affected by the division by cosθ (which would be cos(0) = 1 in the mutated version)
    // Expected latitude should be approximately 0.0899 degrees (10km north from equator)
    expect(result.latitude).toBeCloseTo(0.0899, 3);
    expect(result.longitude).toBeCloseTo(0, 3);
  });
});