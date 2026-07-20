import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 51.5074, longitude: -0.1278 }; // London coordinates
    const distance = 10000; // 10 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // Expected result calculated using the original formula
    // For London coordinates moving 10km east, we expect:
    // latitude to remain approximately the same
    // longitude to increase by about 0.0898 degrees (10km at this latitude)
    expect(result.latitude).toBeCloseTo(51.5074, 4);
    expect(result.longitude).toBeCloseTo(-0.038, 3);
  });
});