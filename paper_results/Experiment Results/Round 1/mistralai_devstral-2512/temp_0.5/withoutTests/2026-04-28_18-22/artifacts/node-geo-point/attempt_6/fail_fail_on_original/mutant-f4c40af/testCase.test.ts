import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given coordinate, distance, and bearing', () => {
    const coordinate = { latitude: 89, longitude: 0 }; // Near north pole
    const distance = 1000; // 1 km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // At high latitudes near the pole, the mutation (division instead of multiplication)
    // will produce significantly different results that should fail this test
    // Original formula should produce a latitude very close to 89.00898315284119
    expect(result.latitude).toBeCloseTo(89.00898315284119, 6);
    expect(result.longitude).toBeCloseTo(0, 6);
  });
});