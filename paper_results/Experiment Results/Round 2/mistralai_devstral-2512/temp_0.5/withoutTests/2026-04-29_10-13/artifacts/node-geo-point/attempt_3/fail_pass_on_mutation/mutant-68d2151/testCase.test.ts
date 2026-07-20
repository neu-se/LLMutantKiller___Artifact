import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for polar coordinates', () => {
    const startPoint = new GeoPoint(89.9, 0); // Near North Pole
    const distance = 1000; // 1 km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // For polar coordinates, the mutation (division instead of multiplication)
    // will produce significantly different results due to cosφ1 being very small
    expect(result.latitude).toBeGreaterThan(89.9);
    expect(result.latitude).toBeLessThan(90);
    expect(result.longitude).toBeCloseTo(0, 5);
  });
});