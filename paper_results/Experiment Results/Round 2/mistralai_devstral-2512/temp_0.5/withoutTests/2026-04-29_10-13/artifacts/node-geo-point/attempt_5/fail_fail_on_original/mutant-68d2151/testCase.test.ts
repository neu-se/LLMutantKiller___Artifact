import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for 45 degree latitude with 0 degree bearing', () => {
    const startPoint = new GeoPoint(45, 0);
    const distance = 100000; // 100 km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes the calculation of y from multiplication to division
    // This will produce significantly different results for non-equatorial latitudes
    expect(result.latitude).toBeCloseTo(46.844, 3);
    expect(result.longitude).toBeCloseTo(0, 3);
  });
});