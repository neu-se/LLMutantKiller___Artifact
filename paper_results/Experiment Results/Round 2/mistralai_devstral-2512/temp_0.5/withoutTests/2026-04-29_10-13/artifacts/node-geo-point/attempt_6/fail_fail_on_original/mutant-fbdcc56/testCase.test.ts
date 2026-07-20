import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination when moving west from specific latitude', () => {
    const startPoint = new GeoPoint(30, 0);
    const distance = 50000; // 50 km
    const bearing = 270; // West

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation (division instead of multiplication) will cause incorrect calculations
    // when moving westward where the longitude calculation is most affected
    expect(result.latitude).toBeCloseTo(30, 4);
    expect(result.longitude).toBeCloseTo(-0.449, 3);
  });
});