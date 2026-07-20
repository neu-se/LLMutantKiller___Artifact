import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination when moving southwest from specific location', () => {
    const startPoint = new GeoPoint(30, 30);
    const distance = 200000; // 200 km
    const bearing = 225; // Southwest

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation (division instead of multiplication) will cause incorrect calculations
    // when moving diagonally where both latitude and longitude change
    expect(result.latitude).toBeGreaterThan(28);
    expect(result.latitude).toBeLessThan(29);
    expect(result.longitude).toBeGreaterThan(28);
    expect(result.longitude).toBeLessThan(29);
  });
});