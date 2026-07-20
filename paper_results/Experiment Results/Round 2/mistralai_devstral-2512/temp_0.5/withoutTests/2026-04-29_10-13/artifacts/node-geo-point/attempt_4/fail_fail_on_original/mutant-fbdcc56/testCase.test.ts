import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination when moving east from equator', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 1000000; // 1000 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation (division instead of multiplication) will produce significantly different results
    // when moving along the equator where φ1 = 0 and sinφ1 = 0
    expect(result.latitude).toBeCloseTo(0, 5);
    expect(result.longitude).toBeCloseTo(8.98315, 5);
  });
});