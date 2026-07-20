import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination when moving east from 45N 45E', () => {
    const startPoint = new GeoPoint(45, 45);
    const distance = 100000; // 100 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation (division instead of multiplication) will produce different results
    // when moving east where the longitude calculation is most affected
    expect(result.latitude).toBeCloseTo(45, 4);
    expect(result.longitude).toBeCloseTo(46.1, 1);
  });
});