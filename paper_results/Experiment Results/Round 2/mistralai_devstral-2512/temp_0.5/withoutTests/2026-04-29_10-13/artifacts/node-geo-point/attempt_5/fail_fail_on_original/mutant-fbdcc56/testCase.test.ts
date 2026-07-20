import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination when moving southeast from specific location', () => {
    const startPoint = new GeoPoint(45, 0);
    const distance = 100000; // 100 km
    const bearing = 135; // Southeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation (division instead of multiplication) will produce different results
    // when both sinφ1 and sinφ2 are non-zero values
    expect(result.latitude).toBeCloseTo(44.12, 2);
    expect(result.longitude).toBeCloseTo(-0.71, 2);
  });
});