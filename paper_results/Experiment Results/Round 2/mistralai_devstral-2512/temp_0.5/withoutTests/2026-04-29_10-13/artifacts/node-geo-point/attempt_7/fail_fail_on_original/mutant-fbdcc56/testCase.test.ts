import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination when moving northeast from 45N 0E', () => {
    const startPoint = new GeoPoint(45, 0);
    const distance = 100000; // 100 km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation (division instead of multiplication) will produce different results
    // when both latitude and longitude change significantly
    expect(result.latitude).toBeGreaterThan(45.5);
    expect(result.latitude).toBeLessThan(45.8);
    expect(result.longitude).toBeGreaterThan(0.5);
    expect(result.longitude).toBeLessThan(0.8);
  });
});